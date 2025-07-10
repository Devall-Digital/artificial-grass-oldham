const puppeteer = require('puppeteer');

async function captureScreenshots() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Desktop screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'desktop-screenshot.png', fullPage: true });
    
    // Tablet screenshot
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'tablet-screenshot.png', fullPage: true });
    
    // Mobile screenshot
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'mobile-screenshot.png', fullPage: true });
    
    // Also capture home.html
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8000/home.html', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'home-desktop-screenshot.png', fullPage: true });
    
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('http://localhost:8000/home.html', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'home-mobile-screenshot.png', fullPage: true });
    
    await browser.close();
    console.log('Screenshots captured successfully!');
}

captureScreenshots().catch(console.error);