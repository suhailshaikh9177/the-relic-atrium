const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

// Max dimensions for different image categories
const MAX_WIDTH = 1200;        // General images
const MAX_PORTRAIT = 800;      // Portraits
const QUALITY_WEBP = 80;       // WebP quality (80 is great for web)
const QUALITY_JPG = 82;

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

async function compressImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (!EXTENSIONS.has(ext)) return;

    const stat = fs.statSync(filePath);
    // Skip tiny files (icons, etc.)
    if (stat.size < 50 * 1024) { // < 50KB
        skipped++;
        return;
    }

    totalBefore += stat.size;
    const isPortrait = filePath.includes('portraits');
    const maxW = isPortrait ? MAX_PORTRAIT : MAX_WIDTH;

    try {
        const metadata = await sharp(filePath).metadata();
        const needsResize = metadata.width > maxW;

        let pipeline = sharp(filePath);

        if (needsResize) {
            pipeline = pipeline.resize({ width: maxW, withoutEnlargement: true });
        }

        // Determine output format
        let outPath = filePath;
        let buffer;

        if (ext === '.png') {
            // Check if image has alpha channel
            if (metadata.hasAlpha) {
                // Keep as PNG but compress heavily
                buffer = await pipeline.png({ quality: 80, compressionLevel: 9, effort: 10 }).toBuffer();
            } else {
                // Convert to WebP
                outPath = filePath.replace(/\.png$/i, '.webp');
                buffer = await pipeline.webp({ quality: QUALITY_WEBP }).toBuffer();
            }
        } else if (ext === '.jpg' || ext === '.jpeg') {
            buffer = await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toBuffer();
        } else if (ext === '.webp') {
            buffer = await pipeline.webp({ quality: QUALITY_WEBP }).toBuffer();
        }

        if (buffer) {
            // Only write if we actually reduced size
            if (buffer.length < stat.size) {
                fs.writeFileSync(outPath, buffer);
                // If we converted format, delete original
                if (outPath !== filePath) {
                    fs.unlinkSync(filePath);
                }
                totalAfter += buffer.length;
                processed++;
                const saved = ((1 - buffer.length / stat.size) * 100).toFixed(0);
                console.log(`  ✓ ${path.relative(PUBLIC, outPath)} — ${(stat.size / 1024 / 1024).toFixed(1)}MB → ${(buffer.length / 1024 / 1024).toFixed(2)}MB (${saved}% saved)`);
            } else {
                totalAfter += stat.size;
                skipped++;
            }
        }
    } catch (err) {
        console.error(`  ✗ Error: ${path.relative(PUBLIC, filePath)}: ${err.message}`);
        totalAfter += stat.size;
    }
}

async function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const promises = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Process directories sequentially to manage memory
            await walkDir(fullPath);
        } else {
            // Batch files within a directory
            promises.push(compressImage(fullPath));
        }
    }
    await Promise.all(promises);
}

async function main() {
    console.log('🗜️  Compressing images in public/ ...\n');
    const start = Date.now();

    await walkDir(PUBLIC);

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log('\n' + '='.repeat(50));
    console.log(`Done in ${elapsed}s`);
    console.log(`Processed: ${processed} files`);
    console.log(`Skipped: ${skipped} files (too small or no savings)`);
    console.log(`Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
    console.log(`After:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
    console.log(`Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
}

main().catch(console.error);
