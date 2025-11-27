# File Converter Pro 🚀

A professional desktop file converter with support for images, documents, and data formats. Built with Electron, React, and TypeScript.

## ✨ Features

### Ready-to-Use Tools (No Installation Required)
- **Image Compressor** - Reduce image file sizes
- **Image to PDF** - Convert images to PDF documents
- **JSON ↔ CSV** - Convert between JSON and CSV formats

### Coming Soon (Requires External Tools)
- PDF ↔ DOCX conversion (requires LibreOffice)
- PDF → Images (requires ImageMagick)
- Advanced document conversions (requires Pandoc)

### Key Features
- ✅ 100% offline - no internet required
- ✅ Cross-platform - Windows, macOS, Linux
- ✅ Conversion history tracking
- ✅ Dark theme with modern UI
- ✅ Batch processing support
- ✅ OS-specific installation instructions

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building

```bash
# Build for current platform
npm run package

# Build for all platforms
npm run package:all

# Build for specific platform
npm run package:mac      # macOS
npm run package:win      # Windows
npm run package:linux    # Linux
```

### Regenerate Icons
```bash
npm run icons
```

## 📦 Downloads

Built applications will be in the `release/` directory:

- **macOS**: `.dmg` and `.zip` files
- **Windows**: `.exe` installers and portable versions
- **Linux**: `.AppImage`, `.deb`, and `.rpm` packages

## 🛠️ Tech Stack

- **Framework**: Electron 28
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite + electron-builder
- **Conversion Libraries**:
  - sharp (image processing)
  - jspdf (PDF generation)
  - papaparse (CSV parsing)
  - pdf-lib (PDF manipulation)

## 📋 System Requirements

### Development
- Node.js 18+
- npm or yarn
- ImageMagick (for icon generation): `brew install imagemagick`

### Optional External Tools (for advanced features)
- **LibreOffice**: Document conversions
- **ImageMagick**: PDF to images
- **Pandoc**: Advanced text conversions

## 🏗️ Project Structure

```
file-converter-pro/
├── src/
│   ├── main/              # Electron main process
│   │   ├── conversions/   # Conversion engines
│   │   ├── main.ts        # Main entry point
│   │   └── preload.ts     # Preload script
│   ├── renderer/          # React UI
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   └── shared/            # Shared code
├── public/                # Static assets
├── build/                 # Build resources (icons)
├── scripts/               # Build scripts
└── release/               # Built applications
```

## 🎨 Features in Detail

### Conversion History
- Tracks all conversions with timestamps
- Shows success/failure status
- Stores up to 100 recent conversions
- Persists across app restarts
- Can clear history or delete individual records

### Platform Detection
- Automatically detects user's OS
- Shows only relevant installation instructions
- Displays appropriate package manager commands

### Smart UI
- Tool switching clears previous results
- "Check Updates" shows toast notification
- "Open Web" links to web version
- Settings modal with app info
- Responsive 3-column layout

## 🔧 Development

### Available Scripts

```bash
npm run dev              # Start development
npm run build            # Build for production
npm run icons            # Regenerate app icons
npm run package          # Package for current OS
npm run package:all      # Package for all OS
```

### Testing Conversions

1. Select a tool from the left sidebar
2. Click "Select Files" or drag & drop
3. Choose output folder
4. Click "Convert Now"
5. View results and open converted files

## 📚 Documentation

- **BUILD_GUIDE.md** - Comprehensive build instructions
- **DEPLOYMENT_CHECKLIST.md** - Pre-release checklist
- **CROSS_PLATFORM_READY.md** - Cross-platform setup
- **TROUBLESHOOTING.md** - Common issues and solutions
- **CONTRIBUTING.md** - Contribution guidelines

## 🐛 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
rm -rf node_modules release dist
npm install
npm run build
npm run package
```

### Icon Issues
```bash
# Regenerate icons
npm run icons
```

### Platform-Specific Issues
See **TROUBLESHOOTING.md** for detailed solutions.

## 🤝 Contributing

Contributions are welcome! Please read **CONTRIBUTING.md** for guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 🌐 Links

- **Web Version**: https://martinsfile-converter.vercel.app/
- **GitHub**: [Your Repository URL]
- **Issues**: [Your Issues URL]

## 🎯 Roadmap

- [ ] Add more JS-only conversion tools
- [ ] Implement drag & drop for files
- [ ] Add batch conversion UI
- [ ] Auto-update functionality
- [ ] Cloud sync for history (optional)
- [ ] Plugin system for custom converters

## 💡 Tips

- Use the history panel to track past conversions
- Switch tools to start a fresh conversion session
- Check the dependencies panel for installation help
- All JS tools work offline with no setup

## 🙏 Acknowledgments

Built with:
- Electron
- React
- TypeScript
- Tailwind CSS
- Sharp, jsPDF, PapaParse, and other amazing libraries

---

**Made with ❤️ for seamless file conversions**
