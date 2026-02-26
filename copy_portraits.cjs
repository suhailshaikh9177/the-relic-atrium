/**
 * Script to copy all inventor portrait images from the reference folder
 * into the project's public/images/portraits/ directory, organized by wing.
 */
const fs = require('fs');
const path = require('path');

const SRC_BASE = 'C:/Users/suhai/OneDrive/Desktop/Project/artifacts reference/inventor portraits';
const DST_BASE = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public/images/portraits';

// Map source folder names to wing IDs
const WINGS = {
    'energy': 'energy',
    'transportation': 'transportation',
    'computation': 'computation',
    'communication': 'communication',
    'war': 'warfare',
    'scientific': 'instruments',
};

let totalCopied = 0;

for (const [srcFolder, wingId] of Object.entries(WINGS)) {
    const srcDir = path.join(SRC_BASE, srcFolder);
    const dstDir = path.join(DST_BASE, wingId);

    // Create destination directory
    fs.mkdirSync(dstDir, { recursive: true });

    const files = fs.readdirSync(srcDir);
    for (const file of files) {
        const srcPath = path.join(srcDir, file);
        const dstPath = path.join(dstDir, file);

        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, dstPath);
            totalCopied++;
            console.log(`  ✓ ${wingId}/${file}`);
        }
    }
}

console.log(`\nDone! Copied ${totalCopied} portrait files.`);
