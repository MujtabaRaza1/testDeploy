// Loading Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    const header = document.querySelector('header');

    // Show loading screen for 5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        body.classList.add('content-loaded');
        
        // Remove loading screen after fade animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 5000);

    // Scroll event to handle sticky header styles
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Preload the GIF
const gifImage = new Image();
gifImage.src = 'assets/Wefleet-GIF-Black.gif';
gifImage.onload = () => {
    // Once GIF is loaded, show it in the loading screen
    document.querySelector('.loading-screen img').src = gifImage.src;
};

// Image URLs for the sliders
const topImages = [
    'assets/image1.jpeg',
    'assets/image2.jpeg',
    'assets/image3.jpeg',
    'assets/image4.jpeg',
    'assets/image5.jpeg',
    'assets/image6.jpeg'
];

const bottomImages = [
    'assets/image8.jpeg',
    'assets/image9.jpeg',
    'assets/image10.jpeg',
    'assets/image11.jpeg',
    'assets/image12.jpeg'
];

function createSlider(images, trackElement) {
    // Create three sets of images for smooth infinite scroll
    const totalSets = 3;
    for (let i = 0; i < totalSets; i++) {
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Slider image';
            img.loading = 'eager'; // Ensure images load immediately
            trackElement.appendChild(img);
        });
    }
}

// Initialize sliders when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const topTrack = document.querySelector('.slider-top .slider-track');
    const bottomTrack = document.querySelector('.slider-bottom .slider-track');

    if (topTrack && bottomTrack) {
        createSlider(topImages, topTrack);
        createSlider(bottomImages, bottomTrack);
    }

    // Feature section functionality
    const featureItems = document.querySelectorAll('.feature-item');
    const displayImage = document.getElementById('feature-display-image');

    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            featureItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update the image
            const imageUrl = item.getAttribute('data-image');
            displayImage.style.opacity = '0';
            
            setTimeout(() => {
                displayImage.src = imageUrl;
                displayImage.style.opacity = '1';
            }, 300);
        });
    });

    // Pricing Toggle Functionality
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceElements = document.querySelectorAll('.price');
    const monthlyPrices = ['$29', '$79', '$149'];
    const annualPrices = ['$290', '$790', '$1,490'];
    const monthlyDescriptions = [
        'Perfect for small fleets up to 5 vehicles',
        'Ideal for medium fleets up to 15 vehicles',
        'Perfect for large fleets of 16+ vehicles'
    ];
    const annualDescriptions = [
        'Save 17% annually - Best for small fleets',
        'Save 17% annually - Best for medium fleets',
        'Save 17% annually - Best for large fleets'
    ];

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Update prices and descriptions based on selection
            const isAnnual = btn.textContent.toLowerCase() === 'annually';
            const prices = isAnnual ? annualPrices : monthlyPrices;
            const descriptions = isAnnual ? annualDescriptions : monthlyDescriptions;

            // Update prices
            priceElements.forEach((element, index) => {
                element.textContent = prices[index];
            });

            // Update descriptions
            document.querySelectorAll('.price-description').forEach((element, index) => {
                element.textContent = descriptions[index];
            });
        });
    });

    // Steps Section Scroll Effect
    const stepsSection = document.querySelector('.steps-section');
    const stepCards = document.querySelectorAll('.step-card');
    
    if (stepsSection && stepCards.length) {
        window.addEventListener('scroll', () => {
            const sectionTop = stepsSection.offsetTop;
            const scrollPosition = window.scrollY;
            
            stepCards.forEach((card, index) => {
                const cardOffset = index * 100; // Offset for each card
                const start = sectionTop + cardOffset;
                const parallaxSpeed = 0.5;
                
                if (scrollPosition > start) {
                    const offset = (scrollPosition - start) * parallaxSpeed;
                    const maxOffset = 100; // Maximum offset to prevent cards from going too far
                    
                    card.style.transform = `translateY(${Math.min(offset, maxOffset)}px) rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`;
                } else {
                    card.style.transform = `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`;
                }
            });
        });
    }

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Toggle the clicked item
            item.classList.toggle('active');
            
            // Update the toggle symbol
            const toggle = item.querySelector('.faq-toggle');
            toggle.textContent = item.classList.contains('active') ? '−' : '+';
        });
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Newsletter Form Handling
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    try {
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Here you would typically send this to your backend
        // For demonstration, we'll use EmailJS
        const templateParams = {
            to_email: email,
            from_name: 'weFleet',
            message: 'Thank you for subscribing to our newsletter!'
        };

        // EmailJS configuration
        await emailjs.send(
            'service_d01tm8s',      // Service ID
            'template_zvbszyc',     // Template ID
            templateParams,
            'DuOV7E-B3Rc1Ts2Eu'    // Public Key
        );
        
        // Success state
        button.textContent = 'Subscribed!';
        document.getElementById('email').value = '';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        button.textContent = 'Error! Try again';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
});



