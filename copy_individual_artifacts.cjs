const fs = require('fs/promises');
const path = require('path');

const sourceDir = 'C:\\Users\\suhai\\OneDrive\\Desktop\\Project\\artifacts reference\\previews\\artifacts';
const destDir = path.join(__dirname, 'public', 'images', 'artifacts');

async function copyArtifacts() {
    try {
        await fs.mkdir(destDir, { recursive: true });

        const categories = [
            'energy artifacts',
            'transportation artifacts',
            'computation artifacts',
            'communication artifacts',
            'defense artifacts',
            'scientific artifacts'
        ];

        for (const cat of categories) {
            const catSrc = path.join(sourceDir, cat);
            const catDest = path.join(destDir, cat.split(' ')[0]); // e.g. public/images/artifacts/energy

            await fs.mkdir(catDest, { recursive: true });

            const files = await fs.readdir(catSrc);
            for (const file of files) {
                const srcPath = path.join(catSrc, file);
                const destPath = path.join(catDest, file);

                const stat = await fs.stat(srcPath);
                if (stat.isFile()) {
                    await fs.copyFile(srcPath, destPath);
                }
            }
            console.log(`Copied ${cat} to ${catDest}`);
        }

        console.log('All individual artifacts copied successfully!');
    } catch (err) {
        console.error('Error copying artifacts:', err);
    }
}

copyArtifacts();
