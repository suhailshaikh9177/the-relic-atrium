const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/suhai/OneDrive/Desktop/Project/portraits/solo/pngs/grand-opus/public/images/artifacts/scientific';

const renames = [
    ["Lawrence's 27-inch Cyclotron.png", "Lawrence 27-inch Cyclotron.png"],
    ["Ruska's First Prototype.png", "Ruska First Prototype.png"],
    ["Grote Reber's Backyard Dish.png", "Grote Reber Backyard Dish.png"],
    ["John Harrison's H4.png", "John Harrison H4.png"],
    ["Robert Hooke's Micrographia Microscope.png", "Robert Hooke Micrographia Microscope.png"],
    ["Galileo's Leather & Wood Tube (20x).png", "Galileo Leather Wood Tube 20x.png"],
];

renames.forEach(([oldName, newName]) => {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldName} -> ${newName}`);
    } else {
        console.log(`Not found: ${oldName}`);
    }
});
