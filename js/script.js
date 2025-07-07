/**
 * ARTIFICIAL GRASS OLDHAM - MAIN JAVASCRIPT
 * Lead generation and user interaction handling
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // NAVIGATION FUNCTIONALITY
    // =================================================================
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile nav when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =================================================================
    // MODAL FUNCTIONALITY
    // =================================================================
    
    const quoteModal = document.getElementById('quote-modal');
    const successModal = document.getElementById('success-modal');
    
    // Open quote modal
    window.openQuoteModal = function() {
        quoteModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input for accessibility
        const firstInput = quoteModal.querySelector('input[type="text"]');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Track modal open event (for analytics)
        trackEvent('Modal', 'Open', 'Quote Request');
    };
    
    // Close quote modal
    window.closeQuoteModal = function() {
        quoteModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form
        const form = quoteModal.querySelector('form');
        if (form) form.reset();
    };
    
    // Close success modal
    window.closeSuccessModal = function() {
        successModal.classList.remove('show');
        document.body.style.overflow = '';
    };
    
    // Close modals when clicking outside
    [quoteModal, successModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    if (modal === quoteModal) closeQuoteModal();
                    if (modal === successModal) closeSuccessModal();
                }
            });
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (quoteModal.classList.contains('show')) closeQuoteModal();
            if (successModal.classList.contains('show')) closeSuccessModal();
        }
    });
    
    // =================================================================
    // FORM HANDLING & LEAD CAPTURE
    // =================================================================
    
    const forms = document.querySelectorAll('.quote-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Disable form and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('loading');
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Add source tracking
                data.source = 'artificial-grass-oldham-website';
                data.page = window.location.pathname;
                data.referrer = document.referrer;
                data.timestamp = new Date().toISOString();
                
                // Validate required fields
                const requiredFields = ['name', 'phone', 'email', 'postcode'];
                const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
                
                if (missingFields.length > 0) {
                    throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    throw new Error('Please enter a valid email address');
                }
                
                // Validate UK postcode format
                const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
                if (!postcodeRegex.test(data.postcode.replace(/\s/g, ''))) {
                    throw new Error('Please enter a valid UK postcode');
                }
                
                // Validate phone number (basic UK format)
                const phoneRegex = /^(\+44|0)[0-9\s\-]{9,}$/;
                if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
                    throw new Error('Please enter a valid UK phone number');
                }
                
                // Submit to backend
                const response = await fetch('process-lead.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.error || 'Failed to submit form');
                }
                
                // Success handling
                form.reset();
                closeQuoteModal();
                
                // Show success modal
                successModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                
                // Track successful lead submission
                trackEvent('Lead', 'Submit', 'Quote Request', 1);
                
                // Auto-close success modal after 5 seconds
                setTimeout(() => {
                    closeSuccessModal();
                }, 5000);
                
                // Optional: Redirect to thank you page after delay
                // setTimeout(() => {
                //     window.location.href = '/thank-you.html';
                // }, 3000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message
                showNotification(error.message, 'error');
                
                // Track form errors
                trackEvent('Lead', 'Error', error.message);
                
            } finally {
                // Re-enable form
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    });
    
    // =================================================================
    // PHONE NUMBER FORMATTING
    // =================================================================
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format UK phone numbers
            if (value.startsWith('44')) {
                value = '+44 ' + value.slice(2);
            } else if (value.startsWith('0')) {
                // Format as UK local number
                if (value.length > 5) {
                    value = value.slice(0, 5) + ' ' + value.slice(5);
                }
            }
            
            e.target.value = value;
        });
    });
    
    // =================================================================
    // POSTCODE FORMATTING
    // =================================================================
    
    const postcodeInputs = document.querySelectorAll('input[name="postcode"]');
    
    postcodeInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            
            // Format UK postcode (e.g., OL11XX -> OL1 1XX)
            if (value.length > 3) {
                value = value.slice(0, -3) + ' ' + value.slice(-3);
            }
            
            e.target.value = value;
        });
        
        input.addEventListener('blur', function(e) {
            // Validate postcode format on blur
            const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
            if (e.target.value && !postcodeRegex.test(e.target.value)) {
                e.target.style.borderColor = '#dc3545';
                e.target.setAttribute('aria-invalid', 'true');
            } else {
                e.target.style.borderColor = '';
                e.target.removeAttribute('aria-invalid');
            }
        });
    });
    
    // =================================================================
    // NOTIFICATION SYSTEM
    // =================================================================
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            max-width: 350px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // =================================================================
    // ANALYTICS & TRACKING
    // =================================================================
    
    function trackEvent(category, action, label, value) {
        // Google Analytics 4 (gtag)
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead');
        }
        
        // Console log for debugging (remove in production)
        console.log('Event tracked:', { category, action, label, value });
    }
    
    // Track page view
    trackEvent('Page', 'View', window.location.pathname);
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.href);
        });
    });
    
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Email Click', this.href);
        });
    });
    
    // =================================================================
    // SCROLL ANIMATIONS
    // =================================================================
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Track section views
                const sectionName = entry.target.id || entry.target.className;
                trackEvent('Scroll', 'Section View', sectionName);
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    document.querySelectorAll('section, .service-card, .benefit-item, .area-card').forEach(el => {
        observer.observe(el);
    });
    
    // =================================================================
    // PERFORMANCE OPTIMIZATIONS
    // =================================================================
    
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Debounce function for scroll events
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
    
    // Optimized scroll handler
    const optimizedScrollHandler = debounce(function() {
        // Additional scroll-based functionality can go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // =================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // =================================================================
    
    // Keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const focusableElements = activeModal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
    
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // =================================================================
    // LOCAL STORAGE FOR LEAD TRACKING
    // =================================================================
    
    // Store user interaction data for better lead quality
    function trackUserBehavior() {
        const behaviorData = {
            visitTime: Date.now(),
            pageViews: parseInt(localStorage.getItem('pageViews') || '0') + 1,
            totalTimeOnSite: parseInt(localStorage.getItem('totalTimeOnSite') || '0'),
            lastVisit: localStorage.getItem('lastVisit'),
            leadSource: document.referrer || 'direct'
        };
        
        // Update localStorage
        Object.keys(behaviorData).forEach(key => {
            localStorage.setItem(key, behaviorData[key]);
        });
        
        // Track returning visitors
        if (behaviorData.pageViews > 1) {
            trackEvent('User', 'Returning Visitor', `Visit ${behaviorData.pageViews}`);
        }
    }
    
    trackUserBehavior();
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Date.now() - startTime;
        const totalTime = parseInt(localStorage.getItem('totalTimeOnSite') || '0') + timeOnPage;
        localStorage.setItem('totalTimeOnSite', totalTime);
        
        // Track engagement level
        if (timeOnPage > 30000) { // 30 seconds
            trackEvent('Engagement', 'High', 'Time on Page > 30s');
        }
    });
    
    // =================================================================
    // ERROR HANDLING & FALLBACKS
    // =================================================================
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        trackEvent('Error', 'JavaScript', e.message);
    });
    
    // Handle failed form submissions gracefully
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        trackEvent('Error', 'Promise Rejection', e.reason);
    });
    
    console.log('🎯 Artificial Grass Oldham website loaded successfully!');
});

// =================================================================
// CSS ANIMATIONS (dynamically added)
// =================================================================

// Add animation styles to head
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        opacity: 0.8;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #2d5530 !important;
        outline-offset: 2px;
    }
`;

document.head.appendChild(animationStyles);