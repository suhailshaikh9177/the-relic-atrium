const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            console.log(`[${msg.type()}] ${msg.text()}`);
        });

        page.on('pageerror', err => {
            console.log('PAGE ERROR:', err.message);
            if (err.stack) console.log('STACK:', err.stack.split('\n').slice(0, 5).join('\n'));
        });

        page.on('requestfailed', request => {
            console.log('FAILED REQUEST:', request.url(), request.failure()?.errorText);
        });

        console.log('Navigating...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait for R3F scene to process
        await new Promise(r => setTimeout(r, 5000));

        // Check canvas dimensions and visibility
        const info = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return { canvas: 'NOT FOUND' };

            const rect = canvas.getBoundingClientRect();
            const style = window.getComputedStyle(canvas);
            const parent = canvas.parentElement;
            const parentRect = parent ? parent.getBoundingClientRect() : null;

            return {
                canvas: {
                    width: canvas.width,
                    height: canvas.height,
                    rectWidth: rect.width,
                    rectHeight: rect.height,
                    rectTop: rect.top,
                    rectLeft: rect.left,
                    display: style.display,
                    visibility: style.visibility,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                },
                parent: parentRect ? {
                    width: parentRect.width,
                    height: parentRect.height,
                    top: parentRect.top,
                    left: parentRect.left,
                    zIndex: parent ? window.getComputedStyle(parent).zIndex : 'N/A',
                    position: parent ? window.getComputedStyle(parent).position : 'N/A',
                } : null,
                viewport: {
                    innerWidth: window.innerWidth,
                    innerHeight: window.innerHeight,
                },
            };
        });
        console.log('INFO:', JSON.stringify(info, null, 2));

        // Screenshot for debugging
        await page.screenshot({ path: 'debug_screenshot.png', fullPage: true });
        console.log('Screenshot saved to debug_screenshot.png');

        await browser.close();
        console.log('Done.');
    } catch (e) {
        console.error('Error:', e);
    }
})();
