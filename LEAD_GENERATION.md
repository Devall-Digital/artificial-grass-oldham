# 🎯 Lead Generation Strategy & Conversion Optimization

## 🎯 Lead Generation Mission

**Primary Goal**: Capture maximum qualified leads before competitors can reach them, converting website visitors into actionable business opportunities for artificial grass installation partners.

### Lead Quality Standards
- **Contact Information**: Valid phone numbers and email addresses
- **Project Details**: Specific requirements and timeline
- **Budget Range**: Qualified prospects with realistic budgets
- **Location**: Oldham and surrounding areas only
- **Intent**: High purchase intent and urgency

## 📋 Lead Capture Strategy

### Multi-Point Lead Capture
1. **Hero Section CTA** - Primary conversion point above the fold
2. **Sticky Header CTA** - Always visible call-to-action
3. **Modal Popup** - Timed or scroll-triggered lead capture
4. **Contact Page Form** - Dedicated lead capture page
5. **Gallery CTAs** - Contextual CTAs within portfolio sections
6. **Footer Contact** - Secondary contact information
7. **Floating CTA Button** - Persistent mobile-friendly CTA

### Lead Capture Timing
- **Immediate**: Hero section and sticky header
- **Engagement**: After 30 seconds on page
- **Scroll Depth**: At 50% and 75% page scroll
- **Exit Intent**: When mouse leaves viewport
- **Time on Page**: After 2 minutes of engagement

## 📝 Form Design & Optimization

### Primary Lead Capture Form
```html
<form class="lead-form" action="process-lead.php" method="POST">
    <!-- Hidden Fields -->
    <input type="hidden" name="source" value="website">
    <input type="hidden" name="page" value="current-page">
    <input type="hidden" name="timestamp" value="">
    
    <!-- Required Fields -->
    <div class="form-group">
        <label for="name">Full Name *</label>
        <input type="text" id="name" name="name" required 
               placeholder="Enter your full name">
    </div>
    
    <div class="form-group">
        <label for="phone">Phone Number *</label>
        <input type="tel" id="phone" name="phone" required 
               placeholder="0161 123 4567">
    </div>
    
    <div class="form-group">
        <label for="email">Email Address *</label>
        <input type="email" id="email" name="email" required 
               placeholder="your@email.com">
    </div>
    
    <!-- Optional Fields -->
    <div class="form-group">
        <label for="address">Property Address</label>
        <input type="text" id="address" name="address" 
               placeholder="Enter your address">
    </div>
    
    <div class="form-group">
        <label for="project_type">Project Type</label>
        <select id="project_type" name="project_type">
            <option value="">Select project type</option>
            <option value="garden">Garden Installation</option>
            <option value="patio">Patio Area</option>
            <option value="playground">Children's Play Area</option>
            <option value="commercial">Commercial Property</option>
            <option value="other">Other</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="area_size">Approximate Area Size</label>
        <select id="area_size" name="area_size">
            <option value="">Select area size</option>
            <option value="small">Under 50m²</option>
            <option value="medium">50-100m²</option>
            <option value="large">100-200m²</option>
            <option value="xlarge">Over 200m²</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="timeline">Preferred Timeline</label>
        <select id="timeline" name="timeline">
            <option value="">Select timeline</option>
            <option value="urgent">As soon as possible</option>
            <option value="1month">Within 1 month</option>
            <option value="3months">Within 3 months</option>
            <option value="flexible">Flexible</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="budget">Budget Range</label>
        <select id="budget" name="budget">
            <option value="">Select budget range</option>
            <option value="under2k">Under £2,000</option>
            <option value="2k-5k">£2,000 - £5,000</option>
            <option value="5k-10k">£5,000 - £10,000</option>
            <option value="over10k">Over £10,000</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="message">Additional Details</label>
        <textarea id="message" name="message" rows="4" 
                  placeholder="Tell us about your project requirements..."></textarea>
    </div>
    
    <!-- Consent -->
    <div class="form-group checkbox-group">
        <label class="checkbox-label">
            <input type="checkbox" name="consent" required>
            I agree to be contacted about my artificial grass project
        </label>
    </div>
    
    <button type="submit" class="cta-primary">
        Get Free Quote Now
    </button>
</form>
```

