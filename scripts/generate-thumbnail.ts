import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function generateThumbnail() {
  const svgBuffer = Buffer.from(`
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#4F46E5" />
      <g transform="translate(300, 125) scale(2)">
        <rect x="40" y="40" width="120" height="120" rx="10" fill="white" />
        <circle cx="70" cy="70" r="10" fill="#4F46E5" />
        <circle cx="130" cy="70" r="10" fill="#4F46E5" />
        <circle cx="70" cy="130" r="10" fill="#4F46E5" />
        <circle cx="130" cy="130" r="10" fill="#4F46E5" />
        <circle cx="100" cy="100" r="10" fill="#4F46E5" />
      </g>
    </svg>
  `);

  await sharp(svgBuffer)
    .resize(800, 450)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'dice-thumbnail.png'));
}

generateThumbnail().catch(console.error);
