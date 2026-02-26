const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\suhai\\OneDrive\\Desktop\\Project\\artifacts reference\\previews\\4k\\transparent';
const destDir = path.join(__dirname, 'public', 'images', '4k', 'transparent');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
    if (file.endsWith('.png')) {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to public/images/4k/transparent`);
    }
});
