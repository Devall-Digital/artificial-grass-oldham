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
    
});