const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const getCurrentTimeFilename = () => {
        const now = new Date();
        return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
      };

    let fileName = getCurrentTimeFilename()

    console.log("fileName",fileName)

    // Go to the website
    await page.goto('https://www.walmart.com/ip/Great-Value-Milk-Whole-Vitamin-D-Half-Gallon-Plastic-Jug/10450118');  // Replace with the URL of the website you want to capture

    // await page.screenshot({ path: 'test22.png', fullPage: true });
    await page.screenshot({ path: `fidelity-test/images/actual/test-${fileName}.png` });

    // const firstScreenshotPath = path.join(__dirname, 'tests', 'screenshot1.png');
    // await page.screenshot({ path: firstScreenshotPath });
    console.log(`prod screenshot saved`);

    // Run a script on the website
    await page.evaluate(() => {
        // Your script goes here
        // For example, change the background color of the body
        // document.body.style.backgroundColor = 'lightblue';
        document.cookie="SENV=prodb"
    });

    // Wait for the script to take effect if necessary
    // await page.waitForTimeout(1000);  // Optional: wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Capture the screenshot
    await page.screenshot({ path: `fidelity-test/images/expected/test-${fileName}.png` });
    console.log(`prod-b screenshot saved`);

    await browser.close();
})();