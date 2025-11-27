# 🚀 Cross-Platform Build Guide

## Overview
This project is configured to build native applications for **Windows**, **macOS**, and **Linux** from a single codebase using Electron Builder.

## Prerequisites

### All Platforms
- Node.js 18+ and npm
- Git

### Platform-Specific Requirements

#### Building for macOS
- **macOS computer** (required for signing and notarization)
- Xcode Command Line Tools: `xcode-select --install`
- For Apple Silicon (M1/M2): Builds both x64 and arm64

#### Building for Windows
- Can build from any platform
- For best results on macOS/Linux: Install Wine for testing
  - macOS: `brew install wine-stable`
  - Linux: `sudo apt install wine64`

#### Building for Linux
- Can build from any platform
- Recommended: Build on Linux for best compatibility
- Supports: AppImage, deb, rpm formats

## Build Commands

### Development
```bash
npm run dev              # Start development server
```

### Production Builds

#### Build for Current Platform
```bash
npm run package          # Builds for your current OS
```

#### Build for Specific Platform
```bash
npm run package:mac      # macOS (DMG + ZIP)
npm run package:win      # Windows (NSIS installer + Portable)
npm run package:linux    # Linux (AppImage + deb + rpm)
```

#### Build for All Platforms (requires appropriate OS)
```bash
npm run package:all      # Builds for all platforms
```

## Output Files

All builds are output to the `release/` directory:

### macOS
- `File Converter Pro-1.0.0-mac-x64.dmg` (Intel)
- `File Converter Pro-1.0.0-mac-arm64.dmg` (Apple Silicon)
- `File Converter Pro-1.0.0-mac-x64.zip` (Intel)
- `File Converter Pro-1.0.0-mac-arm64.zip` (Apple Silicon)

### Windows
- `File Converter Pro-1.0.0-win-x64.exe` (64-bit installer)
- `File Converter Pro-1.0.0-win-ia32.exe` (32-bit installer)
- `File Converter Pro-1.0.0-win-x64.exe` (Portable)

### Linux
- `File Converter Pro-1.0.0-linux-x64.AppImage` (Universal)
- `File Converter Pro-1.0.0-linux-arm64.AppImage` (ARM)
- `File Converter Pro-1.0.0-linux-x64.deb` (Debian/Ubuntu)
- `File Converter Pro-1.0.0-linux-arm64.deb` (ARM Debian/Ubuntu)
- `File Converter Pro-1.0.0-linux-x64.rpm` (Fedora/RHEL)

## Platform-Specific Features

### Automatic Platform Detection
The app automatically detects the user's operating system and shows:
- 🍎 macOS: Homebrew installation commands
- 🪟 Windows: Direct download links + Chocolatey commands
- 🐧 Linux: apt/package manager commands

### Installation Instructions Per Platform

#### macOS (Homebrew)
```bash
brew install --cask libreoffice
brew install imagemagick
brew install pandoc
```

#### Windows (Chocolatey)
```bash
choco install libreoffice
choco install imagemagick
choco install pandoc
```

Or download installers directly from the app's links.

#### Linux (apt)
```bash
sudo apt install libreoffice
sudo apt install imagemagick
sudo apt install pandoc
```

## CI/CD Setup

### GitHub Actions Example
```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build-mac:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run package:mac
      - uses: actions/upload-artifact@v3
        with:
          name: mac-builds
          path: release/*.dmg

  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run package:win
      - uses: actions/upload-artifact@v3
        with:
          name: windows-builds
          path: release/*.exe

  build-linux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run package:linux
      - uses: actions/upload-artifact@v3
        with:
          name: linux-builds
          path: release/*.AppImage
```

## Testing Builds

### macOS
```bash
open "release/File Converter Pro-1.0.0-mac-x64.dmg"
```

### Windows (on macOS/Linux with Wine)
```bash
wine "release/File Converter Pro-1.0.0-win-x64.exe"
```

### Linux
```bash
chmod +x "release/File Converter Pro-1.0.0-linux-x64.AppImage"
./release/File\ Converter\ Pro-1.0.0-linux-x64.AppImage
```

## Code Signing

### macOS
1. Get Apple Developer certificate
2. Set environment variables:
   ```bash
   export CSC_LINK=/path/to/certificate.p12
   export CSC_KEY_PASSWORD=your_password
   export APPLE_ID=your@email.com
   export APPLE_ID_PASSWORD=app-specific-password
   ```

### Windows
1. Get code signing certificate
2. Set environment variables:
   ```bash
   export CSC_LINK=/path/to/certificate.pfx
   export CSC_KEY_PASSWORD=your_password
   ```

## Troubleshooting

### Build Fails on macOS
- Ensure Xcode Command Line Tools are installed
- Check that you have enough disk space (5GB+)
- Try cleaning: `rm -rf node_modules release dist && npm install`

### Build Fails on Windows
- Run as Administrator if permission errors occur
- Disable antivirus temporarily during build
- Ensure Windows SDK is installed

### Build Fails on Linux
- Install required dependencies:
  ```bash
  sudo apt install -y rpm
  ```
- Ensure you have fuse for AppImage:
  ```bash
  sudo apt install -y fuse libfuse2
  ```

## Distribution

### Direct Download
Upload builds to your website or GitHub Releases

### Auto-Updates
Configure `publish` in `electron-builder.json`:
```json
"publish": {
  "provider": "github",
  "owner": "your-username",
  "repo": "file-converter-pro"
}
```

### App Stores
- **Mac App Store**: Requires additional configuration
- **Microsoft Store**: Use `appx` target
- **Snap Store**: Use `snap` target

## Architecture Support

### Current Support
- **macOS**: x64 (Intel) + arm64 (Apple Silicon)
- **Windows**: x64 + ia32 (32-bit)
- **Linux**: x64 + arm64

### Universal Builds
macOS automatically creates universal binaries that work on both Intel and Apple Silicon.

## File Size Optimization

Current build sizes (approximate):
- macOS DMG: ~150-200 MB
- Windows Installer: ~120-150 MB
- Linux AppImage: ~130-160 MB

To reduce size:
1. Remove unused dependencies
2. Enable compression in electron-builder
3. Use `asar` packing (enabled by default)

## Support

For build issues:
1. Check the [Electron Builder docs](https://www.electron.build/)
2. Review platform-specific requirements
3. Check GitHub Issues

## Summary

✅ Single codebase for all platforms  
✅ Automatic platform detection  
✅ OS-specific installation instructions  
✅ Multiple distribution formats per platform  
✅ Support for Intel, Apple Silicon, and ARM  
✅ Ready for CI/CD deployment  

Build once, deploy everywhere! 🎉
