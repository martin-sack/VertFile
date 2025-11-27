# 🚀 Pre-Launch Testing Checklist

## ✅ Core Functionality

### Image Compressor
- [ ] File selection dialog opens
- [ ] Drag & drop works
- [ ] Quality slider adjusts (0-100)
- [ ] Converts JPG successfully
- [ ] Converts PNG successfully
- [ ] Converts WebP successfully
- [ ] Output file is smaller than input
- [ ] Output file opens correctly
- [ ] "Open Converted File" button works
- [ ] No crashes with large files (5MB+)

### Image to PDF
- [ ] Single image converts to PDF
- [ ] Multiple images convert to single PDF
- [ ] Page size selector works (A4/Letter/Legal)
- [ ] Orientation selector works (Portrait/Landscape)
- [ ] Output PDF opens correctly
- [ ] Images appear in correct order
- [ ] "Open Converted File" button works

### JSON to CSV
- [ ] Valid JSON converts successfully
- [ ] Array of objects converts correctly
- [ ] Nested objects are flattened
- [ ] Output CSV opens in Excel/Numbers
- [ ] Headers are correct
- [ ] "Open Converted File" button works

### CSV to JSON
- [ ] CSV with headers converts correctly
- [ ] CSV without headers converts correctly
- [ ] Output JSON is valid
- [ ] Can be parsed by JSON viewer
- [ ] "Open Converted File" button works

## ✅ Session Management

### Tool Switching
- [ ] Switching tools clears previous result
- [ ] Switching tools clears file selection
- [ ] Switching tools clears progress indicators
- [ ] No "fake success" from previous conversion
- [ ] Each tool feels like a fresh workspace
- [ ] History still shows previous conversions

### File Selection
- [ ] "Select Files" button works
- [ ] File dialog shows correct file types per tool
- [ ] Selected files display in UI
- [ ] Can clear selection
- [ ] Can select multiple files (for image-to-pdf)

### Output Folder
- [ ] "Select Output Folder" button works
- [ ] Selected folder displays in UI
- [ ] Folder path is valid
- [ ] Can change output folder

## ✅ History & Notifications

### History Panel
- [ ] Opens from header button
- [ ] Shows all previous conversions
- [ ] Displays tool name correctly
- [ ] Shows timestamp (e.g., "2 minutes ago")
- [ ] Shows success/failure status
- [ ] Shows input file names
- [ ] Shows output path
- [ ] "Clear All" button works
- [ ] Delete individual record works
- [ ] "Open Folder" button works (if implemented)
- [ ] History persists after app restart
- [ ] Maximum 100 items kept

### Check Updates
- [ ] Button shows toast message
- [ ] Message says "You're on the latest release!"
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Does NOT open GitHub
- [ ] Animation is smooth

### Open Web App
- [ ] Opens https://martinsfile-converter.vercel.app/
- [ ] Opens in default browser
- [ ] Does not crash app

### Settings Modal
- [ ] Opens from header button
- [ ] Shows app version
- [ ] Shows platform (macOS/Windows/Linux)
- [ ] Shows app name
- [ ] Close button works
- [ ] Click outside closes modal

## ✅ Dependencies Panel (Right Side)

### Platform Detection
- [ ] Shows correct OS icon (🍎/🪟/🐧)
- [ ] macOS shows only Homebrew commands
- [ ] Windows shows only download links + Chocolatey
- [ ] Linux shows only apt/package manager commands
- [ ] No instructions for other platforms shown

### JS Tools Section
- [ ] Shows "✅ JS Tools Active"
- [ ] Lists all 4 tools:
  - [ ] Image Compressor
  - [ ] Image to PDF
  - [ ] JSON ↔ CSV
- [ ] Says "100% offline • No installation required"

### Advanced Tools Section
- [ ] Shows "⚡ Advanced Tools (Coming Soon)"
- [ ] LibreOffice card shows:
  - [ ] Correct icon (📄)
  - [ ] "Will unlock: PDF → DOCX, DOCX → PDF, PPTX → PDF"
  - [ ] OS-specific install instructions
- [ ] ImageMagick card shows:
  - [ ] Correct icon (🖼️)
  - [ ] "Will unlock: High-quality PDF → Images"
  - [ ] OS-specific install instructions
- [ ] Pandoc card shows:
  - [ ] Correct icon (📝)
  - [ ] "Will unlock: Markdown ↔ DOCX"
  - [ ] OS-specific install instructions

## ✅ UI & Theming

### Overall Appearance
- [ ] Background gradient is dark (gray-950 via-indigo-950 to-slate-950)
- [ ] No panels are too bright
- [ ] Left, middle, right panels feel cohesive
- [ ] Text is readable on dark background
- [ ] Icons are visible and clear

### Convert Now Button
- [ ] Color is subtle (indigo-600/80 to purple-600/80)
- [ ] Hover effect works (increases opacity)
- [ ] Disabled state is clear (40% opacity)
- [ ] Shows "Converting..." during conversion
- [ ] Smooth animations
- [ ] Matches overall dark theme

### Header
- [ ] App icon shows correctly
- [ ] Title says "File Converter Pro"
- [ ] All 4 buttons visible:
  - [ ] Settings (⚙️)
  - [ ] Check Updates
  - [ ] History (🕐)
  - [ ] Open Web
