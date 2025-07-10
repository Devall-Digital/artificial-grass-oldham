/**
 * ARTIFICIAL GRASS OLDHAM - MAIN JAVASCRIPT
 * Lead generation and user interaction handling
 * 
 * @author Artificial Grass Oldham Development Team
 * @version 2.0.0
 * @description Main JavaScript file handling all user interactions, form submissions,
 *              analytics tracking, and performance optimizations for the artificial
 *              grass website.
 * 
 * Features:
 * - Navigation and modal functionality
 * - Lead capture form handling
 * - Analytics and tracking
 * - Performance optimizations
 * - Accessibility enhancements
 * - Error handling and fallbacks
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
                // Log error for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Form submission error:', error);
        }
                
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
    
    /**
     * Shows a notification message to the user
     * @param {string} message - The message to display
     * @param {string} type - The type of notification ('info', 'success', 'error')
     */
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
    
    /**
     * Tracks user events for analytics
     * @param {string} category - Event category (e.g., 'Lead', 'Contact', 'Page')
     * @param {string} action - Event action (e.g., 'Submit', 'Click', 'View')
     * @param {string} label - Event label for additional context
     * @param {number} value - Numeric value associated with the event
     */
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
        
        // Development logging (remove in production)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Event tracked:', { category, action, label, value });
        }
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
    
    // Enhanced accessibility: Announce dynamic content changes
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Announce form submission status
    const originalShowNotification = showNotification;
    showNotification = function(message, type = 'info') {
        originalShowNotification(message, type);
        
        // Announce to screen readers
        if (type === 'success') {
            announceToScreenReader('Form submitted successfully');
        } else if (type === 'error') {
            announceToScreenReader('Error occurred: ' + message);
        }
    };
    
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
        // Log error for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('JavaScript error:', e.error);
        }
        
        // Track error for analytics
        if (typeof trackEvent !== 'undefined') {
            trackEvent('Error', 'JavaScript', e.message || 'Unknown error');
        }
        
        // Increment error counter
        performanceMetrics.errors++;
        
        // Show user-friendly error message if critical
        if (e.error && e.error.message && e.error.message.includes('critical')) {
            showNotification('Something went wrong. Please refresh the page.', 'error');
        }
    });
    
    // Handle failed form submissions gracefully
    window.addEventListener('unhandledrejection', function(e) {
        // Log error for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Unhandled promise rejection:', e.reason);
        }
        if (typeof trackEvent !== 'undefined') {
            trackEvent('Error', 'Promise Rejection', e.reason);
        }
    });
    
    // Performance monitoring
    let performanceMetrics = {
        loadTime: Date.now() - (performance.timing?.navigationStart || Date.now()),
        memoryUsage: 0,
        errors: 0,
        domReadyTime: 0
    };
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
        setInterval(() => {
            try {
                performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize;
                
                // Alert if memory usage is high (>50MB)
                if (performanceMetrics.memoryUsage > 50 * 1024 * 1024) {
                    if (typeof trackEvent !== 'undefined') {
                        trackEvent('Performance', 'Warning', 'High Memory Usage', Math.round(performanceMetrics.memoryUsage / 1024 / 1024));
                    }
                }
            } catch (error) {
                // Memory monitoring failed, continue silently
            }
        }, 30000); // Check every 30 seconds
    }
    
    // Report performance metrics
    setTimeout(() => {
        if (typeof trackEvent !== 'undefined') {
            trackEvent('Performance', 'Page Load', 'Load Time', performanceMetrics.loadTime);
        }
    }, 5000);
    
    // Memory optimization: Clean up unused event listeners
    function cleanupUnusedListeners() {
        // Remove event listeners from elements that are no longer in DOM
        const allElements = document.querySelectorAll('*');
        const eventListeners = [];
        
        // This is a simplified cleanup - in a real implementation, you'd track listeners
        // For now, we'll just monitor memory usage and suggest cleanup
        if (performanceMetrics.memoryUsage > 30 * 1024 * 1024) { // 30MB
            if (typeof trackEvent !== 'undefined') {
                trackEvent('Performance', 'Memory Warning', 'High Usage', Math.round(performanceMetrics.memoryUsage / 1024 / 1024));
            }
        }
    }
    
    // Run cleanup every 2 minutes
    setInterval(cleanupUnusedListeners, 120000);
    
    // =================================================================
    // TESTIMONIALS SLIDER
    // =================================================================
    
    let currentTestimonial = 0;
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    window.moveTestimonial = function(direction) {
        if (!testimonialTrack || testimonialItems.length === 0) return;
        
        currentTestimonial += direction;
        
        // Loop around
        if (currentTestimonial >= testimonialItems.length) {
            currentTestimonial = 0;
        } else if (currentTestimonial < 0) {
            currentTestimonial = testimonialItems.length - 1;
        }
        
        // Move slider
        const offset = -currentTestimonial * 100;
        testimonialTrack.style.transform = `translateX(${offset}%)`;
        
        // Track testimonial interaction
        trackEvent('Testimonials', 'Slide', currentTestimonial);
    };
    
    // Auto-slide testimonials
    if (testimonialTrack && testimonialItems.length > 1) {
        setInterval(() => {
            moveTestimonial(1);
        }, 8000); // Change every 8 seconds
    }
    
    // =================================================================
    // FAQ ACCORDION
    // =================================================================
    
    window.toggleFaq = function(button) {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't already active
        if (!isActive) {
            faqItem.classList.add('active');
            
            // Track FAQ interaction
            const question = button.querySelector('span').textContent;
            trackEvent('FAQ', 'Open', question);
        }
    };
    
    // =================================================================
    // ENHANCED SCROLL ANIMATIONS
    // =================================================================
    
    // Counter animation for trust signals
    function animateCounters() {
        const counters = document.querySelectorAll('.trust-item');
        
        counters.forEach(counter => {
            const text = counter.querySelector('h4').textContent;
            const number = text.match(/\d+/);
            
            if (number) {
                const target = parseInt(number[0]);
                const increment = target / 20;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    const newText = text.replace(/\d+/, Math.floor(current));
                    counter.querySelector('h4').textContent = newText;
                }, 100);
            }
        });
    }
    
    // Trigger counter animation when trust signals come into view
    const trustSignals = document.querySelector('.trust-signals');
    if (trustSignals) {
        const trustObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    trustObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        trustObserver.observe(trustSignals);
    }
    
    // =================================================================
    // ENHANCED FORM INTERACTIONS
    // =================================================================
    
    // Add floating labels effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if pre-filled
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // =================================================================
    // SOCIAL PROOF NOTIFICATIONS
    // =================================================================
    
    function showSocialProof() {
        const notifications = [
            "Someone from Oldham just requested a quote!",
            "New artificial grass installation completed in Saddleworth",
            "Another 5-star review from Uppermill customer",
            "Free quote requested from Delph area"
        ];
        
        const notification = document.createElement('div');
        notification.className = 'social-proof-notification';
        notification.innerHTML = `
            <div class="social-proof-content">
                <span class="social-proof-icon">🎉</span>
                <span class="social-proof-text">${notifications[Math.floor(Math.random() * notifications.length)]}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--accent-green);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2500;
            max-width: 300px;
            animation: slideInLeft 0.5s ease-out;
            cursor: pointer;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutLeft 0.5s ease-out';
                setTimeout(() => notification.remove(), 500);
            }
        }, 4000);
        
        // Remove on click
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutLeft 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Show social proof notifications occasionally
    if (Math.random() > 0.3) { // 70% chance
        setTimeout(showSocialProof, Math.random() * 30000 + 10000); // Between 10-40 seconds
    }
    
    // Development logging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎯 Artificial Grass Oldham website loaded successfully!');
    }
    
    // =================================================================
    // INLINE EVENT HANDLER CONVERSION
    // =================================================================
    
    // Convert all inline onclick handlers to event listeners
    function convertInlineHandlers() {
        // Quote modal buttons
        const quoteButtons = document.querySelectorAll('button[onclick*="openQuoteModal"]');
        quoteButtons.forEach(button => {
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openQuoteModal();
            });
        });
        
        // Close quote modal buttons
        const closeQuoteButtons = document.querySelectorAll('[onclick*="closeQuoteModal"]');
        closeQuoteButtons.forEach(button => {
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                closeQuoteModal();
            });
        });
        
        // Close success modal buttons
        const closeSuccessButtons = document.querySelectorAll('[onclick*="closeSuccessModal"]');
        closeSuccessButtons.forEach(button => {
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                closeSuccessModal();
            });
        });
        
        // Testimonial navigation buttons
        const testimonialButtons = document.querySelectorAll('[onclick*="moveTestimonial"]');
        testimonialButtons.forEach(button => {
            const onclick = button.getAttribute('onclick');
            const direction = onclick.includes('moveTestimonial(-1)') ? -1 : 1;
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                moveTestimonial(direction);
            });
        });
        
        // FAQ toggle buttons
        const faqButtons = document.querySelectorAll('[onclick*="toggleFaq"]');
        faqButtons.forEach(button => {
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFaq(this);
            });
        });
        
        // Notification close buttons
        const notificationCloseButtons = document.querySelectorAll('[onclick*="this.parentElement.parentElement.remove()"]');
        notificationCloseButtons.forEach(button => {
            button.removeAttribute('onclick');
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const notification = this.closest('.notification');
                if (notification) {
                    notification.remove();
                }
            });
        });
    }
    
    // Convert inline handlers after DOM is fully loaded
    try {
        convertInlineHandlers();
    } catch (error) {
        // Log error for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Event handler conversion error:', error);
        }
        
        // Track error for analytics
        if (typeof trackEvent !== 'undefined') {
            trackEvent('Error', 'Event Handler Conversion', error.message || 'Unknown error');
        }
    }
    
});

// =================================================================
// GLOBAL FUNCTIONS (for HTML onclick handlers)
// =================================================================

// FAQ toggle function (called from HTML)
window.toggleFaq = function(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
    
    // Track FAQ interaction
    if (typeof trackEvent !== 'undefined') {
        trackEvent('FAQ', 'Toggle', button.querySelector('span').textContent);
    }
};

// Testimonials carousel function (called from HTML)
window.moveTestimonial = function(direction) {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    
    const currentPosition = parseInt(track.style.transform.replace('translateX(', '').replace('%)', '') || 0);
    const newPosition = currentPosition + (direction * 100);
    
    // Limit movement
    const maxPosition = -200; // For 3 testimonials
    const clampedPosition = Math.max(maxPosition, Math.min(0, newPosition));
    
    track.style.transform = `translateX(${clampedPosition}%)`;
    
    // Track testimonial navigation
    if (typeof trackEvent !== 'undefined') {
        trackEvent('Testimonials', 'Navigate', direction > 0 ? 'Next' : 'Previous');
    }
};

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
    
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
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
    
    /* Social Proof Notifications */
    .social-proof-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .social-proof-icon {
        font-size: 1.2rem;
    }
    
    .social-proof-text {
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    /* Focused form groups */
    .form-group.focused input,
    .form-group.focused select {
        border-color: var(--accent-green);
        box-shadow: 0 0 0 3px rgba(45, 85, 48, 0.1);
    }
`;

document.head.appendChild(animationStyles);