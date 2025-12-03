/**
 * GALLERY PAGE - INTERACTIVE FUNCTIONALITY
 * Before/After Sliders, Filtering, and Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // BEFORE/AFTER SLIDER FUNCTIONALITY
    // =================================================================
    
    function initBeforeAfterSliders() {
        const beforeAfterContainers = document.querySelectorAll('.before-after-container');
        
        beforeAfterContainers.forEach(container => {
            const afterImage = container.querySelector('.after-image');
            const sliderHandle = container.querySelector('.slider-handle');
            let isDragging = false;
            
            function updateSlider(percentage) {
                // Clamp percentage between 0 and 100
                percentage = Math.max(0, Math.min(100, percentage));
                
                // Update clip path for after image
                afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
                
                // Update slider handle position
                sliderHandle.style.left = `${percentage}%`;
            }
            
            function getPercentageFromEvent(e) {
                const rect = container.getBoundingClientRect();
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const percentage = ((clientX - rect.left) / rect.width) * 100;
                return percentage;
            }
            
            // Mouse Events
            container.addEventListener('mousedown', function(e) {
                isDragging = true;
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
                
                // Prevent image drag
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
            });
            
            // Touch Events for Mobile
            container.addEventListener('touchstart', function(e) {
                isDragging = true;
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
                
                // Prevent scrolling
                e.preventDefault();
            });
            
            document.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
                
                e.preventDefault();
            });
            
            document.addEventListener('touchend', function() {
                isDragging = false;
            });
            
            // Click to set position
            container.addEventListener('click', function(e) {
                if (isDragging) return;
                
                const percentage = getPercentageFromEvent(e);
                updateSlider(percentage);
            });
            
            // Keyboard accessibility
            container.setAttribute('tabindex', '0');
            container.addEventListener('keydown', function(e) {
                const currentLeft = parseFloat(sliderHandle.style.left) || 50;
                let newPercentage = currentLeft;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        newPercentage -= 5;
                        break;
                    case 'ArrowRight':
                        newPercentage += 5;
                        break;
                    case 'Home':
                        newPercentage = 0;
                        break;
                    case 'End':
                        newPercentage = 100;
                        break;
                    default:
                        return;
                }
                
                e.preventDefault();
                updateSlider(newPercentage);
            });
            
            // Initialize at 50%
            updateSlider(50);
        });
    }
    
    // =================================================================
    // GALLERY FILTERING SYSTEM
    // =================================================================
    
    function initGalleryFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                galleryItems.forEach(item => {
                    const categories = item.classList;
                    const shouldShow = filter === 'all' || categories.contains(filter);
                    
                    if (shouldShow) {
                        item.classList.remove('hidden');
                        item.classList.add('show');
                        // Remove show class after animation
                        setTimeout(() => item.classList.remove('show'), 500);
                    } else {
                        item.classList.add('hidden');
                    }
                });
                
                // Track filter usage
                if (typeof trackEvent !== 'undefined') {
                    trackEvent('Gallery', 'Filter', filter);
                }
            });
        });
        
        // Handle URL filter parameter
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');
        if (filterParam) {
            const filterButton = document.querySelector(`[data-filter="${filterParam}"]`);
            if (filterButton) {
                filterButton.click();
            }
        }
    }
    
    // =================================================================
    // LOAD MORE FUNCTIONALITY
    // =================================================================
    
    function initLoadMore() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const galleryGrid = document.querySelector('.gallery-grid');
        
        // Sample additional gallery items (in real implementation, these would come from server)
        const additionalItems = [
            {
                categories: ['residential', 'oldham'],
                beforeImage: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Modern Family Home - Oldham',
                description: 'Contemporary artificial grass installation with clean lines and integrated outdoor lighting.',
                location: 'Oldham Heights',
                size: '75m²',
                feature: 'LED Lighting'
            },
            {
                categories: ['commercial', 'saddleworth'],
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'School Playground - Saddleworth',
                description: 'Safe, durable artificial grass installation for primary school playground area.',
                location: 'Saddleworth Primary',
                size: '500m²',
                feature: 'Impact Absorption'
            },
            {
                categories: ['residential', 'before-after', 'saddleworth'],
                beforeImage: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Luxury Villa Transformation - Saddleworth',
                description: 'Premium artificial grass installation for high-end property with stunning results.',
                location: 'Saddleworth Moor',
                size: '150m²',
                feature: 'Premium Grade'
            }
        ];
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // Show loading state
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Simulate loading delay
                setTimeout(() => {
                    additionalItems.forEach(item => {
                        const galleryItem = createGalleryItem(item);
                        galleryGrid.insertBefore(galleryItem, galleryGrid.lastElementChild);
                    });
                    
                    // Re-initialize sliders for new items
                    initBeforeAfterSliders();
                    
                    // Update button
                    this.textContent = 'All Projects Loaded';
                    this.disabled = true;
                    this.style.opacity = '0.6';
                    
                    // Track load more usage
                    if (typeof trackEvent !== 'undefined') {
                        trackEvent('Gallery', 'Load More', 'Additional Projects');
                    }
                }, 1000);
            });
        }
    }
    
    function createGalleryItem(item) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.categories.join(' ')}`;
        
        let imageContent = '';
        if (item.beforeImage && item.afterImage) {
            // Before/After item
            imageContent = `
                <div class="before-after-container">
                    <div class="before-image">
                        <img src="${item.beforeImage}" alt="Before - ${item.title}" loading="lazy">
                        <span class="image-label">Before</span>
                    </div>
                    <div class="after-image">
                        <img src="${item.afterImage}" alt="After - ${item.title}" loading="lazy">
                        <span class="image-label">After</span>
                    </div>
                    <div class="slider-handle">
                        <div class="slider-line"></div>
                        <div class="slider-button">⟷</div>
                        <div class="slider-line"></div>
                    </div>
                </div>
            `;
        } else {
            // Regular item
            imageContent = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h4>${item.categories.includes('commercial') ? 'Commercial Project' : 'Residential Project'}</h4>
                        <p>${item.location}</p>
                    </div>
                </div>
            `;
        }
        
        galleryItem.innerHTML = `
            <div class="gallery-image-container">
                ${imageContent}
            </div>
            <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="project-details">
                    <span class="detail"><strong>Location:</strong> ${item.location}</span>
                    <span class="detail"><strong>Size:</strong> ${item.size}</span>
                    <span class="detail"><strong>Feature:</strong> ${item.feature}</span>
                </div>
            </div>
        `;
        
        return galleryItem;
    }
    
    // =================================================================
    // LAZY LOADING ENHANCEMENTS
    // =================================================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                    
                    // If image is already cached, show immediately
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // =================================================================
    // GALLERY ITEM ANIMATIONS
    // =================================================================
    
    function initScrollAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        galleryItems.forEach(item => itemObserver.observe(item));
    }
    
    // =================================================================
    // TESTIMONIAL CAROUSEL (Enhancement)
    // =================================================================
    
    function initTestimonialInteractions() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            card.addEventListener('click', function() {
                // Add a subtle pulse effect when clicked
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Track testimonial interaction
                if (typeof trackEvent !== 'undefined') {
                    const author = this.querySelector('strong').textContent;
                    trackEvent('Gallery', 'Testimonial Click', author);
                }
            });
        });
    }
    
    // =================================================================
    // GALLERY LIGHTBOX (Future Enhancement)
    // =================================================================
    
    function initGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-image-container img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function(e) {
                // Prevent default behavior for before/after containers
                if (this.closest('.before-after-container')) {
                    return;
                }
                
                e.stopPropagation();
                
                // Track image views
                if (typeof trackEvent !== 'undefined') {
                    trackEvent('Gallery', 'Image View', this.alt);
                }
                
                // Future: Open lightbox modal
                // Development logging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Lightbox feature - coming soon');
        }
            });
        });
    }
    
    // =================================================================
    // KEYBOARD NAVIGATION
    // =================================================================
    
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // ESC key to close any active interactions
            if (e.key === 'Escape') {
                // Reset all before/after sliders to center
                const sliders = document.querySelectorAll('.before-after-container');
                sliders.forEach(container => {
                    const afterImage = container.querySelector('.after-image');
                    const sliderHandle = container.querySelector('.slider-handle');
                    afterImage.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
                    sliderHandle.style.left = '50%';
                });
            }
        });
    }
    
    // =================================================================
    // PERFORMANCE MONITORING
    // =================================================================
    
    function initPerformanceMonitoring() {
        // Monitor gallery load times
        const startTime = performance.now();
        
        window.addEventListener('load', function() {
            const loadTime = performance.now() - startTime;
            
            if (typeof trackEvent !== 'undefined') {
                // Track performance metrics
                trackEvent('Performance', 'Gallery Load Time', Math.round(loadTime));
            }
            
            // Development logging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`Gallery loaded in ${Math.round(loadTime)}ms`);
        }
        });
        
        // Monitor scroll performance
        let scrollCount = 0;
        const throttledScroll = throttle(function() {
            scrollCount++;
        }, 100);
        
        window.addEventListener('scroll', throttledScroll);
        
        // Report scroll activity after 30 seconds
        setTimeout(() => {
            if (typeof trackEvent !== 'undefined' && scrollCount > 10) {
                trackEvent('Engagement', 'High Scroll Activity', scrollCount);
            }
        }, 30000);
    }
    
    // Throttle function for performance
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
    
    // =================================================================
    // INITIALIZATION
    // =================================================================
    
    // Initialize all gallery features with error handling
    try {
        initBeforeAfterSliders();
        initGalleryFiltering();
        initLoadMore();
        initLazyLoading();
        initScrollAnimations();
        initTestimonialInteractions();
        initGalleryLightbox();
        initKeyboardNavigation();
        initPerformanceMonitoring();
    } catch (error) {
        // Log error for debugging
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.error('Gallery initialization error:', error);
        }
        
        // Track error for analytics
        if (typeof trackEvent !== 'undefined') {
            trackEvent('Error', 'Gallery Init', error.message || 'Unknown error');
        }
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            font-size: 14px;
        `;
        errorMessage.textContent = 'Gallery loading issue. Please refresh the page.';
        document.body.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.parentNode.removeChild(errorMessage);
            }
        }, 5000);
    }
    
    // Development logging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🖼️ Gallery functionality initialized successfully!');
    }
    
    // Track gallery page view
    if (typeof trackEvent !== 'undefined') {
        trackEvent('Page', 'Gallery View', window.location.pathname);
    }
});

// =================================================================
// UTILITY FUNCTIONS
// =================================================================

// Debounce function for resize events
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

// Handle window resize for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Re-initialize sliders if needed
    const beforeAfterContainers = document.querySelectorAll('.before-after-container');
    beforeAfterContainers.forEach(container => {
        const afterImage = container.querySelector('.after-image');
        const sliderHandle = container.querySelector('.slider-handle');
        const currentLeft = parseFloat(sliderHandle.style.left) || 50;
        
        // Maintain current position after resize
        afterImage.style.clipPath = `polygon(${currentLeft}% 0%, 100% 0%, 100% 100%, ${currentLeft}% 100%)`;
    });
}, 250));

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBeforeAfterSliders,
        initGalleryFiltering,
        initLoadMore
    };
}