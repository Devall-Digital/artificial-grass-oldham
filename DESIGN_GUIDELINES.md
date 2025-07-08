# 🎨 Design Guidelines & Technical Architecture

## 🎯 Design Philosophy

**Mission**: Create a premium, futuristic website that positions artificial grass installation as a high-end service while maintaining exceptional user experience and conversion optimization.

### Core Design Principles
- **Minimalist Luxury**: Clean, sophisticated design that conveys premium quality
- **Interactive Excellence**: Smooth animations and micro-interactions that delight users
- **Mobile-First**: Seamless experience across all devices and screen sizes
- **Performance-Driven**: Fast loading times without compromising visual appeal
- **Conversion-Optimized**: Every design element serves the lead generation goal

## 🎨 Visual Design System

### Color Palette
```css
/* Primary Colors */
--primary-black: #000000;
--primary-white: #ffffff;
--accent-green: #2d5530;
--accent-green-light: #4a7c4e;
--accent-green-dark: #1a3a1d;

/* Supporting Colors */
--gray-100: #f8f9fa;
--gray-200: #e9ecef;
--gray-300: #dee2e6;
--gray-400: #ced4da;
--gray-500: #adb5bd;
--gray-600: #6c757d;
--gray-700: #495057;
--gray-800: #343a40;
--gray-900: #212529;

/* Status Colors */
--success: #28a745;
--warning: #ffc107;
--error: #dc3545;
--info: #17a2b8;
```

### Typography
```css
/* Primary Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing System
```css
/* Spacing Scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 🎭 Interactive Elements

### Button Styles
```css
/* Primary CTA Button */
.cta-primary {
    background: linear-gradient(135deg, var(--accent-green), var(--accent-green-light));
    color: var(--primary-white);
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: var(--font-semibold);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(45, 85, 48, 0.3);
}

.cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 85, 48, 0.4);
}

/* Secondary Button */
.cta-secondary {
    background: transparent;
    color: var(--accent-green);
    border: 2px solid var(--accent-green);
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: var(--font-semibold);
    transition: all 0.3s ease;
}

.cta-secondary:hover {
    background: var(--accent-green);
    color: var(--primary-white);
    transform: translateY(-2px);
}
```

### Animation Guidelines
```css
/* Standard Transitions */
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;

/* Hover Effects */
.hover-lift {
    transition: transform var(--transition-normal);
}

.hover-lift:hover {
    transform: translateY(-4px);
}

/* Loading Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
}
```

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
/* Base styles for mobile (320px+) */

/* Small tablets (768px+) */
@media (min-width: 768px) {
    /* Tablet styles */
}

/* Large tablets and small desktops (1024px+) */
@media (min-width: 1024px) {
    /* Desktop styles */
}

/* Large desktops (1280px+) */
@media (min-width: 1280px) {
    /* Large desktop styles */
}

/* Extra large screens (1536px+) */
@media (min-width: 1536px) {
    /* Extra large styles */
}
```

### Mobile-First Principles
- **Touch Targets**: Minimum 44px × 44px for interactive elements
- **Readable Text**: Minimum 16px font size for body text
- **Adequate Spacing**: Comfortable spacing between interactive elements
- **Fast Loading**: Optimized images and assets for mobile networks

## 🏗️ Technical Architecture

### File Organization Standards
```
/
├── index.html          # Coming soon page (DO NOT MODIFY)
├── home.html           # Main website
├── about.html          # About page
├── services.html       # Services page
├── gallery.html        # Gallery/portfolio
├── contact.html        # Contact page
├── 404.html           # Error page
├── css/
│   ├── styles.css      # Main stylesheet
│   ├── components.css  # Reusable components
│   └── animations.css  # Animation definitions
├── js/
│   ├── script.js       # Main JavaScript
│   ├── animations.js   # Animation logic
│   └── forms.js        # Form handling
├── images/
│   ├── hero/           # Hero section images
│   ├── gallery/        # Gallery images
│   └── icons/          # Icon assets
└── php/
    ├── process-lead.php # Lead processing
    └── webhook-deploy.php # Deployment webhook