### Form Validation & UX
```javascript
// Real-time form validation
class LeadFormValidator {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        this.setupValidation();
        this.setupAutoSave();
        this.setupProgressIndicator();
    }
    
    setupValidation() {
        // Phone number validation
        const phoneInput = this.form.querySelector('#phone');
        phoneInput.addEventListener('input', (e) => {
            this.validatePhone(e.target.value);
        });
        
        // Email validation
        const emailInput = this.form.querySelector('#email');
        emailInput.addEventListener('blur', (e) => {
            this.validateEmail(e.target.value);
        });
        
        // Real-time field validation
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
        });
    }
    
    validatePhone(phone) {
        const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
        const isValid = phoneRegex.test(phone.replace(/\s/g, ''));
        
        if (!isValid && phone.length > 0) {
            this.showError('phone', 'Please enter a valid UK phone number');
        } else {
            this.clearError('phone');
        }
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        
        if (!isValid && email.length > 0) {
            this.showError('email', 'Please enter a valid email address');
        } else {
            this.clearError('email');
        }
    }
    
    showError(fieldId, message) {
        const field = this.form.querySelector(`#${fieldId}`);
        const errorDiv = field.parentNode.querySelector('.error-message') || 
                        this.createErrorElement();
        
        errorDiv.textContent = message;
        field.classList.add('error');
    }
    
    clearError(fieldId) {
        const field = this.form.querySelector(`#${fieldId}`);
        const errorDiv = field.parentNode.querySelector('.error-message');
        
        if (errorDiv) errorDiv.remove();
        field.classList.remove('error');
    }
}
```

## 🎯 Call-to-Action Strategy

### CTA Button Hierarchy
1. **Primary CTA**: "Get Free Quote Now" - Main conversion button
2. **Secondary CTA**: "View Our Gallery" - Engagement button
3. **Tertiary CTA**: "Call Us Today" - Direct contact option

### CTA Placement Strategy
```css
/* Hero Section CTA */
.hero-cta {
    position: relative;
    z-index: 10;
    margin-top: 2rem;
}

.hero-cta .cta-primary {
    font-size: 1.25rem;
    padding: 1.25rem 2.5rem;
    box-shadow: 0 8px 25px rgba(45, 85, 48, 0.4);
}

/* Sticky Header CTA */
.sticky-cta {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    background: var(--accent-green);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

/* Floating CTA (Mobile) */
.floating-cta {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--accent-green);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(45, 85, 48, 0.4);
    transition: all 0.3s ease;
}

.floating-cta:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(45, 85, 48, 0.6);
}
```

### CTA Copy Variations
```javascript
// Dynamic CTA copy based on context
const ctaVariations = {
    hero: [
        "Get Free Quote Now",
        "Transform Your Garden Today",
        "Start Your Project"
    ],
    gallery: [
        "Get This Look",
        "Book Consultation",
        "Get Similar Quote"
    ],
    services: [
        "Get Started",
        "Request Quote",
        "Book Survey"
    ],
    contact: [
        "Send Message",
        "Get Free Quote",
        "Book Call"
    ]
};

// Rotate CTA copy for A/B testing
function rotateCTACopy() {
    const ctaButtons = document.querySelectorAll('.cta-primary');
    ctaButtons.forEach(button => {
        const context = button.dataset.context || 'hero';
        const variations = ctaVariations[context];
        const randomIndex = Math.floor(Math.random() * variations.length);
        button.textContent = variations[randomIndex];
    });
}
```

## 📞 Contact Information Strategy

### Primary Contact Details
```html
<!-- Contact Information -->
<div class="contact-info">
    <div class="contact-item">
        <i class="icon-phone"></i>
        <div>
            <strong>Call Us Today</strong>
            <a href="tel:01611234567">0161 123 4567</a>
        </div>
    </div>
    
    <div class="contact-item">
        <i class="icon-email"></i>
        <div>
            <strong>Email Us</strong>
            <a href="mailto:info@artificialgrassoldham.co.uk">info@artificialgrassoldham.co.uk</a>
        </div>
    </div>
    
    <div class="contact-item">
        <i class="icon-location"></i>
        <div>
            <strong>Service Area</strong>
            <span>Oldham, Saddleworth, Uppermill & Surrounding Areas</span>
        </div>
    </div>
    
    <div class="contact-item">
        <i class="icon-clock"></i>
        <div>
            <strong>Response Time</strong>
            <span>We respond within 2 hours</span>
        </div>
    </div>
</div>
```

### Contact Information Placement
1. **Header**: Phone number prominently displayed
2. **Footer**: Complete contact information
3. **Contact Page**: Detailed contact form and information
4. **Sidebar**: Quick contact widget
5. **Mobile Menu**: Contact information in mobile navigation

## 🔄 Lead Processing & Management

### PHP Lead Processing
```php
<?php
// process-lead.php - Lead processing and storage

