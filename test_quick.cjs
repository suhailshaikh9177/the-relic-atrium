const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            if (msg.type() === 'error') console.log(`ERROR: ${msg.text()}`);
        });
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

        await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 });
        await new Promise(r => setTimeout(r, 4000));

        await page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
        console.log('Screenshot saved');

        await browser.close();
        console.log('Done');
    } catch (e) {
        console.error('Error:', e.message);
    }
})();
