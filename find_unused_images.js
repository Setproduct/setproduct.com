const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public/images');
const projectDir = __dirname;

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getAllFiles(path.join(dir, file), fileList);
    } else {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allImages = getAllFiles(imagesDir);

const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.mdx', '.css', '.scss', '.html'];
function getCodeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        // Exclude public/images but include other public files
        if (fullPath !== imagesDir) {
          getCodeFiles(fullPath, fileList);
        }
      }
    } else {
      if (codeExtensions.includes(path.extname(file))) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const codeFiles = getCodeFiles(projectDir);

let allCodeContent = '';
for (const file of codeFiles) {
  allCodeContent += fs.readFileSync(file, 'utf8') + '\n';
}

const unusedImages = [];
for (const imagePath of allImages) {
  const basename = path.basename(imagePath);
  const encodedBasename = encodeURIComponent(basename);
  
  if (!allCodeContent.includes(basename) && !allCodeContent.includes(encodedBasename)) {
    unusedImages.push(imagePath);
  }
}

console.log(`Unused images count: ${unusedImages.length}`);
fs.writeFileSync('unused_images_report.txt', unusedImages.join('\n'));
