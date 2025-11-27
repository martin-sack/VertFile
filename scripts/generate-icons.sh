#!/bin/bash

# Icon Generation Script for File Converter Pro
# Generates all platform-specific icons from source PNG

echo "🎨 Generating icons for File Converter Pro..."
echo ""

SOURCE_ICON="public/file-converter-icon.png"

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
  echo "❌ Error: Source icon not found at $SOURCE_ICON"
  exit 1
fi

echo "✅ Source icon found: $SOURCE_ICON"
echo ""

# Create icon.iconset directory for macOS
echo "📁 Creating icon.iconset directory..."
mkdir -p build/icon.iconset

# Generate all required sizes for macOS .icns
echo "🍎 Generating macOS icon sizes..."
sips -z 16 16     "$SOURCE_ICON" --out build/icon.iconset/icon_16x16.png
sips -z 32 32     "$SOURCE_ICON" --out build/icon.iconset/icon_16x16@2x.png
sips -z 32 32     "$SOURCE_ICON" --out build/icon.iconset/icon_32x32.png
sips -z 64 64     "$SOURCE_ICON" --out build/icon.iconset/icon_32x32@2x.png
sips -z 128 128   "$SOURCE_ICON" --out build/icon.iconset/icon_128x128.png
sips -z 256 256   "$SOURCE_ICON" --out build/icon.iconset/icon_128x128@2x.png
sips -z 256 256   "$SOURCE_ICON" --out build/icon.iconset/icon_256x256.png
sips -z 512 512   "$SOURCE_ICON" --out build/icon.iconset/icon_256x256@2x.png
sips -z 512 512   "$SOURCE_ICON" --out build/icon.iconset/icon_512x512.png
sips -z 1024 1024 "$SOURCE_ICON" --out build/icon.iconset/icon_512x512@2x.png

# Generate .icns file for macOS
echo "🍎 Creating macOS .icns file..."
iconutil -c icns build/icon.iconset -o build/icon.icns

# Generate Windows .ico file
echo "🪟 Generating Windows .ico file..."
if command -v magick &> /dev/null; then
  magick "$SOURCE_ICON" -resize 256x256 -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
elif command -v convert &> /dev/null; then
  convert "$SOURCE_ICON" -resize 256x256 -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico
else
  echo "⚠️  ImageMagick not found. Skipping Windows .ico generation."
  echo "   Install with: brew install imagemagick"
fi

# Generate Linux .png file
echo "🐧 Generating Linux icon..."
if command -v magick &> /dev/null; then
  magick "$SOURCE_ICON" -resize 512x512 build/icon-linux-512.png
elif command -v convert &> /dev/null; then
  convert "$SOURCE_ICON" -resize 512x512 build/icon-linux-512.png
else
  echo "⚠️  ImageMagick not found. Skipping Linux .png generation."
fi

# Generate standard icon.png
echo "📦 Generating standard icon.png..."
if command -v magick &> /dev/null; then
  magick "$SOURCE_ICON" -resize 256x256 build/icon.png
elif command -v convert &> /dev/null; then
  convert "$SOURCE_ICON" -resize 256x256 build/icon.png
fi

echo ""
echo "✅ Icon generation complete!"
echo ""
echo "Generated files:"
ls -lh build/icon.icns build/icon.ico build/icon-linux-512.png build/icon.png 2>/dev/null || true
echo ""
echo "🎉 All icons ready for packaging!"
