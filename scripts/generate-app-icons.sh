#!/bin/bash

# Script to generate all required app icons from a single PNG source
# Requires: imagemagick (brew install imagemagick)

set -e

SOURCE_ICON="build/file-converter-icon.png"
BUILD_DIR="build"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Generating app icons for all platforms...${NC}"

# Create build directory if it doesn't exist
mkdir -p "$BUILD_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed!"
    echo "Install it with: brew install imagemagick"
    exit 1
fi

# Check if source icon exists
if [ ! -f "$SOURCE_ICON" ]; then
    echo "❌ Source icon not found: $SOURCE_ICON"
    exit 1
fi

echo "📁 Source: $SOURCE_ICON"
echo ""

# ============================================
# macOS Icon (.icns)
# ============================================
echo -e "${BLUE}🍎 Generating macOS icon (.icns)...${NC}"

# Create temporary iconset directory
ICONSET_DIR="$BUILD_DIR/icon.iconset"
mkdir -p "$ICONSET_DIR"

# Generate all required sizes for macOS
convert "$SOURCE_ICON" -resize 16x16     "$ICONSET_DIR/icon_16x16.png"
convert "$SOURCE_ICON" -resize 32x32     "$ICONSET_DIR/icon_16x16@2x.png"
convert "$SOURCE_ICON" -resize 32x32     "$ICONSET_DIR/icon_32x32.png"
convert "$SOURCE_ICON" -resize 64x64     "$ICONSET_DIR/icon_32x32@2x.png"
convert "$SOURCE_ICON" -resize 128x128   "$ICONSET_DIR/icon_128x128.png"
convert "$SOURCE_ICON" -resize 256x256   "$ICONSET_DIR/icon_128x128@2x.png"
convert "$SOURCE_ICON" -resize 256x256   "$ICONSET_DIR/icon_256x256.png"
convert "$SOURCE_ICON" -resize 512x512   "$ICONSET_DIR/icon_256x256@2x.png"
convert "$SOURCE_ICON" -resize 512x512   "$ICONSET_DIR/icon_512x512.png"
convert "$SOURCE_ICON" -resize 1024x1024 "$ICONSET_DIR/icon_512x512@2x.png"

# Convert to .icns (macOS only command)
if command -v iconutil &> /dev/null; then
    iconutil -c icns "$ICONSET_DIR" -o "$BUILD_DIR/icon.icns"
    echo -e "${GREEN}✅ Created: build/icon.icns${NC}"
else
    echo "⚠️  iconutil not found (macOS only). Skipping .icns creation."
    echo "   You can create it manually on macOS with: iconutil -c icns $ICONSET_DIR"
fi

# Clean up iconset directory
rm -rf "$ICONSET_DIR"

# ============================================
# Windows Icon (.ico)
# ============================================
echo -e "${BLUE}🪟 Generating Windows icon (.ico)...${NC}"

# Create multi-resolution .ico file
convert "$SOURCE_ICON" \
    \( -clone 0 -resize 16x16 \) \
    \( -clone 0 -resize 32x32 \) \
    \( -clone 0 -resize 48x48 \) \
    \( -clone 0 -resize 64x64 \) \
    \( -clone 0 -resize 128x128 \) \
    \( -clone 0 -resize 256x256 \) \
    -delete 0 \
    "$BUILD_DIR/icon.ico"

echo -e "${GREEN}✅ Created: build/icon.ico${NC}"

# ============================================
# Linux Icon (.png)
# ============================================
echo -e "${BLUE}🐧 Generating Linux icon (.png)...${NC}"

# Linux typically uses 512x512 PNG
convert "$SOURCE_ICON" -resize 512x512 "$BUILD_DIR/icon-linux-512.png"

echo -e "${GREEN}✅ Created: build/icon-linux-512.png${NC}"

# ============================================
# Additional sizes for various uses
# ============================================
echo -e "${BLUE}📦 Generating additional icon sizes...${NC}"

# Common sizes
convert "$SOURCE_ICON" -resize 16x16   "$BUILD_DIR/icon-16.png"
convert "$SOURCE_ICON" -resize 32x32   "$BUILD_DIR/icon-32.png"
convert "$SOURCE_ICON" -resize 48x48   "$BUILD_DIR/icon-48.png"
convert "$SOURCE_ICON" -resize 64x64   "$BUILD_DIR/icon-64.png"
convert "$SOURCE_ICON" -resize 128x128 "$BUILD_DIR/icon-128.png"
convert "$SOURCE_ICON" -resize 256x256 "$BUILD_DIR/icon-256.png"
convert "$SOURCE_ICON" -resize 512x512 "$BUILD_DIR/icon-512.png"

echo -e "${GREEN}✅ Created additional PNG sizes${NC}"

# ============================================
# Summary
# ============================================
echo ""
echo -e "${GREEN}🎉 All icons generated successfully!${NC}"
echo ""
echo "Generated files:"
echo "  📁 build/"
echo "     🍎 icon.icns (macOS)"
echo "     🪟 icon.ico (Windows)"
echo "     🐧 icon-linux-512.png (Linux)"
echo "     📦 icon-*.png (various sizes)"
echo ""
echo "These icons will be used when building your app with:"
echo "  npm run package:mac"
echo "  npm run package:win"
echo "  npm run package:linux"
