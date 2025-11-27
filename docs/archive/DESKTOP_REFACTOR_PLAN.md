# 🚀 Desktop App Refactor: JS Libraries + 3-Panel Layout

## Overview

Transform the desktop app to:
1. Work 100% offline with JS libraries (no external tools required)
2. 3-column layout: Tools | Workspace | Dependencies
3. Match web app functionality
4. Optional "Pro" features with system tools

---

## Phase 1: Install JS Libraries

### Required Dependencies

```json
{
  "dependencies": {
    // Image Processing
    "sharp": "^0.33.0",                    // Image manipulation (Node.js)
    "browser-image-compression": "^2.0.2", // Image compression
    
    // PDF Generation & Manipulation
    "pdf-lib": "^1.17.1",                  // PDF creation/manipulation
    "jspdf": "^2.5.1",                     // PDF generation
    "pdfjs-dist": "^3.11.174",             // PDF rendering
    "canvas": "^2.11.2",                   // Canvas for PDF rendering
    
    // Document Conversion
    "docx": "^8.5.0",                      // Create DOCX files
    "mammoth": "^1.6.0",                   // DOCX to HTML
    
    // Markdown
    "showdown": "^2.1.0",                  // Markdown to HTML
    "turndown": "^7.1.2",                  // HTML to Markdown
    
    // OCR
    "tesseract.js": "^5.0.3",              // OCR text extraction
    
    // Data Conversion
    "papaparse": "^5.4.1",                 // CSV parsing
    
    // Archives
    "jszip": "^3.10.1",                    // ZIP creation
    "adm-zip": "^0.5.10",                  // ZIP extraction (Node.js)
    
    // Video/Audio (WASM-based)
    "@ffmpeg/ffmpeg": "^0.12.7",           // Video processing
    "@ffmpeg/util": "^0.12.1"
  }
}
```

---

## Phase 2: Architecture

### File Structure

```
src/
├── main/
│   ├── conversions/
│   │   ├── js-engine/              # NEW: Pure JS conversions
│   │   │   ├── images.ts           # Image compression, resize, convert
│   │   │   ├── pdf.ts              # PDF generation, manipulation
│   │   │   ├── ocr.ts              # OCR text extraction
│   │   │   ├── markdown.ts         # Markdown conversions
│   │   │   ├── data.ts             # JSON/CSV conversions
│   │   │   ├── archive.ts          # ZIP operations
│   │   │   └── media.ts            # Video/Audio (ffmpeg)
│   │   ├── system-tools/           # EXISTING: System tool conversions
│   │   │   ├── libreoffice.ts      # PDF ↔ DOCX (requires LibreOffice)
│   │   │   ├── imagemagick.ts      # High-quality PDF → Images
│   │   │   └── pandoc.ts           # Advanced markdown
│   │   └── index.ts                # Route to JS or system
│   ├── tool-detection.ts           # NEW: Detect system tools
│   └── ipc.ts
├── renderer/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── ThreeColumnLayout.tsx    # NEW: Main layout
│   │   │   ├── ToolsSidebar.tsx         # NEW: Left panel
│   │   │   ├── WorkspacePanel.tsx       # NEW: Middle panel
│   │   │   └── DependenciesPanel.tsx    # NEW: Right panel
│   │   └── ... (existing components)
│   ├── services/
│   │   └── conversion-service.ts        # NEW: Unified conversion API
│   └── types/
│       └── tools.ts                     # NEW: Tool definitions
└── shared/
    └── tool-registry.ts                 # NEW: Shared tool definitions
```

---

## Phase 3: Tool Registry

### Tool Categories

**JS-Only Tools (Work Immediately):**
1. **Images**
   - Image Compressor
   - Image Resizer
   - Image Converter (JPG ↔ PNG ↔ WEBP)
   - Image to PDF

2. **Text & OCR**
   - Markdown to HTML
   - Text to PDF
   - OCR Text Extractor