- [ ] Buttons have hover effects
- [ ] Gradient line underneath header

### Tool Sidebar (Left)
- [ ] All 4 tools listed
- [ ] Icons display correctly
- [ ] Selected tool is highlighted
- [ ] Hover effects work
- [ ] Smooth transitions

### Workspace (Middle)
- [ ] Tool header shows icon and name
- [ ] File selection area is clear
- [ ] Output folder selector is clear
- [ ] Convert button is prominent
- [ ] Results display clearly
- [ ] Success shows green
- [ ] Errors show red

## ✅ Cross-Platform Compatibility

### Code Quality
- [ ] No hardcoded macOS paths (e.g., /Users/...)
- [ ] All paths use path.join()
- [ ] No platform-specific code in UI
- [ ] Electron APIs are safely guarded
- [ ] No crashes in dev mode

### Build System
- [ ] `npm run build` succeeds
- [ ] `npm run package` succeeds
- [ ] Icons are in build/ directory:
  - [ ] icon.icns (macOS)
  - [ ] icon.ico (Windows)
  - [ ] icon-linux-512.png (Linux)
- [ ] electron-builder.json is configured
- [ ] All platforms have targets defined

### Platform-Specific Builds
- [ ] macOS: DMG and ZIP targets
- [ ] Windows: NSIS and Portable targets
- [ ] Linux: AppImage, deb, rpm targets
- [ ] Architectures: x64, arm64 (where applicable)

## ✅ Error Handling

### Invalid Input
- [ ] Empty file selection shows error
- [ ] No output folder shows error
- [ ] Invalid file type shows error
- [ ] Corrupted file shows error
- [ ] Error messages are clear

### Edge Cases
- [ ] Very large files (50MB+) don't crash
- [ ] Very small files (1KB) work
- [ ] Files with special characters in name work
- [ ] Files with no extension work (or show error)
- [ ] Multiple rapid conversions don't break

### Recovery
- [ ] App doesn't crash on error
- [ ] Can retry after error
- [ ] Error is logged to history
- [ ] Can switch tools after error

## ✅ Performance

### Speed
- [ ] App starts in < 3 seconds
- [ ] Tool switching is instant
- [ ] File selection is responsive
- [ ] Small files convert in < 2 seconds
- [ ] Large files show progress (if implemented)

### Memory
- [ ] No memory leaks during extended use
- [ ] Memory usage is reasonable (< 500MB)
- [ ] Can convert 10+ files without issues

### CPU
- [ ] CPU usage is reasonable during conversion
- [ ] App remains responsive during conversion
- [ ] No UI freezing

## ✅ Final Checks

### Documentation
- [ ] README.md is clear and accurate
- [ ] BUILD_GUIDE.md has correct instructions
- [ ] TROUBLESHOOTING.md covers common issues
- [ ] All links work

### Version Info
- [ ] package.json version is correct
- [ ] App shows correct version in Settings
- [ ] Build artifacts have correct version in filename

### Icons & Branding
- [ ] App icon shows in title bar
- [ ] App icon shows in Dock/Taskbar
- [ ] App name is "File Converter Pro"
- [ ] No placeholder text or "TODO" comments

### Clean Build
- [ ] No console errors in production
- [ ] No console warnings in production
- [ ] No debug code left in
- [ ] No commented-out code blocks

## 🎯 Platform-Specific Testing

### macOS
- [ ] DMG opens and mounts
- [ ] Drag to Applications works
- [ ] App opens without security warning (if signed)
- [ ] Icon shows in Dock
- [ ] Menu bar works
- [ ] File dialogs are native
- [ ] Shows "🍎 macOS" in dependencies panel
- [ ] Homebrew commands shown

### Windows
- [ ] Installer runs
- [ ] Desktop shortcut created
- [ ] Start menu entry created
- [ ] App opens without SmartScreen warning (if signed)
- [ ] Icon shows in Taskbar
- [ ] File dialogs are native
- [ ] Shows "🪟 Windows" in dependencies panel
- [ ] Download links and Chocolatey commands shown
- [ ] Uninstaller works

### Linux
- [ ] AppImage is executable
- [ ] .deb installs on Ubuntu/Debian
- [ ] .rpm installs on Fedora/RHEL (if tested)
- [ ] App appears in application menu
- [ ] Icon shows in dock/panel
- [ ] File dialogs work
- [ ] Shows "🐧 Linux" in dependencies panel
- [ ] apt/package manager commands shown

## 📊 Test Results

### Summary
- Total Tests: ~150
- Passed: ___
- Failed: ___
- Skipped: ___

### Critical Issues
List any critical issues that must be fixed before launch:
1. 
2. 
3. 

### Nice-to-Have Issues
List any minor issues that can be fixed later:
1. 
2. 
3. 

## ✅ Ready to Launch?

- [ ] All critical tests pass
- [ ] No crashes or data loss
- [ ] UI looks professional
- [ ] Documentation is complete
- [ ] Builds work on all platforms
- [ ] Icons are correct
- [ ] Version numbers are correct

**If all boxes are checked, you're ready to ship! 🚀**
