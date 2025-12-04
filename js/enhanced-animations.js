/**
 * Enhanced Animations for Artificial Grass Oldham
 * Particle system, geometric shapes, and advanced visual effects
 */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeGeometricShapes();
    initializeScrollAnimations();
});

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
    particle.classList.add('particle');
    
    // Random size between 2px and 8px
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 10 + 15; // 15-25 seconds
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    // Random color variation - grass themed (green, cyan)
    const colorVariation = Math.random();
    if (colorVariation > 0.5) {
        // Cyan particles
        particle.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0.4) 30%, transparent 70%)';
        particle.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
    } else {
        // Green grass particles
        particle.style.background = 'radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, rgba(0, 255, 136, 0.4) 30%, transparent 70%)';
        particle.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
    }
    
    container.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration * 1000);
}

// Initialize Geometric Shapes
function initializeGeometricShapes() {
    const shapesContainer = document.getElementById('geometric-shapes');
    if (!shapesContainer) return;
    
    // Create grass blade SVG shapes
    const shapes = [
        createGrassBladeShape(),
        createGrassBladeShape(),
        createGrassBladeShape(),
        createGrassBladeShape(),
        createGrassBladeShape()
    ];
    
    shapes.forEach((shape, index) => {
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape');
        shapeElement.innerHTML = shape;
        
        // Random positioning
        shapeElement.style.left = Math.random() * 80 + 10 + '%';
        shapeElement.style.top = Math.random() * 80 + 10 + '%';
        
        // Random size
        const size = Math.random() * 60 + 40; // 40-100px
        shapeElement.style.width = size + 'px';
        shapeElement.style.height = size + 'px';
        
        // Random animation delay
        shapeElement.style.animationDelay = Math.random() * 5 + 's';
        
        shapesContainer.appendChild(shapeElement);
    });
}

function createGrassBladeShape() {
    // Create SVG grass blade shape
    return `
        <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 Q45 50 50 100 Q55 150 50 190" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2"
                  stroke-linecap="round"/>
            <path d="M50 50 Q48 70 50 90" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="1.5"
                  stroke-linecap="round"/>
            <path d="M50 100 Q52 120 50 140" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="1.5"
                  stroke-linecap="round"/>
        </svg>
    `;
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
    
    // Observe all fade-in-up elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll for navigation links
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
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax for geometric shapes
    const shapes = document.querySelectorAll('.geometric-shapes .shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cursor interaction for shapes (desktop only)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.geometric-shapes .shape');
        shapes.forEach((shape) => {
            const rect = shape.getBoundingClientRect();
            const shapeCenterX = rect.left + rect.width / 2;
            const shapeCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - shapeCenterX, 2) + 
                Math.pow(e.clientY - shapeCenterY, 2)
            );
            
            const maxDistance = 200;
            if (distance < maxDistance) {
                const moveX = (e.clientX - shapeCenterX) * 0.05;
                const moveY = (e.clientY - shapeCenterY) * 0.05;
                
                shape.style.transform += ` translate(${moveX}px, ${moveY}px)`;
                shape.style.opacity = Math.max(0.08, 0.15 - (distance / maxDistance) * 0.07);
            }
        });
    });
}