3. **Data**
   - JSON to CSV
   - CSV to JSON

4. **Archives**
   - Create ZIP
   - Extract ZIP

5. **Media**
   - Video to Audio (WASM ffmpeg)

**Pro Tools (Require System Tools):**
1. **Office Conversions** (LibreOffice)
   - PDF → DOCX
   - DOCX → PDF
   - PPTX → PDF

2. **Advanced PDF** (ImageMagick/Poppler)
   - High-quality PDF → Images

3. **Advanced Markdown** (Pandoc)
   - Markdown ↔ DOCX

---

## Phase 4: Implementation Steps

### Step 1: Install Dependencies
```bash
npm install sharp browser-image-compression pdf-lib jspdf pdfjs-dist canvas docx mammoth showdown turndown tesseract.js papaparse jszip adm-zip @ffmpeg/ffmpeg @ffmpeg/util
```

### Step 2: Create Tool Registry
```typescript
// src/shared/tool-registry.ts
export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: 'images' | 'text' | 'data' | 'archives' | 'media' | 'office';
  icon: string;
  requiresSystemTool?: 'libreoffice' | 'imagemagick' | 'pandoc';
  isPro: boolean;
  inputFormats: string[];
  outputFormats: string[];
}

export const TOOLS: ToolDefinition[] = [
  // JS-Only Tools
  {
    id: 'image-compress',
    name: 'Image Compressor',
    description: 'Reduce image file size',
    category: 'images',
    icon: '🗜️',
    isPro: false,
    inputFormats: ['jpg', 'png', 'webp'],
    outputFormats: ['jpg', 'png', 'webp'],
  },
  // ... more tools
  
  // Pro Tools
  {
    id: 'pdf-to-docx',
    name: 'PDF → DOCX',
    description: 'Convert PDF to Word',
    category: 'office',
    icon: '📄',
    requiresSystemTool: 'libreoffice',
    isPro: true,
    inputFormats: ['pdf'],
    outputFormats: ['docx'],
  },
];
```

### Step 3: Create JS Conversion Engine
```typescript
// src/main/conversions/js-engine/images.ts
import sharp from 'sharp';

export async function compressImage(
  inputPath: string,
  outputPath: string,
  quality: number = 80
): Promise<{ success: boolean; outputPath?: string; error?: string }> {
  try {
    await sharp(inputPath)
      .jpeg({ quality })
      .toFile(outputPath);
    
    return { success: true, outputPath };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Compression failed' 
    };
  }
}

export async function resizeImage(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<{ success: boolean; outputPath?: string; error?: string }> {
  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
    
    return { success: true, outputPath };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Resize failed' 
    };
  }
}
```

### Step 4: Create Tool Detection Service
```typescript
// src/main/tool-detection.ts
import { checkCommandExists } from './conversions/utils';

export interface SystemToolStatus {
  libreoffice: boolean;
  imagemagick: boolean;
  poppler: boolean;
  pandoc: boolean;
}

export async function detectSystemTools(): Promise<SystemToolStatus> {
  return {
    libreoffice: await checkCommandExists('soffice'),
    imagemagick: await checkCommandExists('convert'),
    poppler: await checkCommandExists('pdftoppm'),
    pandoc: await checkCommandExists('pandoc'),
  };
}
```

### Step 5: Create 3-Column Layout
```tsx
// src/renderer/components/Layout/ThreeColumnLayout.tsx
import { useState, useEffect } from 'react';
import ToolsSidebar from './ToolsSidebar';
import WorkspacePanel from './WorkspacePanel';
import DependenciesPanel from './DependenciesPanel';
import { TOOLS } from '../../../shared/tool-registry';

export default function ThreeColumnLayout() {
  const [selectedTool, setSelectedTool] = useState(TOOLS[0]);
  const [systemTools, setSystemTools] = useState({
    libreoffice: false,
    imagemagick: false,
    poppler: false,
    pandoc: false,
  });

  useEffect(() => {
    // Detect system tools on mount
    window.electronAPI.detectSystemTools().then(setSystemTools);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Left: Tools Sidebar */}
      <ToolsSidebar
        tools={TOOLS}
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        systemTools={systemTools}
      />

      {/* Middle: Workspace */}
      <WorkspacePanel
        tool={selectedTool}
        systemTools={systemTools}
      />

      {/* Right: Dependencies Info */}
      <DependenciesPanel
        systemTools={systemTools}
        onRefresh={() => window.electronAPI.detectSystemTools().then(setSystemTools)}
      />
    </div>
  );
}
```

