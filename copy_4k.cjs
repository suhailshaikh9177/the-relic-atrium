const fs = require('fs');
const path = require('path');

const src = 'C:/Users/suhai/OneDrive/Desktop/Project/artifacts reference/previews/4k';
const dst = 'public/images/4k';

fs.mkdirSync(dst, { recursive: true });

const files = fs.readdirSync(src);
files.forEach(f => {
    fs.copyFileSync(path.join(src, f), path.join(dst, f));
    console.log('Copied:', f);
});

console.log(`Done — ${files.length} files copied.`);
