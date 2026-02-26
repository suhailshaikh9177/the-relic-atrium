// Fix broken image references in artifactsData.ts
// Also remove Elon Musk portrait from artifactEnrichment.ts
const fs = require('fs');

// --- Fix artifactsData.ts ---
const dataPath = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactsData.ts';
let data = fs.readFileSync(dataPath, 'utf-8');
const path = require('path');

// Fix: Find ALL image paths and compare against actual files
const PUBLIC = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public';

// Get all actual artifact files
function getAllFiles(dir) {
    const results = [];
    fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) results.push(...getAllFiles(full));
        else results.push(full);
    });
    return results;
}

const artifactFiles = getAllFiles(path.join(PUBLIC, 'images/artifacts'));
const fileMap = {};
artifactFiles.forEach(f => {
    // Extract basename without extension for fuzzy matching
    const rel = path.relative(PUBLIC, f).replace(/\\/g, '/');
    const base = path.basename(f, path.extname(f)).toLowerCase().replace(/['']/g, "'");
    fileMap[base] = '/' + rel;
});

// Find all image references in the data file
const lines = data.split('\n');
let fixes = 0;
for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/image:\s*'([^']+)'/);
    if (!match) continue;

    const imgPath = match[1];
    const fullPath = path.join(PUBLIC, imgPath);

    if (!fs.existsSync(fullPath)) {
        // Try to find the correct file
        const base = path.basename(imgPath, path.extname(imgPath)).toLowerCase().replace(/[''\\]/g, "'").replace(/\\u2019/g, "\u2019").replace(/'/g, "'");

        // Try exact base match first
        if (fileMap[base]) {
            console.log(`FIX line ${i + 1}: ${imgPath} -> ${fileMap[base]}`);
            lines[i] = lines[i].replace(imgPath, fileMap[base]);
            fixes++;
        } else {
            // Fuzzy: try to find a file whose basename contains key parts
            const searchTerms = base.replace(/[^a-z0-9 ]/g, '').split(' ').filter(s => s.length > 3);
            const candidates = Object.entries(fileMap).filter(([k]) =>
                searchTerms.every(t => k.includes(t))
            );
            if (candidates.length === 1) {
                console.log(`FIX line ${i + 1}: ${imgPath} -> ${candidates[0][1]}`);
                lines[i] = lines[i].replace(imgPath, candidates[0][1]);
                fixes++;
            } else if (candidates.length > 1) {
                console.log(`AMBIGUOUS line ${i + 1}: ${imgPath}`);
                candidates.forEach(([k, v]) => console.log(`  candidate: ${v}`));
            } else {
                console.log(`NO MATCH line ${i + 1}: ${imgPath}`);
            }
        }
    }
}

data = lines.join('\n');
fs.writeFileSync(dataPath, data, 'utf-8');
console.log(`\nFixed ${fixes} broken image references in artifactsData.ts`);

// --- Fix artifactEnrichment.ts: remove Elon Musk ---
const enrichPath = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactEnrichment.ts';
let enrich = fs.readFileSync(enrichPath, 'utf-8');

// Remove the Elon Musk inventor entry
const before = enrich;
enrich = enrich.replace(/\s*\{\s*name:\s*'Elon Musk'[^}]*\},?/g, '');
if (enrich !== before) {
    fs.writeFileSync(enrichPath, enrich, 'utf-8');
    console.log('\nRemoved Elon Musk from artifactEnrichment.ts');
} else {
    console.log('\nElon Musk entry not found in artifactEnrichment.ts');
}

console.log('\nDone!');
