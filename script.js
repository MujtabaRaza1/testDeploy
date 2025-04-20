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
        if (window.scrollY > 1) {
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
    'assets/image4.jpg',
    'assets/image5.jpeg',
    'assets/image6.jpeg',
    'assets/oil1.jpg'
];

const bottomImages = [
    'assets/image8.jpeg',
    'assets/image9.jpeg',
    'assets/image10.jpeg',
    'assets/image11.jpeg',
    'assets/image12.jpeg',
    'assets/oil2.jpg',
    'assets/oil3.jpg'
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

    // Feature section functionality using event delegation
    const featuresContent = document.querySelector('.features-content');
    const displayImage = document.getElementById('feature-display-image');
    const featuresSection = document.querySelector('.features-section');

    // Use event delegation for better handling of dynamically moved elements
    featuresContent.addEventListener('click', function(e) {
        // Find the clicked feature item or its parent
        const featureItem = e.target.closest('.feature-item');
        
        // If a feature item was clicked
        if (featureItem) {
            // Get all feature items
            const allFeatureItems = document.querySelectorAll('.feature-item');
            
            // Remove active class from all items
            allFeatureItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            featureItem.classList.add('active');
            
            // Update the image
            const imageUrl = featureItem.getAttribute('data-image');
            displayImage.style.opacity = '0';
            
            setTimeout(() => {
                displayImage.src = imageUrl;
                displayImage.style.opacity = '1';
            }, 300);
            
            // Scroll to show the full section
            setTimeout(() => {
                featuresSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 350);
        }
    });

    // Set initial active feature image
    const initialActive = featuresContent.querySelector('.feature-item.active');
    if (initialActive) {
        // Update the image for the initial active item
        const imageUrl = initialActive.getAttribute('data-image');
        displayImage.src = imageUrl;
    }

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

// Contact Us Button Redirect
document.addEventListener('DOMContentLoaded', function() {
    const contactBtns = document.querySelectorAll('.btn-contact');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    });
});

// Newsletter Form Handling
document.getElementById('newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    // Submit to Google Forms using fetch API
    const formData = new FormData();
    formData.append('entry.798775296', email); // Newsletter form entry ID
    
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfzwJDwjU7mLb5kKulOx9rwvwn8EFOleSqyAQE8El-ge5nbRA/formResponse', {
        method: 'POST',
        mode: 'no-cors', // Important for CORS policy
        body: formData
    })
    .then(() => {
        // Success state - since we're using no-cors, we won't know if it succeeded, but we'll assume it did
        button.textContent = 'Subscribed!';
        document.getElementById('email').value = '';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    })
    .catch(error => {
        console.error('Newsletter Error:', error);
        button.textContent = 'Error! Try again';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
});

// Contact Form Handling is now handled directly in contact.html with Google Forms

// Phone button handler for copying to clipboard on desktop
document.addEventListener('DOMContentLoaded', function() {
    const phoneButtons = document.querySelectorAll('.phone-button');
    
    phoneButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if it's not a mobile device (no touch capability or larger screen)
            if (!('ontouchstart' in window) || window.innerWidth > 768) {
                e.preventDefault(); // Prevent the default tel: behavior
                
                const phoneNumber = this.getAttribute('data-phone');
                
                // Copy to clipboard
                navigator.clipboard.writeText(phoneNumber)
                    .then(() => {
                        // Show success message
                        const originalText = this.textContent;
                        this.textContent = 'Number Copied!';
                        
                        // Reset button text after 2 seconds
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        alert('Phone number: ' + phoneNumber);
                    });
            }
            // On mobile devices, the default tel: link behavior will work
        });
    });
});



