require('ts-node').register();
const { ARTIFACTS_DATA } = require('./src/data/artifactsData.ts');
const fs = require('fs');

let md = '# Grand Opus - Complete Artifact List\n\n';

const wings = [...new Set(ARTIFACTS_DATA.map(a => a.wingId))];

for (const w of wings) {
    md += `## Wing: ${w.toUpperCase()}\n\n`;
    const wingArtifacts = ARTIFACTS_DATA.filter(a => a.wingId === w);

    for (const a of wingArtifacts) {
        md += `### ${a.name}\n`;
        md += `- **Date**: ${a.date}\n`;
        md += `- **Inventor**: ${a.inventor} ${a.inventorDates ? `(${a.inventorDates})` : ''}\n`;
        md += `- **Country**: ${a.country}\n`;
        md += `- **Origin**: ${a.origin || 'N/A'}\n`;
        md += `- **Impact**: ${a.impact}\n`;
        md += `- **Description**: ${a.description || 'N/A'}\n`;
        md += `\n`;
    }
}

fs.writeFileSync('C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/artifacts_list_full.md', md);
