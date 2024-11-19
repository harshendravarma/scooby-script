const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const filePath = `file:${path.join(__dirname, 'example.html')}`;  // Replace 'example.html' with your HTML file
    await page.goto(filePath);
    await page.screenshot({ path: 'html_screenshot.png' });

    await browser.close();
})();