// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeGrassField();
    initializeMobileMenu();
    initializeForm();
    initializeTestimonials();
    initializeScrollAnimations();
    initializeStickyCTA();
    initializeSmoothScroll();
});

// Initialize Grass Field - Low Angle View
function initializeGrassField() {
    const grassField = document.getElementById('grassField');
    if (!grassField) return;
    
    // Create multiple layers of grass blades for depth
    const bladeCount = 150; // More blades for realistic field
    const layers = ['layer-1', 'layer-2', 'layer-3', 'layer-4', 'layer-5'];
    
    for (let i = 0; i < bladeCount; i++) {
        const blade = document.createElement('div');
        blade.classList.add('grass-blade');
        
        // Assign random layer for depth
        const layerIndex = Math.floor(Math.random() * layers.length);
        blade.classList.add(layers[layerIndex]);
        
        // Random horizontal position
        blade.style.left = Math.random() * 100 + '%';
        
        // Random width for variety (2-4px)
        blade.style.width = (Math.random() * 2 + 2) + 'px';
        
        // Vary height slightly within layer
        const baseHeight = [150, 180, 200, 220, 250][layerIndex];
        const heightVariation = (Math.random() - 0.5) * 30;
        blade.style.height = (baseHeight + heightVariation) + 'px';
        
        // Random initial rotation for natural look
        const initialRotation = (Math.random() - 0.5) * 10;
        blade.style.transform = `rotate(${initialRotation}deg)`;
        
        // Random animation delay for natural wave effect
        const delay = Math.random() * 2;
        blade.style.animationDelay = delay + 's';
        
        // Some blades get stronger gusts
        if (Math.random() < 0.2) {
            blade.classList.add(Math.random() < 0.5 ? 'gust-1' : 'gust-2');
        }
        
        // Add slight color variation
        const colorVariation = Math.random();
        if (colorVariation > 0.7) {
            // Slightly darker green
            blade.style.background = `linear-gradient(to top,
                rgba(5, 150, 105, 0.9) 0%,
                rgba(5, 150, 105, 0.7) 30%,
                rgba(16, 185, 129, 0.5) 60%,
                rgba(16, 185, 129, 0.3) 100%
            )`;
        } else if (colorVariation < 0.3) {
            // Slightly lighter green
            blade.style.background = `linear-gradient(to top,
                rgba(16, 185, 129, 0.9) 0%,
                rgba(16, 185, 129, 0.7) 30%,
                rgba(52, 211, 153, 0.5) 60%,
                rgba(74, 222, 128, 0.3) 100%
            )`;
        }
        
        grassField.appendChild(blade);
    }
    
    // Add perspective effect on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        // Subtle parallax - grass appears to move as you scroll
        const parallax = Math.min(scrollTop * 0.1, 50);
        grassField.style.transform = `translateY(${parallax}px)`;
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Initialize Form
function initializeForm() {
    const form = document.getElementById('quoteForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const formMessage = document.getElementById('formMessage');
        
        // Disable submit button
        submitBtn.disabled = true;
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Submitting...';
        
        // Get form data
        const formData = new FormData(form);
        
        try {
            const response = await fetch('process-lead.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                formMessage.className = 'form-message success';
                formMessage.textContent = result.message || 'Thank you! We will contact you within 24 hours.';
                form.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = result.message || 'There was an error submitting your request. Please try again.';
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'There was an error submitting your request. Please try again later.';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
        }
    });
    
    // Add input animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Initialize Testimonials Slider
function initializeTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const items = track.querySelectorAll('.testimonial-item');
    const totalItems = items.length;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateSlider();
    });
    
    // Auto-advance testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
    }, 5000);
}

// FAQ Toggle Function (called from HTML)
function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.benefits, .services, .gallery, .testimonials, .areas, .faq, .cta-section, .quote-section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Initialize Sticky CTA
function initializeStickyCTA() {
    const stickyCTA = document.getElementById('stickyCta');
    if (!stickyCTA) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show sticky CTA after scrolling down 300px
        if (scrollTop > 300) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}


// Initialize Smooth Scroll
function initializeSmoothScroll() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('submit-btn') || e.target.closest('.submit-btn')) {
        const button = e.target.closest('.submit-btn') || e.target;
        const ripple = document.createElement('span');
        ripple.classList.add('btn-ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate any size-dependent features
    }, 250);
}, { passive: true });

