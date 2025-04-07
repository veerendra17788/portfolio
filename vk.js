// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    // initAnimations();
    initScrollProgress();
    // initThemeToggle();
    initCustomCursor();
    // initFloatingElements();
    initSkillsProgress();
    initCounterAnimation();
    initProjectFilter();
    // initTestimonialSlider();
    initContactForm();
    initScrollReveal();
});

// ==========================================
// Navigation functionality
// ==========================================
function initNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    // Toggle mobile menu
    mobileToggle?.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', highlightActiveLink);
}

function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// Animation functionality
// ==========================================
function initAnimations() {
    // Hero title animation
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    textRevealElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation;
                
                element.classList.add(animation);
                element.classList.add('animated');
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        animateOnScroll.observe(element);
    });
}

// ==========================================
// Scroll progress indicator
// ==========================================
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercentage}%`;
    });
}

// ==========================================
// Theme toggle functionality
// ==========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: light)');
    
    // Check for saved theme preference or use OS preference
    const savedTheme = localStorage.getItem('theme');
    console.log(savedTheme);
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Toggle theme
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    });
    
    // Listen for OS theme changes
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('light-mode');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            } else {
                document.body.classList.remove('light-mode');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            }
        }
    });
}

// ==========================================
// Custom cursor
// ==========================================


// ==========================================
// Floating elements animation (Hero section)
// ==========================================


// ==========================================
// Skills progress animation
// ==========================================

// ==========================================
// Counter animation (about stats)
// ==========================================
function initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item[data-animation="count-up"]');
    
    const animateCounter = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const statNumber = statItem.querySelector('.stat-number');
                const finalValue = parseInt(statNumber.textContent);
                
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 30); // Divide animation into 30 steps
                const duration = 1500; // Animation duration in ms
                const interval = duration / 30; // Time between steps
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= finalValue) {
                        statNumber.textContent = finalValue + (statNumber.textContent.includes('+') ? '+' : '');
                        clearInterval(counter);
                    } else {
                        statNumber.textContent = currentValue + (statNumber.textContent.includes('+') ? '+' : '');
                    }
                }, interval);
                
                observer.unobserve(statItem);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(statItem => {
        animateCounter.observe(statItem);
    });
}

// ==========================================
// Project filter functionality
// ==========================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 50);
                } else {
                    card.classList.remove('show');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// Testimonial slider
// ==========================================
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.querySelector('.testimonial-arrow.prev');
    const nextButton = document.querySelector('.testimonial-arrow.next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth = slides[0].offsetWidth;
    let autoplayInterval;
    
    // Set initial position
    updateSlider();
    
    // Update slider width on window resize
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        updateSlider();
    });
    
    // Previous button
    prevButton?.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
        resetAutoplay();
    });
    
    // Next button
    nextButton?.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
        resetAutoplay();
    });
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            resetAutoplay();
        });
    });
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    // Update slider position
    function updateSlider() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * (slideWidth + 20)}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
}

// ==========================================
// Contact form validation and submission
// ==========================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || message === '') {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        if (!email.match(emailPattern)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual AJAX submission in production)
        const submitButton = contactForm.querySelector('.submit-btn');
        const originalText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showFormMessage('Your message has been sent successfully!', 'success');
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Add to form
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}

// ==========================================
// Scroll reveal effects
// ==========================================
function initScrollReveal() {
    // Reveal animation for section titles
    const revealElements = document.querySelectorAll('[data-animation="reveal"]');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Tilt effect for service cards
    const tiltCards = document.querySelectorAll('[data-animation="tilt-in"]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const tiltX = (y - centerY) / 10;
            const tiltY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Parallax scroll effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        if (!heroSection || !heroVisual) return;
        
        const scrollPosition = window.scrollY;
        if (scrollPosition < heroSection.offsetHeight) {
            heroVisual.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });
}

// ==========================================
// Animated shapes
// ==========================================
function createAnimatedShapes() {
        // const shapes = document.querySelector('.animated-shapes');
        
        // if (!shapes) return;
        
        // Clear existing shapes
        // shapes.innerHTML = '';
        
        // Create random shapes
        // for (let i = 0; i < 15; i++) {
        //     const shape = document.createElement('span');
        //     shape.className = 'shape';
            
        //     // Random shape type
        //     const shapeTypes = ['circle', 'square', 'triangle'];
        //     const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        //     shape.classList.add(randomType);
            
        //     // Random position
        //     const posX = Math.random() * 100;
        //     const posY = Math.random() * 100;
        //     shape.style.left = `${posX}%`;
        //     shape.style.top = `${posY}%`;
            
        //     // Random size
        //     const size = Math.random() * 30 + 10;
        //     shape.style.width = `${size}px`;
        //     shape.style.height = `${size}px`;
            
        //     // Random color
        //     const hue = Math.random() * 360;
        //     shape.style.backgroundColor = `hsla(${hue}, 70%, 70%, 0.3)`;
            
        //     // Random animation duration
        //     const duration = Math.random() * 20 + 10;
        //     shape.style.animationDuration = `${duration}s`;
            
        //     // Random animation delay
        //     // const delay = Math.random() * 5;
        //     shape.style.animationDelay = `${delay}s`;
            
        //     // shapes.appendChild(shape);
        // }
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', createAnimatedShapes);

// ==========================================
// Typing animation for hero description
// ==========================================
function initTypingAnimation() {
    const heroDescription = document.querySelector('.hero-description');
    
    if (!heroDescription) return;
    
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    heroDescription.style.visibility = 'visible';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < text.length) {
            heroDescription.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 30);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 1500);
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initTypingAnimation);

// ==========================================
// Parallax mouse movement effect
// ==========================================
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    hero.addEventListener('mousemove', e => {
        
        const heroTitle = document.querySelector('.hero-title');
        const floatingElements = document.querySelector('.floating-elements');
        
        if (heroTitle) {
            heroTitle.style.transform = `translate(${moveX * -2}px, ${moveY * -2}px)`;
        }
        
        if (floatingElements) {
            floatingElements.style.transform = `translate(${moveX * 5}px, ${moveY * 5}px)`;
        }
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initParallaxEffect);

// ==========================================
// Project card hover effects
// ==========================================
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.opacity = '1';
            
            const links = card.querySelectorAll('.project-link');
            links.forEach((link, index) => {
                link.style.transform = 'translateY(0)';
                link.style.opacity = '1';
                link.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            overlay.style.opacity = '0';
            
            const links = card.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateY(20px)';
                link.style.opacity = '0';
                link.style.transitionDelay = '0s';
            });
        });
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectCardEffects);

// ==========================================
// Scroll-triggered animations
// ==========================================
function initScrollAnimations() {
    // Elements to animate on scroll
    const animateElements = [
        { selector: '.about-image-container', animation: 'slide-right' },
        { selector: '.about-content', animation: 'slide-left' },
        { selector: '.skill-card', animation: 'fade-up' },
        { selector: '.service-card', animation: 'tilt-in' },
        { selector: '.project-card', animation: 'reveal-card' },
        { selector: '.testimonial-card', animation: 'slide-up' },
        { selector: '.blog-card', animation: 'grow' }
    ];
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.dataset.animation);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    animateElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach((element, index) => {
            // Add data attribute if it doesn't exist
            if (!element.dataset.animation) {
                element.dataset.animation = item.animation;
            }
            
            // Add delay based on index
            element.style.animationDelay = `${index * 0.1}s`;
            
            // Observe
            observer.observe(element);
        });
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ==========================================
// Lazy loading for images
// ==========================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyLoadObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(image => {
        lazyLoadObserver.observe(image);
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initLazyLoading);

// ==========================================
// Smooth appear/disappear for page elements
// ==========================================
function initPageTransitions() {
    // Fade in page content on load
    document.body.classList.add('loaded');
    
    // Smooth scroll to top on page refresh
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
    
    // Smooth anchor link scrolling
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', initPageTransitions);

// ==========================================
// Add 3D tilt effect to cards
// ==========================================
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .service-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate rotation
            const rotateY = (mouseX - cardCenterX) / 10;
            const rotateX = (cardCenterY - mouseY) / 10;
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            card.style.zIndex = '10';
            
            // Add shadow effect
            card.style.boxShadow = `${rotateY / 10}px ${rotateX / 10}px 15px rgba(0, 0, 0, 0.2)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.zIndex = '1';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', init3DTiltEffect);

