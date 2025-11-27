# Setup Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run in development**:
   ```bash
   npm run dev
   ```
   This will:
   - Start Vite dev server for the React UI (port 5173)
   - Compile TypeScript for main process
   - Launch Electron app

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Create installers**:
   ```bash
   npm run package
   ```

## External Tools (Optional but Recommended)

### Pandoc
Required for: PDF ↔ DOCX, DOCX → TXT

**macOS**:
```bash
brew install pandoc
```

**Windows**:
Download from https://pandoc.org/installing.html

**Linux**:
```bash
sudo apt install pandoc
```

### LibreOffice
Required for: DOCX/PPTX → PDF (most reliable)

**macOS**:
```bash
brew install --cask libreoffice
```

**Windows/Linux**:
Download from https://www.libreoffice.org/download/

## App Icons

Place your app icons in the `build/` folder:
- `icon.ico` - Windows (256x256 or multi-size)
- `icon.icns` - macOS (512x512@2x recommended)
- `icon.png` - Linux (512x512 PNG)

You can generate these from a single PNG using tools like:
- https://www.electronforge.io/guides/create-and-add-icons
- https://iconverticons.com/online/

## Troubleshooting

### "Pandoc not found" or "LibreOffice not found"
The app will show a warning banner if these tools aren't installed. Some conversions will fail without them.

### Development mode not loading
Make sure port 5173 is available. Check if Vite started successfully in the console.

### Build errors
- Clear `dist/` and `node_modules/`, then reinstall: `rm -rf dist node_modules && npm install`
- Make sure TypeScript compiles without errors: `npm run build:main`

### Packaging errors
- Ensure `build/` folder has icon files (or remove icon references from electron-builder.json)
- Check that `dist/` folder exists and has both `main/` and `renderer/` subdirectories

## Development Tips

- Hot reload works for the renderer (React UI)
- Main process changes require restarting Electron (Ctrl+C and `npm run dev` again)
- Use Chrome DevTools (opened automatically in dev mode) for debugging renderer
- Use `console.log` in main process - output appears in terminal

## Next Steps

1. Test all conversions with sample files
2. Add your app icons to `build/`
3. Update `package.json` with your author info
4. Build and test installers on target platforms
5. Set up GitHub Releases for distribution
