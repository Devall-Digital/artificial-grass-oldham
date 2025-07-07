# Modern Coming Soon Landing Page

A visually striking, minimalist "Website Coming Soon" landing page with black and white branding.

## Features

- **Modern Design**: Clean, minimalist black and white aesthetic
- **Smooth Animations**: Staggered fade-in animations for all elements
- **Interactive Effects**: 
  - Custom cursor that follows mouse movement
  - Parallax floating shapes in the background
  - Hover effects on interactive elements
  - Click animations and ripple effects
- **Loading Animation**: Progress bar with shimmer effect
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Throttled animations for smooth 60fps performance

## Interactive Elements

- **Logo**: Rotates 360° on click
- **Main Title**: Glitch effect on hover, and special easter egg after 5 clicks
- **Social Dots**: Ripple effect on click
- **Spacebar**: Triggers glitch effect on main title
- **Mouse Movement**: Creates parallax effect on background shapes

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern animations, flexbox, grid, custom properties
- **Vanilla JavaScript**: Interactive effects and animations
- **Inter Font**: Modern, clean typography from Google Fonts

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive JavaScript effects
└── README.md       # This file
```

## How to Run

1. Open `index.html` in any modern web browser
2. Or serve via HTTP server:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

The design is easily customizable:
- Colors can be changed in the CSS variables
- Text content can be modified in the HTML
- Animation timings can be adjusted in the CSS animations
- Interactive effects can be modified in the JavaScript

## Performance

- Optimized animations using `requestAnimationFrame`
- Throttled event listeners for smooth performance
- Minimal DOM manipulation
- CSS transforms for hardware acceleration