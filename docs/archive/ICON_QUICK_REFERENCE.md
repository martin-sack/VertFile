# 🎨 Icon Quick Reference

## Your Icon Setup

✅ **Source Icon:** `public/file-converter-icon.png` (1024x1024)  
✅ **Generated Icons:** `build/` directory  
✅ **Auto-configured:** Works with all platforms  

## Quick Commands

### Regenerate Icons (if you update the source)
```bash
npm run icons
```

### Build with Icons
```bash
npm run package        # Current platform
npm run package:mac    # macOS with icon.icns
npm run package:win    # Windows with icon.ico
npm run package:linux  # Linux with icon-linux-512.png
```

## Generated Files

```
build/
├── icon.icns              🍎 macOS (multi-resolution)
├── icon.ico               🪟 Windows (multi-resolution)
└── icon-linux-512.png     🐧 Linux (512x512)
```

## What Users See

| Platform | Where Icon Appears |
|----------|-------------------|
| macOS 🍎 | Dock, Finder, Launchpad, Menu Bar |
| Windows 🪟 | Desktop, Taskbar, Start Menu, Explorer |
| Linux 🐧 | App Menu, Dock/Panel, File Manager |

## Update Your Icon

1. Replace `public/file-converter-icon.png` with new icon (keep 1024x1024)
2. Run: `npm run icons`
3. Build: `npm run package`
4. Done! ✅

## Requirements

- ImageMagick: `brew install imagemagick` ✅ (already installed)
- macOS for .icns: `iconutil` ✅ (built-in on macOS)

## That's It!

Your icon is ready for all platforms. Just build and ship! 🚀
