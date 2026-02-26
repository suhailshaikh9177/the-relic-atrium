const fs = require('fs');

const dataSrc = fs.readFileSync('C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactsData.ts', 'utf8');
const enrichSrc = fs.readFileSync('C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactEnrichment.ts', 'utf8');

let md = '# Grand Opus - Artifact Details\n\n';

const artifacts = [];
const itemRegex = /id:\s*'([^']+)',\s*wingId:\s*'([^']+)',\s*name:\s*'([^']+)',\s*date:\s*'([^']+)',\s*inventor:\s*'([^']+)',\s*country:\s*'([^']+)',\s*impact:\s*'([^']+)'/g;

let match;
while ((match = itemRegex.exec(dataSrc)) !== null) {
    artifacts.push({
        id: match[1],
        wingId: match[2],
        name: match[3],
        date: match[4],
        inventor: match[5],
        country: match[6],
        impact: match[7]
    });
}

const enrichMap = {};
// More robust regex
const blockRegex = /'([^']+)':\s*{([^}]+)}/g;
let blockMatch;
while ((blockMatch = blockRegex.exec(enrichSrc)) !== null) {
    const id = blockMatch[1];
    const blockText = blockMatch[2];

    // Extract dates
    const datesMatch = blockText.match(/inventorDates:\s*'([^']+)'/);
    // Extract origin
    const originMatch = blockText.match(/origin:\s*'([^']+)'/);

    // Extract description (handle escaped quotes)
    const descMatch = blockText.match(/description:\s*'((?:\\'|[^'])*)'/);
    let desc = descMatch ? descMatch[1] : null;
    if (desc) { desc = desc.replace(/\\'/g, "'"); }

    enrichMap[id] = {
        dates: datesMatch ? datesMatch[1] : null,
        origin: originMatch ? originMatch[1] : null,
        desc: desc
    };
}

const wings = [...new Set(artifacts.map(a => a.wingId))];

for (const w of wings) {
    md += `## Wing: ${w.toUpperCase()}\n\n`;
    const wingArtifacts = artifacts.filter(a => a.wingId === w);

    for (const a of wingArtifacts) {
        const enriched = enrichMap[a.id] || {};
        md += `### ${a.name}\n`;
        md += `- **Date**: ${a.date}\n`;
        md += `- **Inventor**: ${a.inventor} ${enriched.dates ? `(${enriched.dates})` : ''}\n`;
        md += `- **Country**: ${a.country}\n`;
        md += `- **Origin**: ${enriched.origin || 'N/A'}\n`;
        md += `- **Impact**: ${a.impact}\n`;
        md += `- **Description**: ${(enriched.desc || 'N/A').replace(/\n/g, ' ')}\n`;
        md += `\n`;
    }
}

fs.writeFileSync('C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/artifacts_list_full.md', md);