// ==========================================
// Dynamic background gradient
// ==========================================

// ==========================================
// Initialize all features
// ==========================================
window.addEventListener('load', function() {
    // Hide preloader if it exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Initialize all features
    initNavigation();
    initAnimations();
    initScrollProgress();
    initThemeToggle();
    initCustomCursor();
    // initFloatingElements();
    initSkillsProgress();
    initCounterAnimation();
    initProjectFilter();
    initTestimonialSlider();
    initContactForm();
    initScrollReveal();
    // createAnimatedShapes();
    initTypingAnimation();
    initParallaxEffect();
    initProjectCardEffects();
    initScrollAnimations();
    initLazyLoading();
    initPageTransitions();
    init3DTiltEffect();
    initDynamicBackground();
});

const skills = [
    { name: "C++", logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg", level: 85 },
    { name: "C", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png", level: 80 },
    { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", level: 60 },
    { name: "HTML", logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", level: 95 },
    { name: "CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", level: 90 },
    { name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", level: 95 },
    { name: "Bootstrap", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg", level: 85 },
    { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", level: 90 },
    { name: "React.js", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", level: 95 },
    { name: "Angular", logo: "https://angular.io/assets/images/logos/angular/angular.svg", level: 65 },
    { name: "Tailwind", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", level: 90 },
    { name: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg", level: 85 },
    { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg", level: 75 },
    { name: "MySQL", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg", level: 80 },
    { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", level: 95 },
    // { name: "Photoshop", logo: "https://via.placeholder.com/60", level: 75 },
    // { name: "WordPress", logo: "https://via.placeholder.com/60", level: 80 },
    // { name: "Webflow", logo: "https://via.placeholder.com/60", level: 85 },
    // { name: "Sketch", logo: "https://via.placeholder.com/60", level: 70 }
];



const container = document.getElementById("skill-id");
skills.forEach(skill => {
    container.innerHTML += `
        <div class="skill-card" data-animation="fade-up">
            <div class="skill-icon">
                <img src="${skill.logo}" alt="${skill.name}" class="skill-image">
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <div class="progress-container">
                <div class="progress-bar" data-value="${skill.level}" style="width: ${skill.level}%"></div>
            </div>
            <p class="progress-text">${skill.level}%</p>
        </div>
    `;
});





