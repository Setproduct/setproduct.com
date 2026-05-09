const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function resizeImages() {
  const images = [
    'public/blog/covers/vercel-easthetic-guide-cover-2.webp',
    'public/blog/covers/buy-claude-with-solana-virtual-card-cover.webp'
  ];
  
  for (const imgPath of images) {
    const filename = path.basename(imgPath);
    const destPath = path.join('public/blog/covers/thumbs', filename);
    
    console.log(`Resizing ${filename}...`);
    await sharp(imgPath)
      .resize(400)
      .webp()
      .toFile(destPath);
    console.log(`Done! Saved to ${destPath}`);
  }
}

resizeImages().catch(console.error);
