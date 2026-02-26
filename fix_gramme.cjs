const fs = require('fs');
const path = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactsData.ts';
let content = fs.readFileSync(path, 'utf-8');
const lines = content.split('\n');

// Fix lines 61-64 (0-indexed: 60-63)
// Replace corrupted lines with correct image line + closing brace
const correctImageLine = "        image: '/images/artifacts/energy/Z\u00e9nobe Gramme\u2019s Ring Dynam.png'";
const closingBrace = "    },";

// Find the corruption zone: lines 60-63 (0-indexed)
lines.splice(60, 4, correctImageLine, closingBrace);

fs.writeFileSync(path, lines.join('\n'), 'utf-8');
console.log('Fixed! Lines 61-64 replaced with correct content.');
console.log('New line 61:', lines[60]);
console.log('New line 62:', lines[61]);
