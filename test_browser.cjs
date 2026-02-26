const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('BROWSER CONSOLE ERROR:', msg.text());
            }
        });

        page.on('pageerror', err => {
            console.log('PAGE ERROR STR:', err.toString());
        });

        console.log('Navigating to localhost:5173...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

        await browser.close();
        console.log('Done test.');
    } catch (e) {
        console.error('Puppeteer Script Error:', e);
    }
})();
