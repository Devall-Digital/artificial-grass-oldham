/**
 * ARTIFICIAL GRASS OLDHAM - ADVANCED ANIMATIONS
 * Sophisticated interactions inspired by coming soon page
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // CUSTOM CURSOR
    // =================================================================
    
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
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
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .interactive');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // Hide cursor on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
    
    // =================================================================
    // FLOATING SHAPES BACKGROUND
    // =================================================================
    
    function createFloatingShapes() {
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
                </div>
            `;
            document.body.insertBefore(bgAnimation, document.body.firstChild);
        }
    }
    
    // Add floating shapes to pages that don't have them
    if (!document.querySelector('.coming-soon')) {
        createFloatingShapes();
    }
    
    // =================================================================
    // PARALLAX SCROLLING
    // =================================================================
    
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const rect = el.getBoundingClientRect();
            const visible = rect.bottom > 0 && rect.top < viewportHeight;
            
            if (visible) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
    
    // =================================================================
    // TEXT REVEAL ANIMATIONS
    // =================================================================
    
    function wrapTextInSpans(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = words.map(word => 
            `<span>${word}</span>`
        ).join(' ');
    }
    
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach(el => {
        wrapTextInSpans(el);
    });
    
    // =================================================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =================================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
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
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right, .stagger-animation');
    animatableElements.forEach(el => animationObserver.observe(el));
    
    // =================================================================
    // SMOOTH SCROLL WITH PROGRESS INDICATOR
    // =================================================================
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--accent-green);
        z-index: 10000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // =================================================================
    // MAGNETIC BUTTONS
    // =================================================================
    
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
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
    
    // =================================================================
    // SMOOTH PAGE TRANSITIONS
    // =================================================================
    
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-black);
        z-index: 10000;
        transform: translateY(100%);
        transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
    `;
    document.body.appendChild(pageTransition);
    
    // Animate page transitions
    document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href.includes('#') && !link.hasAttribute('target')) {
                e.preventDefault();
                pageTransition.style.transform = 'translateY(0)';
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });
    
    // =================================================================
    // MORPHING BLOB BACKGROUND
    // =================================================================
    
    function createMorphingBlob() {
        const blob = document.createElement('div');
        blob.className = 'blob';
        blob.style.cssText = `
            width: 400px;
            height: 400px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -2;
        `;
        document.body.appendChild(blob);
    }
    
    createMorphingBlob();
    
    // =================================================================
    // GLITCH EFFECT ON HOVER
    // =================================================================
    
    const glitchElements = document.querySelectorAll('h1, h2');
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('glitch');
            el.dataset.text = el.textContent;
            setTimeout(() => el.classList.remove('glitch'), 1000);
        });
    });
    
    // =================================================================
    // LOADING ANIMATION FOR IMAGES
    // =================================================================
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-loading-wrapper';
        wrapper.style.cssText = `
            position: relative;
            overflow: hidden;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        `;
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        img.addEventListener('load', () => {
            wrapper.style.background = 'none';
            wrapper.style.animation = 'none';
        });
    });
    
    // =================================================================
    // NUMBER COUNTER ANIMATION
    // =================================================================
    
    function animateCounter(el) {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // =================================================================
    // SMOOTH REVEAL FOR SECTIONS
    // =================================================================
    
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            section.style.transition = 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1)';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // =================================================================
    // PERFORMANCE MONITORING
    // =================================================================
    
    let lastScrollTime = Date.now();
    window.addEventListener('scroll', () => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastScrollTime;
        
        // Throttle scroll events for better performance
        if (timeDiff > 16) { // ~60fps
            lastScrollTime = currentTime;
            // Trigger scroll-based animations
        }
    });
    
    // =================================================================
    // COMING SOON PAGE ANIMATIONS
    // =================================================================
    
    // Only run coming soon animations if we're on the coming soon page
    if (document.querySelector('.coming-soon')) {
        
        // Custom cursor implementation for coming soon page
        let cursor;
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Create custom cursor element
        function createComingSoonCursor() {
            cursor = document.createElement('div');
            cursor.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                border: 2px solid #fff;
                border-radius: 50%;
                z-index: 9999;
                pointer-events: none;
                mix-blend-mode: difference;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            `;
            document.body.appendChild(cursor);
        }

        // Update mouse position
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animate cursor
        function animateComingSoonCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            if (cursor) {
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
            }
            
            requestAnimationFrame(animateComingSoonCursor);
        }

        // Initialize cursor
        createComingSoonCursor();
        animateComingSoonCursor();

        // Cursor hover effects for coming soon page
        const interactiveElements = document.querySelectorAll('.logo-icon, .social-dot, .main-title');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursor.style.borderColor = '#fff';
                    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
            });

            element.addEventListener('mouseleave', function() {
                if (cursor) {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = 'transparent';
                }
            });
        });

        // Parallax effect for floating shapes on coming soon page
        document.addEventListener('mousemove', function(e) {
            const shapes = document.querySelectorAll('.shape');
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                const moveX = x * speed * 30;
                const moveY = y * speed * 30;
                
                const currentTransform = getComputedStyle(shape).transform;
                const matrix = new DOMMatrix(currentTransform);
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px) ${currentTransform === 'none' ? '' : currentTransform}`;
            });
        });

        // Text reveal animation on scroll or interaction for coming soon page
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe animated elements
        const animatedElements = document.querySelectorAll('.logo, .main-title, .subtitle, .loading-bar, .footer');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Logo rotation on click for coming soon page
        const logo = document.querySelector('.logo-icon');
        let rotationCount = 0;
        
        if (logo) {
            logo.addEventListener('click', function() {
                rotationCount++;
                this.style.transform = `rotate(${rotationCount * 360}deg)`;
            });
        }

        // Social dots interaction for coming soon page
        const socialDots = document.querySelectorAll('.social-dot');
        
        socialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 50px;
                    height: 50px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Loading bar progress effect for coming soon page
        const loadingProgress = document.querySelector('.loading-progress');
        
        if (loadingProgress) {
            // Simulate loading progress
            setTimeout(() => {
                loadingProgress.style.animation = 'loading 3s ease-out forwards';
            }, 2000);
        }

        // Add subtle background movement for coming soon page
        let backgroundOffset = 0;
        
        function animateComingSoonBackground() {
            backgroundOffset += 0.5;
            
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                const currentTransform = shape.style.transform || '';
                
                if (!currentTransform.includes('translate')) {
                    shape.style.transform = `translateY(${Math.sin(backgroundOffset * speed) * 5}px)`;
                }
            });
            
            requestAnimationFrame(animateComingSoonBackground);
        }
        
        animateComingSoonBackground();

        // Keyboard interactions for coming soon page
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                
                // Trigger glitch effect on main title
                const mainTitle = document.querySelector('.main-title');
                if (mainTitle) {
                    mainTitle.classList.add('glitch-active');
                    
                    setTimeout(() => {
                        mainTitle.classList.remove('glitch-active');
                    }, 300);
                }
            }
        });

        // Performance optimization: Throttle expensive operations for coming soon page
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

        // Performance monitoring for animations
        let animationFrameCount = 0;
        let lastTime = performance.now();
        
        function monitorAnimationPerformance() {
            animationFrameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) { // Check every second
                const fps = Math.round((animationFrameCount * 1000) / (currentTime - lastTime));
                
                // Track performance if FPS drops below 30
                if (fps < 30 && typeof trackEvent !== 'undefined') {
                    trackEvent('Performance', 'Low FPS', 'Animations', fps);
                }
                
                animationFrameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(monitorAnimationPerformance);
        }
        
        // Start performance monitoring
        monitorAnimationPerformance();

        // Throttled mouse move for performance
        const throttledMouseMove = throttle(function(e) {
            // Additional mouse move effects can go here
        }, 16); // ~60fps

        document.addEventListener('mousemove', throttledMouseMove);

        // Resize handler for responsive adjustments on coming soon page
        window.addEventListener('resize', function() {
            // Recalculate positions if needed
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                // Reset transforms on resize
                shape.style.transform = '';
            });
        });

        // Add some easter eggs for coming soon page
        let clickCount = 0;
        const title = document.querySelector('.main-title');
        
        if (title) {
            title.addEventListener('click', function() {
                clickCount++;
                
                if (clickCount === 5) {
                    // Special effect after 5 clicks
                    document.body.style.filter = 'invert(1)';
                    
                    setTimeout(() => {
                        document.body.style.filter = '';
                        clickCount = 0;
                    }, 1000);
                }
            });
        }
    }
    
});