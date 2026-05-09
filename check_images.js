const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, 'public', 'images');
const publicBlogAuthorsDir = path.join(__dirname, 'public', 'blog', 'authors');
const imageRegex = /(?:["'\(])(\/?(?:images|blog\/authors)\/[^"'\s\)]+\.(?:webp|png|jpg|jpeg|svg|avif|gif))(?:["'\)])/g;

let totalFound = 0;
let totalMissing = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'public') continue;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (/\.(mdx|ts|tsx|css)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let match;
      while ((match = imageRegex.exec(content)) !== null) {
        let imagePath = match[1];
        if (imagePath.startsWith('/')) {
          imagePath = imagePath.substring(1); // remove leading slash
        }
        
        const absoluteImagePath = path.join(__dirname, 'public', imagePath);
        totalFound++;
        if (!fs.existsSync(absoluteImagePath)) {
          console.log(`Missing image: ${imagePath} in ${filePath}`);
          totalMissing++;
        }
      }
    }
  }
}

walk(__dirname);
console.log(`Total images checked: ${totalFound}`);
console.log(`Total missing images: ${totalMissing}`);
