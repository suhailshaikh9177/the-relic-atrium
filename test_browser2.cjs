const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Capture ALL console messages
        page.on('console', msg => {
            console.log(`CONSOLE [${msg.type()}]: ${msg.text()}`);
        });

        // Capture page errors with FULL stack traces
        page.on('pageerror', err => {
            console.log('PAGE ERROR:', err.message);
            console.log('STACK:', err.stack);
        });

        // Capture failed requests (network 404s)
        page.on('requestfailed', request => {
            console.log('FAILED REQUEST:', request.url(), request.failure()?.errorText);
        });

        console.log('Navigating to localhost:5173...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });

        // Wait a bit for R3F mount
        await new Promise(r => setTimeout(r, 3000));

        // Check if canvas exists in the DOM
        const canvasExists = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            return canvas ? { width: canvas.width, height: canvas.height, display: canvas.style.display } : null;
        });
        console.log('Canvas element:', JSON.stringify(canvasExists));

        // Check for any WebGL context errors
        const webglOk = await page.evaluate(() => {
            const canvas = document.querySelector('canvas');
            if (!canvas) return 'no canvas found';
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            return gl ? 'webgl ok' : 'webgl failed';
        });
        console.log('WebGL status:', webglOk);

        await browser.close();
        console.log('Done test.');
    } catch (e) {
        console.error('Puppeteer Script Error:', e);
    }
})();
