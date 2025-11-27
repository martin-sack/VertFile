# App Icons

This directory contains all the app icons for different platforms.

## Files

### Platform-Specific Icons
- **icon.icns** - macOS app icon (contains multiple resolutions)
- **icon.ico** - Windows app icon (contains multiple resolutions)
- **icon-linux-512.png** - Linux app icon (512x512)

### Additional Sizes
- icon-16.png (16x16)
- icon-32.png (32x32)
- icon-48.png (48x48)
- icon-64.png (64x64)
- icon-128.png (128x128)
- icon-256.png (256x256)
- icon-512.png (512x512)

## Source

All icons are generated from: `public/file-converter-icon.png`

## Regenerating Icons

If you update the source icon, regenerate all platform icons with:

```bash
npm run icons
```

Or manually:

```bash
bash scripts/generate-app-icons.sh
```

## Requirements

- ImageMagick: `brew install imagemagick`
- macOS (for .icns generation): `iconutil` command

## Icon Specifications

### macOS (.icns)
- Contains: 16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024
- Retina versions included (@2x)
- Format: Apple Icon Image format

### Windows (.ico)
- Contains: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- Format: Windows Icon format
- Multi-resolution for different contexts

### Linux (.png)
- Size: 512x512
- Format: PNG with transparency
- Used by most Linux desktop environments

## Usage

These icons are automatically used by electron-builder when packaging:

```bash
npm run package:mac    # Uses icon.icns
npm run package:win    # Uses icon.ico
npm run package:linux  # Uses icon-linux-512.png
```

## Notes

- Keep the source icon at least 1024x1024 for best quality
- Use PNG format with transparency
- Ensure the icon looks good at small sizes (16x16, 32x32)
- Test the icon on each platform after building
