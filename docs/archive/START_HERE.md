# 🎯 START HERE - File Converter Pro

## What Is This?

A **professional desktop application** for file format conversion, built with Electron + React + TypeScript. This is a separate "Pro" version of your web-based file converter, with native system access and no browser limitations.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build main process
npm run build:main && npm run build:preload

# 3. Start development (Option A - Simple script)
./dev-start.sh

# OR Option B - Manual (better for debugging)
# Terminal 1:
npm run dev:renderer

# Terminal 2 (wait for Vite to start):
npm run dev:electron

# 4. Build installers
npm run package
```

The Electron app will launch with the React UI loaded from Vite dev server.

---

## 📖 Documentation Guide

**New to the project?** Read in this order:

1. **START_HERE.md** ← You are here
2. **QUICK_START.md** - Fast setup and common tasks
3. **GET_STARTED.md** - Customization and next steps
4. **PROJECT_OVERVIEW.md** - Architecture deep dive

**Need help?**
- **SETUP.md** - Detailed setup and troubleshooting
- **CONTRIBUTING.md** - How to add features
- **FEATURES.md** - Complete feature list

**For users:**
- **README.md** - User-facing documentation

---

## 🎨 What You Get

### ✅ 7 Conversion Types
- PDF ↔ DOCX
- DOCX/PPTX → PDF
- PDF → Images/TXT
- Images → PDF
- DOCX → TXT

### ✅ Batch Processing
- Convert entire folders
- Progress tracking
- Parallel processing

### ✅ Beautiful UI
- Dark neon theme
- Native file dialogs
- Real-time progress

### ✅ Native Installers
- Windows (.exe)
- macOS (.dmg)
- Linux (.AppImage)

### ✅ Production Ready
- TypeScript throughout
- Error handling
- Input validation
- Comprehensive docs

---

## 🎯 Your First 5 Minutes

### 1. Install Dependencies (1 min)
```bash
npm install
```

### 2. Run the App (30 sec)
```bash
npm run dev
```

The app launches automatically. Try converting a file!

### 3. Explore the Code (2 min)
- **UI**: Open `src/renderer/App.tsx`
- **Conversions**: Check `src/main/conversions/`
- **Tools**: See `src/renderer/data/tools.ts`

### 4. Make a Change (1 min)
Edit `src/renderer/components/Header.tsx` and save - watch it hot reload!

### 5. Build an Installer (30 sec)
```bash
npm run package
```

Find it in `release/` folder.

---

## 🔧 Optional External Tools

For full functionality, install:

**Pandoc** (PDF ↔ DOCX): `brew install pandoc`  
**LibreOffice** (Office → PDF): `brew install --cask libreoffice`

Check what's installed: `./scripts/check-tools.sh`

---

## 📦 Build & Distribute

```bash
npm run package        # All platforms
npm run package:win    # Windows only
npm run package:mac    # macOS only
npm run package:linux  # Linux only
```

Upload installers to GitHub Releases, then link from your web app.

---

## 🎊 You're Ready!

Run `npm run dev` to start developing!

**Questions?** Check the documentation files - they cover everything.

---

**Built with ❤️ using Electron, React, and TypeScript**
