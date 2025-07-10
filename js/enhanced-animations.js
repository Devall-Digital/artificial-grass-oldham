/**
 * ARTIFICIAL GRASS OLDHAM - ENHANCED ANIMATIONS
 * Immersive interactions and smooth animations for better UX
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // ENHANCED CUSTOM CURSOR
    // =================================================================
    
    function initCustomCursor() {
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');
        const cursorDot = document.createElement('div');
        
        cursor.className = 'cursor';
        cursorFollower.className = 'cursor-follower';
        cursorDot.className = 'cursor-dot';
        
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-green);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease, border-color 0.3s ease;
            mix-blend-mode: difference;
            opacity: 0;
        `;
        
        cursorFollower.style.cssText = `
            width: 40px;
            height: 40px;
            background: rgba(45, 85, 48, 0.1);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
            opacity: 0;
        `;
        
        cursorDot.style.cssText = `
            width: 4px;
            height: 4px;
            background: var(--accent-green);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9997;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        document.body.appendChild(cursorDot);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        let dotX = 0, dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor elements
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        
        function animateCursor() {
            // Main cursor
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            // Follower
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';
            
            // Dot
            dotX += (mouseX - dotX) * 0.8;
            dotY += (mouseY - dotY) * 0.8;
            cursorDot.style.left = dotX - 2 + 'px';
            cursorDot.style.top = dotY - 2 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .interactive, .btn, .service-card, .nav-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
        
        // Hide cursor on mobile
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
            cursorDot.style.display = 'none';
        }
    }
    
    // =================================================================
    // ENHANCED FLOATING SHAPES BACKGROUND
    // =================================================================
    
    function createEnhancedFloatingShapes() {
        const existingAnimation = document.querySelector('.background-animation');
        if (!existingAnimation) {
            const bgAnimation = document.createElement('div');
            bgAnimation.className = 'background-animation';
            bgAnimation.innerHTML = `
                <div class="floating-shapes">
                    <div class="shape shape-1"></div>
                    <div class="shape shape-2"></div>
                    <div class="shape shape-3"></div>
                    <div class="shape shape-4"></div>
                    <div class="shape shape-5"></div>
                    <div class="shape shape-6"></div>
                    <div class="shape shape-7"></div>
                </div>
            `;
            document.body.insertBefore(bgAnimation, document.body.firstChild);
            
            // Add enhanced styles for new shapes
            const style = document.createElement('style');
            style.textContent = `
                .shape-6 {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    top: 80%;
                    left: 10%;
                    animation: float6 35s infinite ease-in-out;
                    background: rgba(45, 85, 48, 0.02);
                    border: 1px solid rgba(45, 85, 48, 0.08);
                }
                
                .shape-7 {
                    width: 60px;
                    height: 60px;
                    top: 15%;
                    left: 80%;
                    animation: float7 40s infinite ease-in-out;
                    background: rgba(45, 85, 48, 0.03);
                    border: 1px solid rgba(45, 85, 48, 0.1);
                    transform: rotate(30deg);
                }
                
                @keyframes float6 {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(20px, -30px) rotate(90deg); }
                    50% { transform: translate(-15px, -20px) rotate(180deg); }
                    75% { transform: translate(-25px, 15px) rotate(270deg); }
                }
                
                @keyframes float7 {
                    0%, 100% { transform: translate(0, 0) rotate(30deg); }
                    33% { transform: translate(25px, -25px) rotate(120deg); }
                    66% { transform: translate(-20px, -15px) rotate(210deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // =================================================================
    // ENHANCED PARALLAX SCROLLING
    // =================================================================
    
    function initEnhancedParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const rect = el.getBoundingClientRect();
                const visible = rect.bottom > 0 && rect.top < viewportHeight;
                
                if (visible) {
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // =================================================================
    // ENHANCED TEXT REVEAL ANIMATIONS
    // =================================================================
    
    function initTextRevealAnimations() {
        const revealTexts = document.querySelectorAll('.reveal-text, h1, h2, h3');
        
        revealTexts.forEach(el => {
            if (!el.classList.contains('reveal-text')) {
                el.classList.add('reveal-text');
            }
            
            const text = el.textContent;
            const words = text.split(' ');
            el.innerHTML = words.map(word => 
                `<span class="word">${word}</span>`
            ).join(' ');
        });
        
        // Add word animation styles
        const style = document.createElement('style');
        style.textContent = `
            .reveal-text .word {
                display: inline-block;
                opacity: 0;
                transform: translateY(100%);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .reveal-text.animate .word {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-text .word:nth-child(1) { transition-delay: 0.1s; }
            .reveal-text .word:nth-child(2) { transition-delay: 0.2s; }
            .reveal-text .word:nth-child(3) { transition-delay: 0.3s; }
            .reveal-text .word:nth-child(4) { transition-delay: 0.4s; }
            .reveal-text .word:nth-child(5) { transition-delay: 0.5s; }
            .reveal-text .word:nth-child(6) { transition-delay: 0.6s; }
            .reveal-text .word:nth-child(7) { transition-delay: 0.7s; }
            .reveal-text .word:nth-child(8) { transition-delay: 0.8s; }
            .reveal-text .word:nth-child(9) { transition-delay: 0.9s; }
            .reveal-text .word:nth-child(10) { transition-delay: 1.0s; }
        `;
        document.head.appendChild(style);
    }
    
    // =================================================================
    // ENHANCED INTERSECTION OBSERVER
    // =================================================================
    
    function initEnhancedIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger stagger animations for children
                    if (entry.target.classList.contains('stagger-animation')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('counter-section')) {
                        animateCounters(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(
            '.fade-in-up, .scale-in, .slide-in-left, .slide-in-right, .stagger-animation, .reveal-text, .service-card, .counter-section'
        );
        animatableElements.forEach(el => animationObserver.observe(el));
    }
    
    // =================================================================
    // ENHANCED SCROLL PROGRESS INDICATOR
    // =================================================================
    
    function initScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: var(--gradient-green);
            z-index: 10000;
            transition: width 0.2s ease;
            border-radius: 0 2px 2px 0;
            box-shadow: 0 0 10px rgba(45, 85, 48, 0.3);
        `;
        document.body.appendChild(progressBar);
        
        let ticking = false;
        
        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // =================================================================
    // ENHANCED MAGNETIC BUTTONS
    // =================================================================
    
    function initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // =================================================================
    // ENHANCED MORPHING BLOB ANIMATION
    // =================================================================
    
    function createMorphingBlob() {
        const blob = document.createElement('div');
        blob.className = 'morphing-blob';
        blob.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, rgba(45, 85, 48, 0.03), rgba(74, 124, 78, 0.03));
            border-radius: 50%;
            filter: blur(40px);
            z-index: -1;
            transform: translate(-50%, -50%);
            animation: morphBlob 20s ease-in-out infinite;
            pointer-events: none;
        `;
        
        document.body.appendChild(blob);
        
        // Add blob animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes morphBlob {
                0%, 100% { 
                    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
                    transform: translate(-50%, -50%) rotate(0deg);
                }
                25% { 
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    transform: translate(-50%, -50%) rotate(90deg);
                }
                50% { 
                    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                    transform: translate(-50%, -50%) rotate(180deg);
                }
                75% { 
                    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    transform: translate(-50%, -50%) rotate(270deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =================================================================
    // ENHANCED COUNTER ANIMATIONS
    // =================================================================
    
    function animateCounters(container) {
        const counters = container.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // =================================================================
    // ENHANCED SMOOTH SCROLLING
    // =================================================================
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // =================================================================
    // ENHANCED HEADER SCROLL EFFECTS
    // =================================================================
    
    function initHeaderScrollEffects() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // =================================================================
    // ENHANCED FORM INTERACTIONS
    // =================================================================
    
    function initFormInteractions() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        formInputs.forEach(input => {
            // Add floating label effect
            const label = document.createElement('label');
            label.className = 'floating-label';
            label.textContent = input.placeholder;
            label.style.cssText = `
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--medium-gray);
                transition: all var(--transition-normal);
                pointer-events: none;
                background: var(--white);
                padding: 0 4px;
            `;
            
            input.parentNode.style.position = 'relative';
            input.parentNode.appendChild(label);
            
            input.addEventListener('focus', () => {
                label.style.top = '0';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--accent-green)';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.top = '50%';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--medium-gray)';
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                label.style.top = '0';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--accent-green)';
            }
        });
    }
    
    // =================================================================
    // ENHANCED PERFORMANCE OPTIMIZATIONS
    // =================================================================
    
    function initPerformanceOptimizations() {
        // Throttle scroll events
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
        
        // Debounce resize events
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
        
        // Optimize animations for performance
        const animatedElements = document.querySelectorAll('.shape, .morphing-blob');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform';
        });
    }
    
    // =================================================================
    // INITIALIZATION
    // =================================================================
    
    // Initialize all enhanced features
    initCustomCursor();
    createEnhancedFloatingShapes();
    initEnhancedParallax();
    initTextRevealAnimations();
    initEnhancedIntersectionObserver();
    initScrollProgressIndicator();
    initMagneticButtons();
    createMorphingBlob();
    initSmoothScrolling();
    initHeaderScrollEffects();
    initFormInteractions();
    initPerformanceOptimizations();
    
    // Add enhanced styles for new features
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        /* Enhanced cursor styles */
        .cursor.hover {
            transform: scale(1.5) !important;
            border-color: var(--accent-green) !important;
        }
        
        /* Enhanced button hover effects */
        .btn:hover {
            transform: translateY(-3px) !important;
        }
        
        /* Enhanced service card hover */
        .service-card:hover {
            transform: translateY(-8px) !important;
        }
        
        /* Enhanced header transitions */
        .header {
            transition: all var(--transition-normal) !important;
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: var(--shadow-light) !important;
        }
        
        /* Enhanced form focus states */
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            border-color: var(--accent-green) !important;
            box-shadow: 0 0 0 4px rgba(45, 85, 48, 0.1) !important;
            transform: translateY(-1px) !important;
        }
        
        /* Enhanced floating label */
        .floating-label {
            transition: all var(--transition-normal) !important;
        }
        
        /* Enhanced scroll progress */
        .scroll-progress {
            transition: width 0.2s ease !important;
        }
    `;
    document.head.appendChild(enhancedStyles);
    
    console.log('Enhanced animations initialized successfully!');
});