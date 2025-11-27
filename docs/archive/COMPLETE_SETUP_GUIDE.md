# 🎯 Complete Setup Guide - File Converter Pro

## Overview

This guide walks you through the complete setup from scratch to a fully working desktop app.

---

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **macOS**, Windows, or Linux
- **Terminal** access

---

## 🚀 Step 1: Install Dependencies

```bash
cd file-converter-pro
npm install
```

**Expected output:**
```
added 554 packages in 20s
```

---

## 🔨 Step 2: Build Main Process

```bash
npm run build:main
npm run build:preload
```

**Expected output:**
```
> tsc -p tsconfig.main.json
> tsc -p tsconfig.preload.json
(No errors)
```

---

## ▶️ Step 3: Start the App

```bash
npm run dev
```

**Expected output:**
```
[0] VITE v5.4.21  ready in 499 ms
[0] ➜  Local:   http://localhost:5174/
[1] (Electron window opens)
```

**What you'll see:**
- Electron window with dark UI
- "File Converter Pro" header
- 7 conversion tools in sidebar
- ⚠️ Yellow warning banner (tools not installed yet)

---

## 🔧 Step 4: Install External Tools (Recommended)

### macOS
```bash
brew install pandoc
brew install --cask libreoffice
```

### Windows
1. Download Pandoc: https://pandoc.org/installing.html
2. Download LibreOffice: https://www.libreoffice.org/download/

### Linux (Ubuntu/Debian)
```bash
sudo apt install pandoc libreoffice
```

**Verify installation:**
```bash
./scripts/check-tools.sh
```

**Expected output:**
```
✅ Pandoc: pandoc 3.1.9
✅ LibreOffice: LibreOffice 7.6.4.1
```

---

## ✅ Step 5: Restart and Test

1. **Stop the app** (Ctrl+C in terminal)

2. **Restart:**
   ```bash
   npm run dev
   ```

3. **Verify:**
   - ✅ No yellow warning banner
   - ✅ All tools available

4. **Test a conversion:**
   - Click "Images → PDF"
   - Select some image files
   - Choose output folder
   - Click "Convert"
   - Check output folder for PDF

---

## 🎨 Step 6: Customize (Optional)

### Change App Name
Edit `package.json`:
```json
{
  "name": "your-app-name",
  "author": "Your Name"
}
```

Edit `electron-builder.json`:
```json
{
  "productName": "Your App Name"
}
```

### Change UI Text
Edit `src/renderer/components/Header.tsx`:
```tsx
<h1>Your Custom Title</h1>
<p>Your custom subtitle</p>
```

### Add App Icons
Place in `build/` folder:
- `icon.ico` (Windows)
- `icon.icns` (macOS)
- `icon.png` (Linux)

See `build/README.md` for icon generation tools.

---

## 📦 Step 7: Build Installers

```bash
npm run package
```

**Expected output:**
```
• building        target=macOS zip arch=x64
• packaging       platform=darwin arch=x64
• building block map  blockMapFile=dist/mac/File Converter Pro-1.0.0-mac.zip.blockmap
```

**Find installers in:**
```
release/
├── File-Converter-Pro-1.0.0.dmg       (macOS)
├── File-Converter-Pro-Setup-1.0.0.exe (Windows)
└── File-Converter-Pro-1.0.0.AppImage  (Linux)
```

---

## 🌐 Step 8: Distribute

### Option 1: GitHub Releases

1. **Create a release on GitHub**
2. **Upload installers** from `release/` folder
3. **Add download links** to your web app:

```html
<a href="https://github.com/you/file-converter-pro/releases/latest/download/File-Converter-Pro-Setup.exe">
  Download for Windows
</a>
```

### Option 2: Direct Download

Host installers on your server and link from web app.

---

## 🎯 Quick Reference

### Development Commands
```bash
npm run dev              # Start dev mode (Vite + Electron)
npm run dev:renderer     # Start Vite only
npm run dev:electron     # Start Electron only
npm run build            # Build everything
npm run package          # Create installers
```

### File Structure
```
src/
├── main/              # Electron main process
│   ├── main.ts        # App entry
│   ├── ipc.ts         # IPC handlers
│   └── conversions/   # Conversion logic
└── renderer/          # React UI
    ├── App.tsx        # Main component
    └── components/    # UI components
```

### Key Files to Edit
- `src/renderer/components/Header.tsx` - App title
- `src/renderer/data/tools.ts` - Tool definitions
- `package.json` - App metadata
- `electron-builder.json` - Build config

---

## 🐛 Troubleshooting

### Black screen in browser
- ✅ Fixed! App now works in both browser and Electron

### Electron doesn't open
- ✅ Fixed! Now uses wait-on to ensure Vite is ready

### "Tool not found" warnings
- Install Pandoc and LibreOffice (see Step 4)
- Restart the app

### Build errors
```bash
rm -rf dist node_modules
npm install
npm run build:main
npm run build:preload
```

### Port already in use
```bash
pkill -f "vite|electron"
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **COMPLETE_SETUP_GUIDE.md** | This file - full setup |
| **HOW_TO_RUN.md** | Quick start |
| **INSTALL_TOOLS.md** | External tools guide |
| **FIXED_AND_WORKING.md** | What was fixed |
| **TROUBLESHOOTING.md** | Detailed troubleshooting |
| **README.md** | Main documentation |

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Main process built (`npm run build:main`)
- [ ] App runs (`npm run dev`)
- [ ] Pandoc installed
- [ ] LibreOffice installed
- [ ] No warning banner
- [ ] Test conversion works
- [ ] Customized branding (optional)
- [ ] App icons added (optional)
- [ ] Installers built (`npm run package`)
- [ ] Distributed to users

---

## 🎉 You're Done!

Your File Converter Pro desktop app is now:
- ✅ Fully functional
- ✅ All tools installed
- ✅ Ready for development
- ✅ Ready to distribute

**Next steps:**
- Test all conversion types
- Customize the UI
- Add more features
- Build and distribute installers

**Need help?** Check the documentation files or review the code - it's well-commented!

---

**Happy converting!** 🚀
