import sharp from 'sharp';
import path from 'path';

async function generateThumbnail() {
  const svgBuffer = Buffer.from(`
    <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0D9488;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#grad)" />
      
      <!-- Dice Group -->
      <g transform="translate(200, 100)">
        <!-- First Row -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" />
          <circle cx="40" cy="40" r="8" fill="#10B981" />
        </g>
        <g transform="translate(100, 0)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" />
          <circle cx="20" cy="20" r="8" fill="#10B981" />
          <circle cx="60" cy="60" r="8" fill="#10B981" />
        </g>
        <g transform="translate(200, 0)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" />
          <circle cx="20" cy="20" r="8" fill="#10B981" />
          <circle cx="40" cy="40" r="8" fill="#10B981" />
          <circle cx="60" cy="60" r="8" fill="#10B981" />
        </g>

        <!-- Second Row -->
        <g transform="translate(50, 100)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" />
          <circle cx="20" cy="20" r="8" fill="#10B981" />
          <circle cx="60" cy="20" r="8" fill="#10B981" />
          <circle cx="20" cy="60" r="8" fill="#10B981" />
          <circle cx="60" cy="60" r="8" fill="#10B981" />
        </g>
        <g transform="translate(150, 100)">
          <rect x="0" y="0" width="80" height="80" rx="10" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))" />
          <circle cx="20" cy="20" r="8" fill="#10B981" />
          <circle cx="60" cy="20" r="8" fill="#10B981" />
          <circle cx="40" cy="40" r="8" fill="#10B981" />
          <circle cx="20" cy="60" r="8" fill="#10B981" />
          <circle cx="60" cy="60" r="8" fill="#10B981" />
        </g>
      </g>

      <!-- 5000 Text -->
      <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="72" font-weight="bold" fill="white" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))">
        5000
      </text>
    </svg>
  `);

  await sharp(svgBuffer)
    .resize(800, 450)
    .png()
    .toFile(path.join(process.cwd(), 'public', '5000-thumbnail.png'));
}

generateThumbnail().catch(console.error);
