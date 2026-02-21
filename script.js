// ===========================
// MODERN LANDING PAGE JAVASCRIPT
// ===========================

// === DOM ELEMENTS ===
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const sections = document.querySelectorAll('section');

// === NAVBAR SHRINK ON SCROLL ===
window.addEventListener('scroll', () => {
    // Add 'scrolled' class when user scrolls down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active link based on scroll position
    updateActiveLink();
});

// === SIDEBAR TOGGLE FUNCTIONALITY ===

// Open sidebar when menu toggle is clicked
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    menuToggle.classList.add('active');
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden';
});

// Close sidebar when close button is clicked
closeBtn.addEventListener('click', closeSidebar);

// Close sidebar when overlay is clicked
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar function
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// === SMOOTH SCROLLING TO SECTIONS ===

// Add smooth scroll to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate offset to account for fixed navbar
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add smooth scroll to sidebar links and close sidebar after click
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close sidebar first
            closeSidebar();
            
            // Wait for sidebar animation to complete, then scroll
            setTimeout(() => {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    });
});

// === ACTIVE LINK HIGHLIGHTING ON SCROLL ===
function updateActiveLink() {
    let currentSection = '';
    const navbarHeight = navbar.offsetHeight;
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Update active class on sidebar links
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// === FORM SUBMISSION HANDLING ===
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation (browser handles required fields)
    if (name && email && message) {
        // Show success message (in real app, you would send to server)
        alert(`Thank you, ${name}! Your message has been sent successfully.\n\nWe'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    }
});

// === INITIALIZE ON PAGE LOAD ===
window.addEventListener('load', () => {
    // Set initial active link
    updateActiveLink();
    
    // Add entrance animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe info cards in contact section
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// === SMOOTH SCROLL FOR HERO BUTTONS ===
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        
        // Only apply to anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === KEYBOARD ACCESSIBILITY ===
// Close sidebar on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// === PERFORMANCE OPTIMIZATION ===
// Debounce scroll event for better performance
let scrollTimeout;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Clear previous timeout
    clearTimeout(scrollTimeout);
    
    // Set new timeout to handle scroll end
    scrollTimeout = setTimeout(() => {
        lastScrollY = window.scrollY;
    }, 100);
}, { passive: true });

// === CONSOLE MESSAGE ===
console.log('%c🚀 Modern Landing Page Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with pure HTML, CSS, and JavaScript', 'color: #764ba2; font-size: 12px;');
