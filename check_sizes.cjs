const fs = require('fs');
const path = require('path');

const imgs = ['watt', 'faraday', 'tesla', 'gutenberg', 'lovelace', 'johnson', 'bernerslee', 'hopper', 'cursor_stylized'];
const dir = path.join(__dirname, 'public', 'images');

imgs.forEach(name => {
    const filePath = path.join(dir, name + '.png');
    const buf = fs.readFileSync(filePath);
    // PNG header: width at bytes 16-19, height at 20-23 (big endian)
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    console.log(`${name}: ${w}x${h}  ratio=${(w / h).toFixed(3)}`);
});
