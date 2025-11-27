# File Converter Pro - Project Overview

## What This Is

A professional desktop application for file format conversion, built as a separate "Pro" version of your web-based file converter. This desktop app leverages native system tools and Node.js libraries to handle conversions that aren't possible in a browser sandbox.

## Key Differences from Web Version

| Feature | Web App | Desktop Pro |
|---------|---------|-------------|
| **Runtime** | Browser (Next.js) | Electron (Node.js) |
| **Limitations** | Browser sandbox | Full system access |
| **File Size** | Limited by browser | No practical limit |
| **Tools** | Browser-safe libraries only | CLI tools (pandoc, LibreOffice) |
| **Formats** | 11 basic tools | Expandable with system tools |
| **Batch Processing** | Limited | Full folder-to-folder |
| **Distribution** | Web hosting | Native installers |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Electron App                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐         ┌──────────────────┐     │
│  │  Renderer Process │   IPC   │   Main Process   │     │
│  │                   │◄───────►│                  │     │
│  │  React + Vite     │         │  Node.js APIs    │     │
│  │  Tailwind CSS     │         │  File System     │     │
│  │  Dark Neon UI     │         │  Child Processes │     │
│  └──────────────────┘         └──────────────────┘     │
│                                         │                │
│                                         ▼                │
│                              ┌──────────────────┐       │
│                              │   Conversions    │       │
│                              │                  │       │
│                              │  • PDF ↔ DOCX   │       │
│                              │  • Office → PDF  │       │
│                              │  • PDF → Images  │       │
│                              │  • Images → PDF  │       │
│                              │  • Text Extract  │       │
│                              └──────────────────┘       │
│                                         │                │
└─────────────────────────────────────────┼────────────────┘
                                          ▼
                              ┌──────────────────┐
                              │  External Tools  │
                              │                  │
                              │  • Pandoc        │
                              │  • LibreOffice   │
                              │  • ImageMagick   │
                              └──────────────────┘
```

## Tech Stack

### Core
- **Electron 28** - Desktop app framework
- **TypeScript** - Type-safe development
- **React 18** - UI framework
- **Vite** - Fast build tool

### UI
- **Tailwind CSS** - Utility-first styling
- **Dark neon theme** - Matching web aesthetic
- **Responsive layout** - Optimized for desktop

### Conversion Libraries
- **pdf-lib** - PDF manipulation
- **pdf-parse** - PDF text extraction
- **sharp** - Image processing
- **pandoc** (external) - Document conversion
- **LibreOffice** (external) - Office formats

### Build & Package
- **electron-builder** - Create installers
- **concurrently** - Run dev processes
- **cross-env** - Cross-platform env vars

## Project Structure

```
file-converter-pro/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── main.ts              # App entry, window management
│   │   ├── preload.ts           # Secure IPC bridge
│   │   ├── ipc.ts               # IPC handlers
│   │   ├── types.ts             # Shared TypeScript types
│   │   └── conversions/         # Conversion logic
│   │       ├── index.ts         # Conversion router
│   │       ├── utils.ts         # Helper functions
│   │       ├── pdf-to-docx.ts   # PDF → DOCX
│   │       ├── docx-to-pdf.ts   # DOCX → PDF
│   │       ├── pptx-to-pdf.ts   # PPTX → PDF
│   │       ├── pdf-to-images.ts # PDF → Images
│   │       ├── images-to-pdf.ts # Images → PDF
│   │       ├── pdf-to-txt.ts    # PDF → TXT
│   │       └── docx-to-txt.ts   # DOCX → TXT
│   │
│   └── renderer/                # React UI
│       ├── App.tsx              # Main app component
│       ├── main.tsx             # React entry point
│       ├── index.css            # Global styles
│       ├── types.ts             # UI types
│       ├── global.d.ts          # TypeScript declarations
│       ├── components/          # React components
│       │   ├── Header.tsx       # App header with branding
│       │   ├── ToolGrid.tsx     # Left sidebar tool list
│       │   ├── ToolPanel.tsx    # Single conversion panel
│       │   ├── BatchPanel.tsx   # Batch conversion UI
│       │   └── ToolWarning.tsx  # Missing tools warning
│       └── data/
│           └── tools.ts         # Tool definitions
│
├── build/                       # App icons (you provide)
│   ├── icon.ico                 # Windows
│   ├── icon.icns                # macOS
│   └── icon.png                 # Linux
│
├── dist/                        # Build output (generated)
│   ├── main/                    # Compiled main process
│   └── renderer/                # Built React app
│
├── release/                     # Installers (generated)
│   ├── *.exe                    # Windows installer
│   ├── *.dmg                    # macOS disk image
│   └── *.AppImage               # Linux portable
│
├── scripts/                     # Helper scripts
│   ├── dev.sh                   # Development startup
│   └── check-tools.sh           # Check external tools
│
├── package.json                 # Dependencies & scripts
├── electron-builder.json        # Packaging config
├── tsconfig.json                # TypeScript config (renderer)
├── tsconfig.main.json           # TypeScript config (main)
├── tsconfig.preload.json        # TypeScript config (preload)
├── vite.config.ts               # Vite config
├── tailwind.config.js           # Tailwind config
├── README.md                    # User documentation
├── SETUP.md                     # Setup instructions
└── CONTRIBUTING.md              # Developer guide
```

## Supported Conversions

### Currently Implemented

1. **PDF → DOCX** (requires Pandoc)
2. **DOCX → PDF** (requires LibreOffice or Pandoc)
3. **PPTX → PDF** (requires LibreOffice)
4. **PDF → Images** (built-in, placeholder for ImageMagick)
5. **Images → PDF** (built-in with pdf-lib + sharp)
6. **PDF → TXT** (built-in with pdf-parse)
7. **DOCX → TXT** (requires Pandoc)

### Easy to Add

- EPUB conversions
- Markdown conversions
- HTML conversions
- More image formats
- Video/audio (with ffmpeg)
- Archive formats

## Development Workflow

### 1. Initial Setup
```bash
npm install
```

### 2. Development
```bash
npm run dev
# or
./scripts/dev.sh
```

This starts:
- Vite dev server (React UI with hot reload)
- TypeScript compiler (main process)
- Electron app

### 3. Testing
- Test single file conversions
- Test batch conversions
- Test with/without external tools
- Test error handling

### 4. Building
```bash
npm run build
```

Compiles:
- React app → `dist/renderer/`
- Main process → `dist/main/`
- Preload script → `dist/main/`

### 5. Packaging
```bash
npm run package        # All platforms
npm run package:win    # Windows only
npm run package:mac    # macOS only
npm run package:linux  # Linux only
```

Creates installers in `release/` folder.

## IPC Communication

The app uses Electron's IPC for secure communication between renderer and main process:

### File Dialogs
- `dialog:selectFiles` - Multi-file picker
- `dialog:selectFolder` - Folder picker
- `dialog:selectOutputFolder` - Output location
- `shell:openFolder` - Open in file explorer

### Conversions
- `convert:file` - Single file conversion
- `convert:batch` - Batch conversion
- `batch:progress` - Progress updates (event)

### System
- `tools:check` - Detect external tools

## UI Design

### Color Scheme
- Background: `#050509` (near-black)
- Cards: `#0b0b10` (dark gray)
- Borders: `#1a1a24` (subtle)
- Accents: Gradient from sky → purple → emerald

