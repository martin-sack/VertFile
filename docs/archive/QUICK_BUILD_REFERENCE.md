# 🚀 Quick Build Reference

## One-Command Builds

```bash
# Development
npm run dev

# Build for your current platform
npm run package

# Build for all platforms
npm run package:all

# Build for specific platform
npm run package:mac      # macOS (DMG + ZIP)
npm run package:win      # Windows (NSIS + Portable)
npm run package:linux    # Linux (AppImage + deb + rpm)
```

## Output Location
All builds → `release/` directory

## Platform Support

| OS | Formats | Architectures |
|----|---------|---------------|
| macOS | DMG, ZIP | x64, arm64 |
| Windows | NSIS, Portable | x64, ia32 |
| Linux | AppImage, deb, rpm | x64, arm64 |

## What Users Get

### macOS 🍎
- Homebrew install commands
- Universal binaries (Intel + Apple Silicon)

### Windows 🪟
- Direct download links
- Chocolatey commands
- 64-bit and 32-bit installers

### Linux 🐧
- apt/package manager commands
- Universal AppImage
- Debian and RPM packages

## Quick Test

```bash
# 1. Build
npm run build

# 2. Package
npm run package

# 3. Test the app in release/ folder
```

## File Sizes
- macOS: ~150-200 MB
- Windows: ~120-150 MB
- Linux: ~130-160 MB

## Requirements

### To Build macOS
- macOS computer (required)
- Xcode Command Line Tools

### To Build Windows
- Any OS (macOS, Windows, Linux)
- Wine for testing (optional)

### To Build Linux
- Any OS
- Best on Linux for compatibility

## Troubleshooting

### Build fails?
```bash
rm -rf node_modules release dist
npm install
npm run package
```

### Need help?
Check `BUILD_GUIDE.md` for detailed instructions

## Ready to Ship! ✅

Your app is configured to build for all platforms with:
- ✅ Automatic platform detection
- ✅ OS-specific instructions
- ✅ Professional installers
- ✅ Multi-architecture support
- ✅ Single codebase

Just run `npm run package:all` and distribute! 🎉
