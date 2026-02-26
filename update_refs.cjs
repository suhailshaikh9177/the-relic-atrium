// Update all .png references to .webp in source files where the .png no longer exists
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src';
const PUBLIC = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public';

// Walk all source files
function walkSrc(dir) {
    const results = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) results.push(...walkSrc(full));
        else if (/\.(tsx?|jsx?)$/.test(e.name)) results.push(full);
    });
    return results;
}

let totalChanges = 0;

walkSrc(SRC).forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;

    // Find all .png references that point to /images/...
    const pngRefs = content.match(/\/images\/[^'"]+\.png/g);
    if (pngRefs) {
        pngRefs.forEach(ref => {
            const publicPath = path.join(PUBLIC, ref);
            const webpPath = publicPath.replace(/\.png$/i, '.webp');

            // If the .png doesn't exist but the .webp does, update
            if (!fs.existsSync(publicPath) && fs.existsSync(webpPath)) {
                const newRef = ref.replace(/\.png$/i, '.webp');
                content = content.replace(ref, newRef);
                changed = true;
                totalChanges++;
                console.log(`  ${path.basename(file)}: ${ref} → ${newRef}`);
            }
        });
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf-8');
    }
});

console.log(`\nDone! ${totalChanges} references updated.`);
