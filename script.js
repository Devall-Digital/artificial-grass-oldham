document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor implementation
    let cursor;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Create custom cursor element
    function createCursor() {
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
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        if (cursor) {
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }

    // Initialize cursor
    createCursor();
    animateCursor();

    // Cursor hover effects
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

    // Parallax effect for floating shapes
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

    // Text reveal animation on scroll or interaction
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

    // Logo rotation on click
    const logo = document.querySelector('.logo-icon');
    let rotationCount = 0;
    
    logo.addEventListener('click', function() {
        rotationCount++;
        this.style.transform = `rotate(${rotationCount * 360}deg)`;
    });

    // Social dots interaction
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

    // Loading bar progress effect
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    setTimeout(() => {
        loadingProgress.style.animation = 'loading 3s ease-out forwards';
    }, 2000);

    // Add subtle background movement
    let backgroundOffset = 0;
    
    function animateBackground() {
        backgroundOffset += 0.5;
        
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            const currentTransform = shape.style.transform || '';
            
            if (!currentTransform.includes('translate')) {
                shape.style.transform = `translateY(${Math.sin(backgroundOffset * speed) * 5}px)`;
            }
        });
        
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();

    // Keyboard interactions
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            
            // Trigger glitch effect on main title
            const mainTitle = document.querySelector('.main-title');
            mainTitle.classList.add('glitch-active');
            
            setTimeout(() => {
                mainTitle.classList.remove('glitch-active');
            }, 300);
        }
    });

    // Performance optimization: Throttle expensive operations
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

    // Throttled mouse move for performance
    const throttledMouseMove = throttle(function(e) {
        // Additional mouse move effects can go here
    }, 16); // ~60fps

    document.addEventListener('mousemove', throttledMouseMove);

    // Resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Recalculate positions if needed
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            // Reset transforms on resize
            shape.style.transform = '';
        });
    });

    // Add some easter eggs
    let clickCount = 0;
    const title = document.querySelector('.main-title');
    
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
});