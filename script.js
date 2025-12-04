// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeMobileMenu();
    initializeForm();
    initializeTestimonials();
    initializeScrollAnimations();
    initializeStickyCTA();
    initializeShapeInteractions();
    initializeSmoothScroll();
    initializeGrassAnimations();
});

// Initialize Grass Animations
function initializeGrassAnimations() {
    // Add subtle grass wave effect on scroll
    let lastScrollTop = 0;
    const grassRoll = document.querySelector('.grass-roll');
    const grassGrowing = document.querySelector('.grass-growing-bg');
    
    if (!grassRoll || !grassGrowing) return;
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;
            
            // Subtle parallax effect for grass elements
            if (scrollDelta > 0) {
                // Scrolling down - grass moves slightly
                const parallaxY = Math.min(scrollTop * 0.05, 15);
                grassRoll.style.transform = `translateY(${parallaxY}px)`;
                
                // Add subtle opacity change
                const opacity = Math.min(0.3 + (scrollTop * 0.0001), 0.5);
                grassGrowing.style.opacity = opacity;
            }
            
            lastScrollTop = scrollTop;
        });
    }, { passive: true });
    
    // Add wind effect on mouse move (desktop only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseTimeout;
        document.addEventListener('mousemove', (e) => {
            if (mouseTimeout) {
                cancelAnimationFrame(mouseTimeout);
            }
            
            mouseTimeout = requestAnimationFrame(() => {
                const mouseX = e.clientX / window.innerWidth;
                
                // Subtle grass sway based on mouse position
                const swayX = (mouseX - 0.5) * 3; // -1.5 to 1.5 pixels
                const currentTransform = grassRoll.style.transform || '';
                const currentY = currentTransform.match(/translateY\(([^)]+)\)/) ? 
                    currentTransform.match(/translateY\(([^)]+)\)/)[1] : '0px';
                grassRoll.style.transform = `translateX(${swayX}px) translateY(${currentY})`;
            });
        }, { passive: true });
    }
    
    // Add periodic grass "growth" pulse effect
    setInterval(() => {
        if (grassGrowing) {
            grassGrowing.style.animation = 'none';
            setTimeout(() => {
                grassGrowing.style.animation = 'grassGrow 2s ease-out';
            }, 10);
        }
    }, 10000); // Every 10 seconds
}

// Initialize Particle System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Add new particles periodically
    setInterval(() => {
        if (particlesContainer.children.length < particleCount) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    
    // 30% chance to create a grass blade particle instead of circle
    const isGrassBlade = Math.random() < 0.3;
    
    if (isGrassBlade) {
        particle.classList.add('particle', 'grass-blade');
        // Random rotation for grass blade
        const rotation = (Math.random() - 0.5) * 20; // -10 to 10 degrees
        particle.style.transform = `rotate(${rotation}deg)`;
    } else {
        particle.classList.add('particle');
        // Random size between 2px and 8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
    }
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 10 + 15; // 15-25 seconds
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Random color variation - green/cyan themed
    const colorVariation = Math.random();
    if (!isGrassBlade) {
        if (colorVariation > 0.66) {
            // Cyan particles
            particle.style.background = 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.4) 30%, transparent 70%)';
            particle.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.5)';
        } else if (colorVariation > 0.33) {
            // Green particles
            particle.style.background = 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.4) 30%, transparent 70%)';
            particle.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
        } else {
            // Light green particles
            particle.style.background = 'radial-gradient(circle, rgba(52, 211, 153, 0.6) 0%, rgba(52, 211, 153, 0.3) 40%, transparent 70%)';
            particle.style.boxShadow = '0 0 8px rgba(52, 211, 153, 0.4)';
        }
    }
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
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

// Initialize Shape Interactions
function initializeShapeInteractions() {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;
    
    // Physics-based movement for shapes
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const shapePhysics = Array.from(shapes).map((shape, index) => {
        const rect = shape.getBoundingClientRect();
        const width = rect.width || 20;
        const height = rect.height || 60;
        
        // Random starting position
        const isMobile = viewportWidth < 768;
        const padding = isMobile ? 60 : 100;
        const startX = padding + Math.random() * (viewportWidth - padding * 2);
        const startY = padding + Math.random() * (viewportHeight - padding * 2);
        
        return {
            element: shape,
            x: startX,
            y: startY,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            width: width,
            height: height
        };
    });
    
    // Physics animation loop
    function animateShapes() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const isMobile = viewportWidth < 768;
        const padding = isMobile ? 30 : 50;
        
        shapePhysics.forEach(physics => {
            // Update position
            physics.x += physics.vx;
            physics.y += physics.vy;
            
            // Bounce off edges
            if (physics.x - physics.width / 2 < padding || physics.x + physics.width / 2 > viewportWidth - padding) {
                physics.vx *= -1;
                physics.x = Math.max(padding + physics.width / 2, Math.min(viewportWidth - padding - physics.width / 2, physics.x));
            }
            
            if (physics.y - physics.height / 2 < padding || physics.y + physics.height / 2 > viewportHeight - padding) {
                physics.vy *= -1;
                physics.y = Math.max(padding + physics.height / 2, Math.min(viewportHeight - padding - physics.height / 2, physics.y));
            }
            
            // Update CSS position
            physics.element.style.left = `${physics.x - physics.width / 2}px`;
            physics.element.style.top = `${physics.y - physics.height / 2}px`;
        });
        
        requestAnimationFrame(animateShapes);
    }
    
    // Start physics animation
    animateShapes();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            
            const isMobile = newWidth < 768;
            const padding = isMobile ? 30 : 50;
            
            shapePhysics.forEach(physics => {
                physics.x = Math.max(physics.width / 2 + padding, Math.min(newWidth - physics.width / 2 - padding, physics.x));
                physics.y = Math.max(physics.height / 2 + padding, Math.min(newHeight - physics.height / 2 - padding, physics.y));
            });
        }, 250);
    });
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

