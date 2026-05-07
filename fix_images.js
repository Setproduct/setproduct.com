const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const hashRegex = /([a-f0-9]{24}_)([^"'\s\)]+\.(?:webp|png|jpg|jpeg|svg|avif))/g;

let totalReplaced = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (/\.(mdx|ts|tsx|css)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let changed = false;

      content = content.replace(hashRegex, (match, hash, filename) => {
        const imagePathWithoutHash = path.join(publicImagesDir, filename);
        if (fs.existsSync(imagePathWithoutHash)) {
          console.log(`Replacing ${match} with ${filename} in ${filePath}`);
          changed = true;
          totalReplaced++;
          return filename;
        } else {
          console.log(`File without hash not found: ${filename} (original: ${match})`);
          return match;
        }
      });

      if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
}

walk(__dirname);
console.log(`Total replacements: ${totalReplaced}`);
