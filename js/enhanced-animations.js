/**
 * ARTIFICIAL GRASS OLDHAM - FUTURISTIC ENHANCED ANIMATIONS
 * Mobile-Optimized, Performance-Focused Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // PERFORMANCE OPTIMIZATIONS
    // =================================================================
    
    // Check if device is mobile/touch
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isLowPower = navigator.hardwareConcurrency <= 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable heavy animations on mobile/low power devices
    if (isMobile || isLowPower || prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED NAVIGATION
    // =================================================================
    
    function initMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        }
    }
    
    // =================================================================
    // OPTIMIZED INTERSECTION OBSERVER
    // =================================================================
    
    function initOptimizedIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                el.classList.add('animate');
            });
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animation elements
        const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .stagger-animation');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED SCROLL EFFECTS
    // =================================================================
    
    function initScrollEffects() {
        if (isMobile || prefersReducedMotion) return;
        
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            
            if (header) {
                if (scrolled > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
            
            // Optimized parallax for background shapes
            const shapes = document.querySelectorAll('.shape');
            if (shapes.length > 0) {
                shapes.forEach((shape, index) => {
                    const speed = 0.3 + (index * 0.05);
                    const yPos = -(scrolled * speed);
                    shape.style.transform = `translateY(${yPos}px) translateZ(0)`;
                });
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED FORM INTERACTIONS
    // =================================================================
    
    function initFormInteractions() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add floating label effect
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                }
                
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    if (this.value) {
                        this.parentElement.classList.add('has-value');
                    } else {
                        this.parentElement.classList.remove('has-value');
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.value) {
                        this.parentElement.classList.add('has-value');
                    } else {
                        this.parentElement.classList.remove('has-value');
                    }
                });
            });
            
            // Form submission handling
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span>Processing...</span>';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Success!</span>';
                        submitBtn.style.background = 'var(--success-green)';
                        
                        setTimeout(() => {
                            this.reset();
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                            
                            // Remove has-value classes
                            inputs.forEach(input => {
                                input.parentElement.classList.remove('has-value');
                            });
                        }, 2000);
                    }, 1500);
                }
            });
        });
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED BUTTON INTERACTIONS
    // =================================================================
    
    function initButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect for touch devices
            if (isMobile) {
                button.addEventListener('touchstart', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.touches[0].clientX - rect.left - size / 2;
                    const y = e.touches[0].clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            }
            
            // Add magnetic effect for desktop
            if (!isMobile) {
                button.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            }
        });
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED LOADING ANIMATIONS
    // =================================================================
    
    function initLoadingAnimations() {
        const loadingProgress = document.getElementById('loading-progress');
        
        if (loadingProgress) {
            let progress = 0;
            
            const loadingInterval = setInterval(() => {
                progress += Math.random() * 10 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadingInterval);
                }
                loadingProgress.style.width = progress + '%';
            }, 300);
        }
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED TEXT REVEAL
    // =================================================================
    
    function initTextReveal() {
        if (isMobile || prefersReducedMotion) {
            // Disable complex text reveal on mobile
            document.querySelectorAll('.reveal-text span').forEach(span => {
                span.style.animation = 'none';
                span.style.opacity = '1';
                span.style.transform = 'none';
            });
            return;
        }
        
        const revealElements = document.querySelectorAll('.reveal-text');
        
        revealElements.forEach(element => {
            const words = element.querySelectorAll('.word');
            words.forEach((word, index) => {
                word.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED PERFORMANCE MONITORING
    // =================================================================
    
    function initPerformanceMonitoring() {
        // Monitor frame rate
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFrameRate() {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS is low, disable heavy animations
                if (fps < 30 && !document.body.classList.contains('reduced-motion')) {
                    document.body.classList.add('reduced-motion');
                    console.log('Low FPS detected, reducing animations');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFrameRate);
        }
        
        if (!isMobile) {
            requestAnimationFrame(checkFrameRate);
        }
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED UTILITY FUNCTIONS
    // =================================================================
    
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED SMOOTH SCROLLING
    // =================================================================
    
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED LAZY LOADING
    // =================================================================
    
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // =================================================================
    // MOBILE-OPTIMIZED ACCESSIBILITY
    // =================================================================
    
    function initAccessibility() {
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--accent-green)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
        
        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
    }
    
    // =================================================================
    // INITIALIZATION
    // =================================================================
    
    // Initialize all functions
    initMobileNavigation();
    initOptimizedIntersectionObserver();
    initScrollEffects();
    initFormInteractions();
    initButtonInteractions();
    initLoadingAnimations();
    initTextReveal();
    initPerformanceMonitoring();
    initSmoothScrolling();
    initLazyLoading();
    initAccessibility();
    
    // Add CSS for ripple effect
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .btn {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add reduced motion styles
    const reducedMotionStyle = document.createElement('style');
    reducedMotionStyle.textContent = `
        .reduced-motion *,
        .reduced-motion *::before,
        .reduced-motion *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .reduced-motion .floating-shapes,
        .reduced-motion .morphing-blob {
            display: none !important;
        }
        
        .reduced-motion .reveal-text span {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(reducedMotionStyle);
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Recalculate any layout-dependent elements
        const header = document.querySelector('.header');
        if (header) {
            header.classList.remove('scrolled');
        }
    }, 250));
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
    
    console.log('Futuristic animations initialized with mobile optimization');
});