class LeadProcessor {
    private $leadData;
    private $validationRules;
    
    public function __construct() {
        $this->setupValidationRules();
    }
    
    public function processLead() {
        // Validate input
        if (!$this->validateInput()) {
            $this->sendErrorResponse('Invalid input data');
            return;
        }
        
        // Sanitize data
        $this->sanitizeData();
        
        // Store lead
        $leadId = $this->storeLead();
        
        // Send notifications
        $this->sendNotifications($leadId);
        
        // Redirect to thank you page
        $this->redirectToThankYou();
    }
    
    private function validateInput() {
        $required = ['name', 'phone', 'email'];
        
        foreach ($required as $field) {
            if (empty($_POST[$field])) {
                return false;
            }
        }
        
        // Validate email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        
        // Validate phone
        if (!preg_match('/^(\+44|0)[1-9]\d{8,9}$/', $_POST['phone'])) {
            return false;
        }
        
        return true;
    }
    
    private function sanitizeData() {
        $this->leadData = [
            'name' => htmlspecialchars($_POST['name']),
            'phone' => preg_replace('/[^0-9+]/', '', $_POST['phone']),
            'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
            'address' => htmlspecialchars($_POST['address'] ?? ''),
            'project_type' => htmlspecialchars($_POST['project_type'] ?? ''),
            'area_size' => htmlspecialchars($_POST['area_size'] ?? ''),
            'timeline' => htmlspecialchars($_POST['timeline'] ?? ''),
            'budget' => htmlspecialchars($_POST['budget'] ?? ''),
            'message' => htmlspecialchars($_POST['message'] ?? ''),
            'source' => htmlspecialchars($_POST['source'] ?? 'website'),
            'page' => htmlspecialchars($_POST['page'] ?? ''),
            'timestamp' => date('Y-m-d H:i:s'),
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ];
    }
    
    private function storeLead() {
        // Store in CSV file for easy management
        $csvFile = 'leads/leads.csv';
        $csvData = [
            $this->leadData['timestamp'],
            $this->leadData['name'],
            $this->leadData['phone'],
            $this->leadData['email'],
            $this->leadData['address'],
            $this->leadData['project_type'],
            $this->leadData['area_size'],
            $this->leadData['timeline'],
            $this->leadData['budget'],
            $this->leadData['message'],
            $this->leadData['source'],
            $this->leadData['page'],
            $this->leadData['ip_address']
        ];
        
        $handle = fopen($csvFile, 'a');
        fputcsv($handle, $csvData);
        fclose($handle);
        
        return uniqid();
    }
    
    private function sendNotifications($leadId) {
        // Send email notification
        $this->sendEmailNotification($leadId);
        
        // Send SMS notification (if configured)
        $this->sendSMSNotification($leadId);
        
        // Send to CRM/webhook (if configured)
        $this->sendToCRM($leadId);
    }
    
    private function sendEmailNotification($leadId) {
        $to = 'info@artificialgrassoldham.co.uk';
        $subject = 'New Lead Received - ' . $this->leadData['name'];
        
        $message = "
        New lead received from website:
        
        Name: {$this->leadData['name']}
        Phone: {$this->leadData['phone']}
        Email: {$this->leadData['email']}
        Address: {$this->leadData['address']}
        Project Type: {$this->leadData['project_type']}
        Area Size: {$this->leadData['area_size']}
        Timeline: {$this->leadData['timeline']}
        Budget: {$this->leadData['budget']}
        Message: {$this->leadData['message']}
        
        Lead ID: $leadId
        Source: {$this->leadData['source']}
        Page: {$this->leadData['page']}
        ";
        
        mail($to, $subject, $message);
    }
    
    private function redirectToThankYou() {
        header('Location: /thank-you.html');
        exit();
    }
}

// Initialize and process
$processor = new LeadProcessor();
$processor->processLead();
?>
```

## 📊 Conversion Rate Optimization

### A/B Testing Strategy
```javascript
// A/B Testing Framework
class ABTestManager {
    constructor() {
        this.tests = {
            'cta-copy': {
                variants: ['Get Free Quote', 'Transform Your Garden', 'Start Today'],
                metric: 'click_rate'
            },
            'form-length': {
                variants: ['short', 'medium', 'long'],
                metric: 'conversion_rate'
            },
            'cta-color': {
                variants: ['green', 'blue', 'orange'],
                metric: 'click_rate'
            }
        };
        
        this.init();
    }
    
