// Smooth scroll to form
function scrollToForm() {
    const form = document.getElementById('quote-form');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quote-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Here you would normally send the data to your server
            // For now, we'll just log it and show a success message
            console.log('Lead captured:', data);
            
            // Show success message
            const submitButton = form.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = '✓ Thank you! We\'ll call you shortly';
            submitButton.style.background = '#45a049';
            submitButton.disabled = true;
            
            // Reset form
            form.reset();
            
            // Reset button after 5 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 5000);
            
            // In a real implementation, you would:
            // 1. Send data to your server endpoint
            // 2. Save to database
            // 3. Send email notification to yourself
            // 4. Send auto-response to customer
            // 5. Forward lead to Unreal Lawns
            
            // Example of how you might send to a server:
            /*
            fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    source: 'artificial-grass-manchester',
                    partner: 'unreal-lawns',
                    timestamp: new Date().toISOString()
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log('Lead saved:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            */
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add phone number tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone call initiated:', this.href);
            // Track this event in Google Analytics or your preferred analytics tool
        });
    });
});