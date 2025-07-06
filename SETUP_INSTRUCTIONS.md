# Artificial Grass Manchester - Setup Instructions

## Quick Start Guide

This website is ready to upload to your 20i hosting account. Follow these steps:

### 1. Before Uploading

1. **Update Contact Details** in `index.html`:
   - Replace all instances of `0161 XXX XXXX` with your actual phone number
   - Replace `info@manchestergrass.co.uk` with your email
   - Update the Schema.org data with your business details

2. **Configure Lead Capture** in `process-lead.php`:
   - Replace `your-email@example.com` with your actual email
   - Replace `partner@unreallawns.co.uk` with Unreal Lawns' email (if you have it)

3. **Update Domain References**:
   - In `index.html`, replace `yourdomain.com` in the Schema markup with your actual domain

### 2. Upload to 20i Hosting

1. Log into your 20i control panel
2. Create a new website/subdomain for this project
3. Upload all files via FTP or File Manager:
   ```
   /public_html/your-domain/
   ├── index.html
   ├── process-lead.php
   ├── css/
   │   └── style.css
   ├── js/
   │   └── script.js
   └── images/
       └── (your images here)
   ```

4. Create a `leads` directory and set permissions to 755

### 3. Domain Setup

Suggested domain names:
- `manchester-artificial-grass.co.uk`
- `artificial-grass-manchester.com`
- `manchester-synthetic-lawns.co.uk`

### 4. Enable Lead Capture

To activate the PHP lead processing:

1. Update the JavaScript in `js/script.js` - uncomment the fetch code block
2. Change the fetch URL to point to your domain:
   ```javascript
   fetch('https://yourdomain.com/process-lead.php', {
   ```

### 5. Add Images

The site is ready for images. Add:
- Hero background image (1920x1080 recommended)
- Before/after gallery images
- A logo if you create one

### 6. SSL Certificate

Make sure to enable SSL in your 20i hosting panel for secure form submissions.

### 7. Testing

1. Test the form submission
2. Check that leads are saved to `leads/artificial-grass-leads.csv`
3. Verify email notifications are working
4. Test on mobile devices

### 8. SEO Checklist

- [ ] Submit to Google Search Console
- [ ] Create and submit XML sitemap
- [ ] Set up Google Analytics
- [ ] Add Google My Business listing
- [ ] Build local citations

### 9. Lead Management

Leads are saved in CSV format in the `leads` directory. You can:
- Download and open in Excel
- Set up automated email forwarding to partners
- Import into a CRM system later

### Next Steps

Once this site is generating leads:
1. Create similar sites for your other partners
2. Test different keywords and locations
3. Add PPC campaigns
4. Build backlinks

Good luck! 🚀