### Layout
- **Left sidebar** (384px): Tool grid with cards
- **Right panel** (flex): Active tool or batch panel
- **Top header**: Branding and description
- **Warning banner**: Shows if tools missing

### Components
- Tool cards with icons and descriptions
- File/folder pickers with native dialogs
- Progress bars for batch operations
- Status indicators (pending, processing, completed, failed)
- "Open output folder" button after conversion

## Distribution Strategy

### 1. Build Installers
```bash
npm run package
```

### 2. Upload to GitHub Releases
- Create a new release (e.g., v1.0.0)
- Upload installers from `release/` folder
- Write release notes

### 3. Update Web App
Add download buttons linking to GitHub Releases:
```html
<a href="https://github.com/you/file-converter-pro/releases/latest/download/File-Converter-Pro-Setup.exe">
  Download for Windows
</a>
```

### 4. Auto-Updates (Future)
- Integrate `electron-updater`
- Host update manifests
- Enable in-app update notifications

## Next Steps

1. **Install dependencies**: `npm install`
2. **Add app icons**: Place in `build/` folder
3. **Install external tools**: Pandoc, LibreOffice (optional)
4. **Test in dev mode**: `npm run dev`
5. **Build installers**: `npm run package`
6. **Test installers**: Install and test on target platforms
7. **Set up GitHub Releases**: For distribution
8. **Update web app**: Add download links

## Future Enhancements

- [ ] More format support (EPUB, Markdown, HTML)
- [ ] OCR for scanned PDFs (Tesseract)
- [ ] Video/audio conversions (ffmpeg)
- [ ] Cloud storage integration
- [ ] Conversion presets/profiles
- [ ] Auto-updates
- [ ] Drag-and-drop file input
- [ ] Conversion history
- [ ] Settings panel
- [ ] Dark/light theme toggle
- [ ] Localization (i18n)

## Troubleshooting

See `SETUP.md` for detailed troubleshooting steps.

## License

MIT - See LICENSE file
