const fs = require('fs');
const path = require('path');

const srcDirs = ['components', 'pages', 'data', 'lib', 'styles', 'content'];

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

let sourceFiles = [];
for (const dir of srcDirs) {
  sourceFiles = getSourceFiles(path.join(__dirname, '..', dir), sourceFiles);
}

console.log(`Found ${sourceFiles.length} source files to update.`);

let updatedFilesCount = 0;

for (const file of sourceFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace .jpg, .jpeg, .png with .webp
  // We should be careful to only replace them in paths (e.g. inside quotes or url())
  // A simple regex that matches .png or .jpg followed by quote, question mark, hash, or space
  content = content.replace(/\.(png|jpe?g)(['"\s\?#\)])/gi, '.webp$2');
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFilesCount++;
  }
}

console.log(`Updated ${updatedFilesCount} files.`);
