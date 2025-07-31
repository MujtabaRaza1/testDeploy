// Loading Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    const header = document.querySelector('header');
    const mobileFloatingBtn = document.querySelector('.mobile-floating-btn');

    // Hide mobile floating button on contact page
    if (mobileFloatingBtn && window.location.pathname.includes('/contact')) {
        mobileFloatingBtn.style.display = 'none';
    }

    // Show loading screen for 2.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        body.classList.add('content-loaded');
        
        // Remove loading screen after fade animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Scroll event to handle sticky header styles
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // FAQ Accordion Functionality - Added here to ensure DOM is loaded
    initFaqAccordion();
    
    // Initialize Custom Services Slider
    initCustomSlider();
    
    // Initialize Clients Showcase
    initClientsShowcase();
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
            window.location.href = 'contact';
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

// Separate function to initialize FAQ Accordion
function initFaqAccordion() {
    console.log("Initializing FAQ accordion");
    const faqItems = document.querySelectorAll('.faq-item');
    console.log("Found " + faqItems.length + " FAQ items");
    
    if (faqItems.length === 0) return; // Guard clause if no FAQ items found
    
    faqItems.forEach((item, index) => {
        console.log("Setting up FAQ item #" + (index + 1));
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (!question || !answer || !toggle) {
            console.error("Missing elements for FAQ item", item);
            return;
        }
        
        // Force set initial state
        item.classList.remove('active');
        toggle.textContent = '+';
        
        question.addEventListener('click', function(e) {
            console.log("FAQ item clicked", index + 1);
            e.stopPropagation(); // Prevent event bubbling
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherToggle) otherToggle.textContent = '+';
                }
            });
            
            // Toggle the clicked item
            const wasActive = item.classList.contains('active');
            console.log("Was active before click:", wasActive);
            item.classList.toggle('active');
            console.log("Is active after click:", item.classList.contains('active'));
            
            // Update toggle text and directly manipulate answer style for better visibility
            if (item.classList.contains('active')) {
                toggle.textContent = '−';
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = "0 25px 20px";
            } else {
                toggle.textContent = '+';
                answer.style.maxHeight = "0px";
                answer.style.padding = "0 25px";
            }
        });
    });
}

// Custom Coverflow Slider
function initCustomSlider() {
    const slider = document.querySelector('.custom-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    let currentIndex = 2; // Start with middle slide for symmetry
    const totalSlides = slides.length;

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2');
            
            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalSlides) {
                slide.classList.add('next');
            } else if (index === (currentIndex - 2 + totalSlides) % totalSlides) {
                slide.classList.add('prev-2');
            } else if (index === (currentIndex + 2) % totalSlides) {
                slide.classList.add('next-2');
            }
        });

        // Update category navigation
        const categories = ['all', 'Maintenance', 'Emergency', 'Detailing', 'Technology'];
        const currentCategory = categories[currentIndex];
        
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.category === currentCategory) {
                link.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Category navigation
    categoryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - go to next
            } else {
                prevSlide(); // Swipe right - go to previous
            }
        }
    }

    // Initialize
    updateSlider();
}

// Clients Showcase Functionality
function initClientsShowcase() {
    const showcaseSection = document.querySelector('.clients-showcase');
    if (!showcaseSection) return;

    // Animate statistics counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const targetValue = parseFloat(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = targetValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            // Format the number based on the target value
            if (targetValue === 99.9) {
                element.textContent = currentValue.toFixed(1);
            } else {
                element.textContent = Math.floor(currentValue);
            }
        }, 16);
    }

    // Intersection Observer for stats animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((statNumber, index) => {
                    setTimeout(() => {
                        animateCounter(statNumber);
                    }, index * 200); // Stagger animation
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.showcase-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Enhanced hover effects for client cards
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add staggered animation to other cards
            clientCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            // Reset all cards
            clientCards.forEach((otherCard) => {
                otherCard.style.transform = '';
                otherCard.style.opacity = '';
            });
        });

        // Add click effect
        card.addEventListener('click', () => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'cardPulse 0.6s ease-out';
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const showcaseRect = showcaseSection.getBoundingClientRect();
        const showcaseTop = showcaseRect.top + scrolled;
        const showcaseHeight = showcaseRect.height;
        
        // Only apply parallax when section is in view
        if (scrolled + window.innerHeight > showcaseTop && scrolled < showcaseTop + showcaseHeight) {
            const parallaxValue = (scrolled - showcaseTop) * 0.5;
            
            const backgroundGrid = showcaseSection.querySelector('.background-grid');
            const particles = showcaseSection.querySelectorAll('.particle');
            
            if (backgroundGrid) {
                backgroundGrid.style.transform = `translate(${parallaxValue * 0.1}px, ${parallaxValue * 0.1}px)`;
            }
            
            particles.forEach((particle, index) => {
                const speed = 0.02 + (index * 0.01);
                particle.style.transform = `translateY(${parallaxValue * speed}px)`;
            });
        }
    });
}

// Add CSS animation for card pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.08) rotateY(5deg); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);