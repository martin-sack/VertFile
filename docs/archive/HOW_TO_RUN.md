# 🚀 How to Run File Converter Pro

## ✅ Everything is Fixed and Working!

## Quick Start (One Command)

```bash
npm run dev
```

That's it! The Electron window will open automatically.

## What Happens

1. **Vite starts** on http://localhost:5174/
2. **Main process builds** (TypeScript compilation)
3. **Preload script builds** (TypeScript compilation)
4. **wait-on waits** for Vite to be ready
5. **Electron launches** and loads the UI

## Expected Output

```
[0] VITE v5.4.21  ready in 499 ms
[0] ➜  Local:   http://localhost:5174/
[1] > build:main
[1] > build:preload
[1] (Electron window opens)
```

## What You'll See

### Electron Window
- Dark background with neon accents
- "File Converter Pro" header
- Left sidebar with 7 conversion tools
- Right panel for conversions
- DevTools open automatically

### Browser (Optional)
You can also test the UI at http://localhost:5174/
- Same UI as Electron
- File operations won't work (Electron only)
- Perfect for UI development

## Troubleshooting

### Port Already in Use
```bash
# Kill existing processes
pkill -f "vite|electron"

# Or use different port in vite.config.ts
```

### Electron Doesn't Open
```bash
# Check if it's running
ps aux | grep "electron \."

# Check for errors in terminal
# Look for red error messages
```

### Black Screen
This is now fixed! But if you see it:
1. Check browser console at http://localhost:5174/
2. Look for JavaScript errors
3. Check Electron DevTools console

### Build Errors
```bash
# Clean rebuild
rm -rf dist node_modules
npm install
npm run build:main
npm run build:preload
npm run dev
```

## Development Tips

### Hot Reload
- **Renderer changes**: Auto-reload (Vite HMR)
- **Main process changes**: Restart `npm run dev`

### Debugging
- **UI**: Use Electron DevTools (opens automatically)
- **Main process**: Check terminal output
- **Browser mode**: Open http://localhost:5174/ in Chrome

### Testing Conversions
Install external tools:
```bash
brew install pandoc
brew install --cask libreoffice
```

## Build for Production

```bash
# Build everything
npm run build

# Create installers
npm run package
```

## Files to Customize

- `src/renderer/components/Header.tsx` - App title
- `src/renderer/data/tools.ts` - Tool definitions
- `tailwind.config.js` - Colors and theme
- `package.json` - App name and author

## Need Help?

- **FIXED_AND_WORKING.md** - What was fixed
- **TROUBLESHOOTING.md** - Detailed troubleshooting
- **CURRENT_STATUS.md** - Project status

---

**Ready to go!** Run `npm run dev` and start developing! 🎉
