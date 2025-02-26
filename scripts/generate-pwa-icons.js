const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const iconPath = path.join(__dirname, '..', 'public', 'icons')

// Ensure the icons directory exists
if (!fs.existsSync(iconPath)) {
  fs.mkdirSync(iconPath, { recursive: true })
}

async function generateIcons() {
  try {
    // Using a blue clock icon as base
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0284c7">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42V7z"/>
      </svg>
    `

    // Generate icons for each size
    for (const size of sizes) {
      await sharp(Buffer.from(svg))
        .resize(size, size)
        .toFile(path.join(iconPath, `icon-${size}x${size}.png`))
    }

    console.log('PWA icons generated successfully!')
  } catch (error) {
    console.error('Error generating icons:', error)
  }
}

generateIcons()