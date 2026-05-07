const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');

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

const images = getImages(publicDir);
console.log(`Found ${images.length} images to convert.`);

async function processImages() {
  let convertedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const ext = path.extname(imagePath);
    const webpPath = imagePath.slice(0, -ext.length) + '.webp';

    try {
      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      fs.unlinkSync(imagePath);
      convertedCount++;
      
      if (convertedCount % 100 === 0) {
        console.log(`Converted ${convertedCount}/${images.length}...`);
      }
    } catch (err) {
      console.error(`Error converting ${imagePath}:`, err.message);
      errorCount++;
    }
  }

  console.log(`Finished! Converted: ${convertedCount}, Errors: ${errorCount}`);
}

processImages();