    init() {
        this.assignVariants();
        this.trackInteractions();
    }
    
    assignVariants() {
        // Assign user to test variants
        Object.keys(this.tests).forEach(testName => {
            const variant = this.getRandomVariant(testName);
            this.setVariant(testName, variant);
        });
    }
    
    setVariant(testName, variant) {
        localStorage.setItem(`ab_test_${testName}`, variant);
        
        // Apply variant to page
        this.applyVariant(testName, variant);
    }
    
    applyVariant(testName, variant) {
        switch(testName) {
            case 'cta-copy':
                this.updateCTACopy(variant);
                break;
            case 'form-length':
                this.updateFormLength(variant);
                break;
            case 'cta-color':
                this.updateCTAColor(variant);
                break;
        }
    }
    
    trackInteractions() {
        // Track CTA clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cta-primary')) {
                this.trackEvent('cta_click', {
                    test: 'cta-copy',
                    variant: localStorage.getItem('ab_test_cta-copy')
                });
            }
        });
        
        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.lead-form')) {
                this.trackEvent('form_submit', {
                    test: 'form-length',
                    variant: localStorage.getItem('ab_test_form-length')
                });
            }
        });
    }
    
    trackEvent(eventName, data) {
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        
        // Send to custom tracking endpoint
        fetch('/track-event.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: eventName,
                data: data,
                timestamp: new Date().toISOString()
            })
        });
    }
}
```

## 🎯 Lead Scoring & Qualification

### Lead Scoring Criteria
```javascript
// Lead scoring system
class LeadScorer {
    constructor() {
        this.scoringRules = {
            'contact_info': {
                'phone_email': 10,
                'phone_only': 5,
                'email_only': 3
            },
            'project_details': {
                'area_size': 5,
                'timeline': 3,
                'budget': 5,
                'project_type': 2
            },
            'urgency': {
                'urgent': 10,
                '1month': 7,
                '3months': 3,
                'flexible': 1
            },
            'location': {
                'oldham': 10,
                'saddleworth': 8,
                'uppermill': 8,
                'other': 3
            }
        };
    }
    
    scoreLead(leadData) {
        let score = 0;
        
        // Contact information score
        if (leadData.phone && leadData.email) {
            score += this.scoringRules.contact_info.phone_email;
        } else if (leadData.phone) {
            score += this.scoringRules.contact_info.phone_only;
        } else if (leadData.email) {
            score += this.scoringRules.contact_info.email_only;
        }
        
        // Project details score
        if (leadData.area_size) score += this.scoringRules.project_details.area_size;
        if (leadData.timeline) score += this.scoringRules.urgency[leadData.timeline] || 0;
        if (leadData.budget) score += this.scoringRules.project_details.budget;
        if (leadData.project_type) score += this.scoringRules.project_details.project_type;
        
        // Location score
        const location = this.getLocationScore(leadData.address);
        score += location;
        
        return {
            score: score,
            qualification: this.qualifyLead(score),
            priority: this.getPriority(score)
        };
    }
    
    qualifyLead(score) {
        if (score >= 25) return 'hot';
        if (score >= 15) return 'warm';
        if (score >= 8) return 'lukewarm';
        return 'cold';
    }
    
    getPriority(score) {
        if (score >= 25) return 'immediate';
        if (score >= 15) return 'high';
        if (score >= 8) return 'medium';
        return 'low';
    }
}
```

---

## ❓ Questions for Clarification

1. **Lead Distribution**: How should leads be distributed to business partners? Email, CRM, or other system?
2. **Lead Scoring**: What criteria are most important for qualifying leads as "hot" vs "cold"?
3. **Response Time**: What is the target response time for new leads?
4. **Follow-up Process**: What is the follow-up sequence for leads that don't convert immediately?
5. **Budget Ranges**: Are the budget ranges appropriate for the Oldham market?
6. **Project Types**: Should we add more specific project types or keep them general?
7. **Contact Preferences**: Do customers prefer phone calls, emails, or text messages?
8. **Lead Storage**: Should leads be stored in a database, CRM, or CSV files?
9. **Automation**: What level of automation should be implemented for lead follow-up?
10. **Integration**: Should the lead system integrate with any existing business tools?

---

*This document outlines the complete lead generation strategy. Regular optimization and testing ensure maximum conversion rates and lead quality.*