```

### Code Quality Standards

#### HTML Standards
```html
<!-- Semantic HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | Artificial Grass Oldham</title>
    <meta name="description" content="Page description">
    <!-- Schema markup for SEO -->
    <!-- Open Graph tags for social sharing -->
</head>
<body>
    <header>
        <nav>
            <!-- Navigation structure -->
        </nav>
    </header>
    
    <main>
        <!-- Main content sections -->
    </main>
    
    <footer>
        <!-- Footer content -->
    </footer>
</body>
</html>
```

#### CSS Standards
```css
/* Use CSS Custom Properties for consistency */
:root {
    /* Define all variables here */
}

/* Component-based CSS */
.component-name {
    /* Component styles */
}

/* Utility classes for common patterns */
.text-center { text-align: center; }
.mb-4 { margin-bottom: 1rem; }
.p-6 { padding: 1.5rem; }
```

#### JavaScript Standards
```javascript
// Modular JavaScript structure
class ComponentName {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        // Initialize component
    }
    
    // Component methods
}

// Event delegation for performance
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
});
```

## 🎯 UX Design Patterns

### Navigation Design
- **Sticky Header**: Navigation remains visible during scroll
- **Clear Hierarchy**: Logical menu structure with clear labels
- **Mobile Menu**: Hamburger menu with smooth animations
- **Breadcrumbs**: Clear navigation path for multi-level pages

### Form Design
- **Progressive Disclosure**: Show only necessary fields initially
- **Real-time Validation**: Immediate feedback on input errors
- **Clear Labels**: Descriptive labels and placeholder text
- **Success States**: Clear confirmation of successful submissions

### Content Layout
- **F-Pattern Reading**: Important content in F-pattern for scanning
- **Visual Hierarchy**: Clear heading structure and content flow
- **White Space**: Adequate spacing for readability
- **Call-to-Action Placement**: Strategic CTA positioning throughout

## 🔧 Performance Requirements

### Loading Performance
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Image Optimization
- **WebP Format**: Primary image format with fallbacks
- **Responsive Images**: srcset and sizes attributes
- **Lazy Loading**: Intersection Observer for images
- **Compression**: Optimized file sizes without quality loss

### Code Optimization
- **Minified Assets**: Compressed CSS, JS, and HTML
- **Tree Shaking**: Remove unused CSS and JavaScript
- **Critical CSS**: Inline critical styles for above-the-fold content
- **Code Splitting**: Load only necessary JavaScript

## 🎨 Brand Guidelines

### Logo Usage
- **Minimum Size**: 120px width for web usage
- **Clear Space**: Equal to logo height on all sides
- **Background**: White or light background preferred
- **File Formats**: SVG for web, PNG for fallbacks

### Photography Style
- **High Quality**: Minimum 1920px width for hero images
- **Natural Lighting**: Bright, natural outdoor lighting
- **Professional**: Clean, uncluttered compositions
- **Local Focus**: Oldham and Manchester area imagery

### Voice and Tone
- **Professional**: Expert knowledge and reliability
- **Approachable**: Friendly and helpful communication
- **Premium**: High-quality service positioning
- **Local**: Community-focused and trustworthy

---

## ❓ Questions for Clarification

1. **Brand Identity**: Do you have existing brand guidelines or logo files that should be incorporated?
2. **Color Preferences**: Are there any specific colors beyond the green palette that should be included?
3. **Typography**: Do you have a preferred font family or should we stick with Inter?
4. **Animation Level**: How much animation is too much? Should we be subtle or more dramatic?
5. **Image Sources**: Do you have existing photography or should we source from stock photo sites?
6. **Competitor Analysis**: Are there specific competitor websites whose design elements you admire?
7. **Accessibility**: Are there specific accessibility requirements we should prioritize?
8. **Browser Support**: What browsers and versions should we support?

---

*This document serves as the design foundation for all website development. Regular updates ensure consistency and quality across all pages and features.*