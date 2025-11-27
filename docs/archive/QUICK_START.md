# Quick Start Guide

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Mode
```bash
npm run dev
```

The app will open automatically. The React UI supports hot reload - changes appear instantly.

### 3. Test a Conversion
- Click a tool in the left sidebar (e.g., "Images → PDF")
- Select input files
- Choose output folder
- Click "Convert"

## 📦 Create Installers

```bash
# Build everything
npm run build

# Create installers for all platforms
npm run package

# Or platform-specific
npm run package:win    # Windows .exe
npm run package:mac    # macOS .dmg
npm run package:linux  # Linux .AppImage
```

Find installers in the `release/` folder.

## 🔧 Optional External Tools

For full functionality, install:

### Pandoc (PDF ↔ DOCX, DOCX → TXT)
```bash
# macOS
brew install pandoc

# Windows
# Download from https://pandoc.org/installing.html

# Linux
sudo apt install pandoc
```

### LibreOffice (Office → PDF)
```bash
# macOS
brew install --cask libreoffice

# Windows/Linux
# Download from https://www.libreoffice.org/download/
```

Check what's installed:
```bash
./scripts/check-tools.sh
```

## 📁 Project Structure

```
src/
├── main/           # Electron main process (Node.js)
│   ├── main.ts     # App entry point
│   ├── ipc.ts      # IPC handlers
│   └── conversions/ # Conversion logic
└── renderer/       # React UI
    ├── App.tsx     # Main component
    └── components/ # UI components
```

## 🎨 Customization

### Change App Name
Edit `package.json` and `electron-builder.json`:
```json
{
  "name": "your-app-name",
  "productName": "Your App Name"
}
```

### Add App Icons
Place in `build/` folder:
- `icon.ico` (Windows)
- `icon.icns` (macOS)
- `icon.png` (Linux)

See `build/README.md` for icon generation tools.

### Add New Conversion
1. Create `src/main/conversions/your-conversion.ts`
2. Add type to `src/main/types.ts`
3. Register in `src/main/conversions/index.ts`
4. Add UI tool in `src/renderer/data/tools.ts`

See `CONTRIBUTING.md` for detailed steps.

## 🐛 Common Issues

### "Pandoc not found" or "LibreOffice not found"
These are optional. The app shows a warning but still works for conversions that don't need them.

### Port 5173 already in use
Change port in `vite.config.ts`:
```typescript
server: {
  port: 5174, // or any available port
}
```

### Build errors
```bash
# Clean and reinstall
rm -rf dist node_modules
npm install
npm run build
```

### Electron won't start
Make sure main process compiled:
```bash
npm run build:main
```

## 📚 Documentation

- **README.md** - User documentation
- **SETUP.md** - Detailed setup instructions
- **PROJECT_OVERVIEW.md** - Architecture and design
- **CONTRIBUTING.md** - How to add features

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Run in dev mode
3. ✅ Test conversions
4. ⬜ Add your app icons
5. ⬜ Install external tools (optional)
6. ⬜ Build installers
7. ⬜ Test on target platforms
8. ⬜ Set up GitHub Releases
9. ⬜ Link from your web app

## 💡 Tips

- Main process changes require restart (Ctrl+C, then `npm run dev`)
- Renderer changes hot reload automatically
- Use Chrome DevTools (opens automatically) for UI debugging
- Check terminal for main process logs
- Test with various file types and sizes
- Verify output files open correctly

## 🆘 Need Help?

- Check `SETUP.md` for troubleshooting
- Review `PROJECT_OVERVIEW.md` for architecture
- See `CONTRIBUTING.md` for development guide
- Run `./scripts/check-tools.sh` to verify external tools

---

**Ready to go!** Run `npm run dev` and start converting files. 🎉
