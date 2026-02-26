const fs = require('fs');
const path = require('path');

const publicBase = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public';
const dataPath = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/src/data/artifactsData.ts';

const renames = [
    {
        oldName: '/images/artifacts/energy/GE Haliade-X (12MW+).png',
        newName: '/images/artifacts/energy/GE_Haliade_X_12MW.png'
    },
    {
        oldName: "/images/artifacts/transportation/Stephenson's Rocket.png",
        newName: "/images/artifacts/transportation/Stephensons_Rocket.png"
    },
    {
        oldName: "/images/artifacts/communication/Bell's Centennial Liquid Transmitter.png",
        newName: "/images/artifacts/communication/Bells_Centennial_Liquid_Transmitter.png"
    },
    {
        oldName: '/images/artifacts/scientific/Galileo\u2019s Leather & Wood Tube (20x).png',
        newName: '/images/artifacts/scientific/Galileos_Leather_and_Wood_Tube_20x.png'
    },
    {
        oldName: '/images/artifacts/scientific/Robert Hooke\u2019s Micrographia Microscope.png',
        newName: '/images/artifacts/scientific/Robert_Hookes_Micrographia_Microscope.png'
    },
    {
        oldName: '/images/artifacts/scientific/John Harrison\u2019s H4.png',
        newName: '/images/artifacts/scientific/John_Harrisons_H4.png'
    }
];

let data = fs.readFileSync(dataPath, 'utf-8');
const failed = [];

for (const pair of renames) {
    const oldPath = path.join(publicBase, pair.oldName);
    const newPath = path.join(publicBase, pair.newName);

    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed on disk: ${pair.oldName} -> ${pair.newName}`);
    } else if (!fs.existsSync(newPath)) {
        console.warn(`WARNING: file not found: ${oldPath}`);
        failed.push(oldPath);
    }

    // Replace exactly the property in data
    const safeOldName = pair.oldName.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    const safeOldStr = safeOldName.replace(/'/g, "['\"\\\`\u2019]"); // match any quote variation
    const regex = new RegExp(`image:\\s*['"\`]${safeOldStr}['"\`]`, "g");

    if (regex.test(data)) {
        data = data.replace(regex, `image: '${pair.newName}'`);
        console.log(`Updated reference in artifactsData.ts for ${pair.newName}`);
    } else {
        console.log(`Could not find reference for ${pair.oldName} in data.`);
    }
}

fs.writeFileSync(dataPath, data, 'utf-8');
console.log('Finished updating filenames and references.');
if (failed.length) console.log('Failed:', failed);