### Step 6: Create Dependencies Panel
```tsx
// src/renderer/components/Layout/DependenciesPanel.tsx
interface DependenciesPanelProps {
  systemTools: SystemToolStatus;
  onRefresh: () => void;
}

export default function DependenciesPanel({ systemTools, onRefresh }: DependenciesPanelProps) {
  return (
    <div className="w-80 bg-gray-900/50 border-l border-purple-500/20 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gradient">Advanced Tools</h2>
        <button onClick={onRefresh} className="text-purple-400 hover:text-purple-300">
          🔄
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Optional system tools that unlock additional "Pro" conversions.
      </p>

      {/* LibreOffice Card */}
      <DependencyCard
        name="LibreOffice"
        status={systemTools.libreoffice}
        unlocks={['PDF → DOCX', 'DOCX → PDF', 'PPTX → PDF']}
        installCommands={{
          macos: 'brew install --cask libreoffice',
          windows: 'Download from libreoffice.org',
          linux: 'sudo apt install libreoffice',
        }}
      />

      {/* ImageMagick Card */}
      <DependencyCard
        name="ImageMagick"
        status={systemTools.imagemagick}
        unlocks={['High-quality PDF → Images']}
        installCommands={{
          macos: 'brew install imagemagick',
          windows: 'Download from imagemagick.org',
          linux: 'sudo apt install imagemagick',
        }}
      />

      {/* Pandoc Card */}
      <DependencyCard
        name="Pandoc"
        status={systemTools.pandoc}
        unlocks={['Markdown ↔ DOCX', 'Advanced conversions']}
        installCommands={{
          macos: 'brew install pandoc',
          windows: 'Download from pandoc.org',
          linux: 'sudo apt install pandoc',
        }}
      />
    </div>
  );
}
```

---

## Phase 5: Migration Strategy

### Week 1: Foundation
- [ ] Install all JS libraries
- [ ] Create tool registry
- [ ] Set up 3-column layout structure
- [ ] Implement tool detection service

### Week 2: JS Conversions
- [ ] Implement image processing (compress, resize, convert)
- [ ] Implement PDF generation (image to PDF, text to PDF)
- [ ] Implement markdown conversions
- [ ] Implement data conversions (JSON/CSV)

### Week 3: Advanced Features
- [ ] Implement OCR
- [ ] Implement ZIP operations
- [ ] Implement video/audio (ffmpeg WASM)
- [ ] Test all JS-only tools

### Week 4: Integration
- [ ] Wire up all conversions to UI
- [ ] Implement dependencies panel
- [ ] Add "Pro" tool warnings
- [ ] Polish UI/UX

### Week 5: Testing & Polish
- [ ] Test all conversions
- [ ] Verify offline functionality
- [ ] Performance optimization
- [ ] Documentation

---

## Benefits

### For Users
✅ Works immediately after download
✅ No setup required for core features
✅ Clear path to "Pro" features
✅ Professional experience

### For Developers
✅ Pure JavaScript (easier to maintain)
✅ Cross-platform (same code everywhere)
✅ No licensing issues
✅ Easier testing

---

## Next Steps

1. **Approve this plan**
2. **Install dependencies**
3. **Start with Phase 1: Foundation**
4. **Iterate through phases**

This is a significant refactor (~2-3 weeks of work). Should I proceed with Phase 1?
