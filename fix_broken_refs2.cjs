// Targeted fix for the 4 remaining broken paths
const fs = require('fs');
const dataPath = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactsData.ts';
let data = fs.readFileSync(dataPath, 'utf-8');

const fixes = [
    // Bell's Centennial (line ~355, truncated path with escaped apostrophe)
    {
        search: /image:\s*'\/images\/artifacts\/communication\/Bell\\/,
        replace: "image: '/images/artifacts/communication/Bell\u2019s Centennial Liquid Transmitter.webp'"
    },
    // Galileo's telescope (has literal \u2019)
    {
        search: /image:\s*'\/images\/artifacts\/scientific\/Galileo\\u2019s Leather & Wood Tube \(20x\)\.png'/,
        replace: "image: '/images/artifacts/scientific/Galileo\u2019s Leather & Wood Tube (20x).webp'"
    },
    // Robert Hooke's Microscope
    {
        search: /image:\s*'\/images\/artifacts\/scientific\/Robert Hooke\\u2019s Micrographia Microscope\.png'/,
        replace: "image: '/images/artifacts/scientific/Robert Hooke\u2019s Micrographia Microscope.webp'"
    },
    // John Harrison's H4
    {
        search: /image:\s*'\/images\/artifacts\/scientific\/John Harrison\\u2019s H4\.png'/,
        replace: "image: '/images/artifacts/scientific/John Harrison\u2019s H4.webp'"
    },
];

let count = 0;
for (const fix of fixes) {
    if (fix.search.test(data)) {
        // For the Bell case, we need to match until end of the line
        if (fix.search.source.includes('Bell')) {
            // Match from Bell\ to the end of the property value (next line)
            const bellRegex = /image:\s*'\/images\/artifacts\/communication\/Bell\\[^']*'/;
            const bellLineMatch = data.match(bellRegex);
            if (bellLineMatch) {
                data = data.replace(bellLineMatch[0], fix.replace);
                console.log('Fixed Bell Centennial');
                count++;
            } else {
                // Try matching across lines
                const lines = data.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].includes("communication/Bell\\")) {
                        lines[i] = "                            " + fix.replace;
                        data = lines.join('\n');
                        console.log('Fixed Bell Centennial (line splice)');
                        count++;
                        break;
                    }
                }
            }
        } else {
            data = data.replace(fix.search, fix.replace);
            console.log('Fixed:', fix.replace.substring(0, 60));
            count++;
        }
    } else {
        // Try line-by-line for trickier matches
        const lines = data.split('\n');
        let found = false;
        for (let i = 0; i < lines.length; i++) {
            if (fix.search.source.includes('Galileo') && lines[i].includes('Galileo') && lines[i].includes('image')) {
                lines[i] = "                            " + fix.replace;
                found = true; break;
            }
            if (fix.search.source.includes('Hooke') && lines[i].includes('Hooke') && lines[i].includes('image')) {
                lines[i] = "                            " + fix.replace;
                found = true; break;
            }
            if (fix.search.source.includes('Harrison') && lines[i].includes('Harrison') && lines[i].includes('image')) {
                lines[i] = "                            " + fix.replace;
                found = true; break;
            }
        }
        if (found) {
            data = lines.join('\n');
            console.log('Fixed (line splice):', fix.replace.substring(0, 60));
            count++;
        } else {
            console.log('NOT FOUND:', fix.search.source.substring(0, 50));
        }
    }
}

fs.writeFileSync(dataPath, data, 'utf-8');
console.log(`\nFixed ${count} more references`);

// Verify all paths now
const path = require('path');
const PUBLIC = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public';
const newData = fs.readFileSync(dataPath, 'utf-8');
const refs = newData.match(/image:\s*'([^']+)'/g) || [];
let broken = 0;
refs.forEach(r => {
    const p = r.match(/image:\s*'([^']+)'/)[1];
    const full = path.join(PUBLIC, p);
    if (!fs.existsSync(full)) {
        broken++;
        console.log('STILL MISSING:', JSON.stringify(p));
    }
});
console.log(`\nRemaining broken: ${broken}`);
