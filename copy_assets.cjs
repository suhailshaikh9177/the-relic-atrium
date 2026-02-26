const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('..');
const destDir = path.resolve('./public/images');

const filesToMove = [
    { src: 'mouse cursor.png', dest: 'cursor_stylized.png' },
    { src: 'tesla.png', dest: 'tesla.png' },
    { src: 'watts.png', dest: 'watt.png' }
];

console.log('Source Dir:', srcDir);
console.log('Dest Dir:', destDir);

filesToMove.forEach(file => {
    const srcPath = path.join(srcDir, file.src);
    const destPath = path.join(destDir, file.dest);

    if (fs.existsSync(srcPath)) {
        try {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Successfully copied ${file.src} to ${file.dest}`);
        } catch (e) {
            console.error(`Failed to copy ${file.src}:`, e);
        }
    } else {
        console.warn(`Source file missing: ${srcPath}`);
    }
});
