const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set a large timeout
    page.setDefaultTimeout(60000);

    // Start server
    const { spawn } = require('child_process');
    const server = spawn('npm', ['run', 'preview'], { cwd: 'C:/Users/suhai/OneDrive/Desktop/Project/the-relic-atrium' });

    // Wait a moment for server to start
    await new Promise(r => setTimeout(r, 3000));

    try {
        console.log('Navigating to local preview...');
        await page.goto('http://localhost:4173');

        console.log('Waiting for Loading Assets text...');
        await page.waitForSelector('text=Loading Assets', { timeout: 10000 });

        // Wait to see if it reaches 100
        console.log('Waiting for 100%...');

        let reached100 = false;
        for (let i = 0; i < 30; i++) { // wait up to 30 seconds
            const text = await page.evaluate(() => document.body.innerText);
            if (text.includes('100')) {
                reached100 = true;
                console.log('Reached 100% successfully!');
                break;
            }
            const progressMatch = text.match(/Loading Assets\n+(\d+)/);
            if (progressMatch) {
                console.log(`Current progress: ${progressMatch[1]}%`);
            }
            await new Promise(r => setTimeout(r, 1000));
        }

        if (!reached100) {
            console.error('Failed to reach 100% in 30 seconds.');
        } else {
            // Wait for The Relic Atrium to appear
            console.log('Waiting for main site to reveal...');
            await page.waitForSelector('text=The Relic Atrium', { timeout: 10000 });
            console.log('Main site revealed successfully!');
        }

    } catch (e) {
        console.error('Test failed:', e);
    } finally {
        server.kill();
        await browser.close();
    }
})();
