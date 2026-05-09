const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '../public');
const srcDirs = ['components', 'pages', 'data', 'lib', 'styles', 'content'];

// Get all images
const getImages = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
};

// Get all source files
const getSourceFiles = (dir, fileList = []) => {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getSourceFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx|css|mdx|md)$/i.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
};

console.log('Gathering files...');
const images = getImages(publicDir);
console.log(`Found ${images.length} images.`);

let sourceFiles = [];
for (const dir of srcDirs) {
  sourceFiles = getSourceFiles(path.join(__dirname, '..', dir), sourceFiles);
}
console.log(`Found ${sourceFiles.length} source files.`);

console.log('Reading source files content...');
let allSourceContent = '';
for (const file of sourceFiles) {
  allSourceContent += fs.readFileSync(file, 'utf8') + '\n';
}

console.log('Finding unused images...');
let unusedCount = 0;
for (const image of images) {
  const fileName = path.basename(image);
  // Also check URL encoded filename just in case
  const encodedFileName = encodeURIComponent(fileName);
  
  if (!allSourceContent.includes(fileName) && !allSourceContent.includes(encodedFileName)) {
    // console.log(`Unused: ${image}`);
    fs.unlinkSync(image);
    unusedCount++;
  }
}

console.log(`Deleted ${unusedCount} unused images.`);
