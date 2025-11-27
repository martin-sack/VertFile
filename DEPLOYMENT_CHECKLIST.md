# 📋 Deployment Checklist

## Pre-Build Checklist

### Code Quality
- [ ] All features tested and working
- [ ] No console errors or warnings
- [ ] TypeScript builds without errors: `npm run build`
- [ ] App runs in dev mode: `npm run dev`

### Configuration
- [ ] Update version in `package.json`
- [ ] Update `appId` in `electron-builder.json` if needed
- [ ] Set correct `author` in `package.json`
- [ ] Update app description if needed

### Assets
- [ ] Icon files present in `build/` directory:
  - [ ] `icon.icns` (macOS, 512x512)
  - [ ] `icon.ico` (Windows, 256x256)
  - [ ] `icon-linux-512.png` (Linux, 512x512)
- [ ] App icon displays correctly in dev mode

### Dependencies
- [ ] All dependencies installed: `npm ci`
- [ ] No security vulnerabilities: `npm audit`
- [ ] Dependencies are production-ready (no dev-only packages in dependencies)

## Build Process

### Local Testing
- [ ] Test build for your platform: `npm run package`
- [ ] Install and test the built app
- [ ] Verify all features work in production build
- [ ] Check app size is reasonable

### Cross-Platform Builds

#### macOS Build (requires macOS)
- [ ] Run: `npm run package:mac`
- [ ] Test on Intel Mac (if available)
- [ ] Test on Apple Silicon Mac (if available)
- [ ] Verify DMG opens and installs correctly
- [ ] Check app is signed (if certificates configured)

#### Windows Build (can build from any OS)
- [ ] Run: `npm run package:win`
- [ ] Test 64-bit installer
- [ ] Test 32-bit installer (if needed)
- [ ] Test portable version
- [ ] Verify installer creates desktop shortcut
- [ ] Check Windows Defender doesn't flag it

#### Linux Build (can build from any OS)
- [ ] Run: `npm run package:linux`
- [ ] Test AppImage on Ubuntu/Debian
- [ ] Test .deb package installation
- [ ] Test .rpm package (if targeting Fedora/RHEL)
- [ ] Verify app appears in application menu

## Platform-Specific Testing

### macOS
- [ ] App opens without "unidentified developer" warning (if signed)
- [ ] App icon shows in Dock
- [ ] Menu bar works correctly
- [ ] File dialogs work
- [ ] Platform detection shows "🍎 macOS"
- [ ] Homebrew commands displayed correctly

### Windows
- [ ] App installs to Program Files
- [ ] Desktop shortcut created
- [ ] Start menu entry created
- [ ] App uninstalls cleanly
- [ ] Platform detection shows "🪟 Windows"
- [ ] Download links and Chocolatey commands shown

### Linux
- [ ] AppImage is executable
- [ ] App integrates with desktop environment
- [ ] File dialogs work
- [ ] Platform detection shows "🐧 Linux"
- [ ] apt/package manager commands shown

## Feature Testing (All Platforms)

### Core Features
- [ ] Image Compressor works
- [ ] Image to PDF works
- [ ] JSON ↔ CSV conversion works
- [ ] File selection dialog works
- [ ] Output folder selection works
- [ ] Conversion results display correctly
- [ ] "Open Converted File" button works

### UI/UX
- [ ] Header buttons all work:
  - [ ] Settings modal opens
  - [ ] History modal opens
  - [ ] Check Updates shows toast
  - [ ] Open Web opens correct URL
- [ ] Tool switching clears previous results
- [ ] Conversion history saves and displays
- [ ] Platform-specific install instructions show
- [ ] Dark theme displays correctly
- [ ] All gradients and colors look good

### History
- [ ] Conversions are saved to history
- [ ] History persists after app restart
- [ ] Can clear all history
- [ ] Can delete individual records
- [ ] Timestamps display correctly
- [ ] Can open output folders from history

## Distribution

### GitHub Release
- [ ] Create new release tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Upload build artifacts to GitHub Releases:
  - [ ] macOS DMG files
  - [ ] Windows installers
  - [ ] Linux AppImage/deb/rpm
- [ ] Write release notes
- [ ] Mark as latest release

### Website/Landing Page
- [ ] Update download links
- [ ] Update version number
- [ ] Update screenshots if UI changed
- [ ] Test download links work

### Documentation
- [ ] README.md is up to date
- [ ] BUILD_GUIDE.md reflects current setup
- [ ] Installation instructions are clear
- [ ] System requirements listed

## Post-Release

### Monitoring
- [ ] Monitor download counts
- [ ] Check for user-reported issues
- [ ] Monitor crash reports (if analytics configured)

### User Support
- [ ] Respond to GitHub issues
- [ ] Update FAQ if common questions arise
- [ ] Provide installation help if needed

### Updates
- [ ] Plan next version features
- [ ] Address any critical bugs quickly
- [ ] Consider auto-update mechanism

## Security

### Code Signing (Optional but Recommended)
- [ ] macOS: Sign with Apple Developer certificate
- [ ] Windows: Sign with code signing certificate
- [ ] Verify signatures after build

### Privacy
- [ ] No telemetry without user consent
- [ ] No data sent to external servers
- [ ] Local storage only (localStorage)
- [ ] Privacy policy if needed

## Performance

### App Performance
- [ ] App starts quickly (< 3 seconds)
- [ ] Conversions complete in reasonable time
- [ ] No memory leaks during extended use
- [ ] CPU usage is reasonable

### Build Size
- [ ] macOS: < 200 MB
- [ ] Windows: < 150 MB
- [ ] Linux: < 160 MB

## Final Checks

- [ ] Version number is correct everywhere
- [ ] All links work (web app, GitHub, etc.)
- [ ] No hardcoded development URLs
- [ ] No console.log statements in production
- [ ] Error handling is graceful
- [ ] User-facing messages are clear

## Ready to Ship! 🚀

Once all items are checked:
1. Build all platforms: `npm run package:all` (or individually)
2. Test each build thoroughly
3. Create GitHub Release
4. Update website
5. Announce release
6. Celebrate! 🎉

---

## Quick Commands Reference

```bash
# Development
npm run dev

# Build for testing
npm run build

# Package for current platform
npm run package

# Package for all platforms
npm run package:all

# Package for specific platform
npm run package:mac
npm run package:win
npm run package:linux

# Clean build
rm -rf node_modules release dist
npm install
npm run package
```

## Support Checklist

If users report issues:
- [ ] Ask for OS and version
- [ ] Ask for app version
- [ ] Check console for errors (if they can access)
- [ ] Verify system requirements met
- [ ] Test on same OS if possible
- [ ] Provide workaround or fix
- [ ] Update documentation if needed
