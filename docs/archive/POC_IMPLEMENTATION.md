# 🚀 Proof of Concept Implementation

## Goal
Create a working 3-column desktop app with JS-only tools that works immediately after download.

## What We're Building

### 3-Column Layout
```
┌─────────────┬──────────────────────┬─────────────────┐
│   TOOLS     │     WORKSPACE        │  DEPENDENCIES   │
│   LIST      │   (Upload/Convert)   │   & INFO        │
│             │                      │                 │
│ • Image     │  [Drag & Drop]       │ ✅ JS Tools     │
│   Compress  │                      │                 │
│ • Image to  │  [Settings]          │ 🔧 Advanced     │
│   PDF       │                      │   (Coming Soon) │
│ • JSON ↔    │  [Convert Button]    │                 │
│   CSV       │                      │ • LibreOffice   │
│             │  [Result]            │ • ImageMagick   │
│             │                      │ • Pandoc        │
└─────────────┴──────────────────────┴─────────────────┘
```

## Implementation Steps

### Step 1: Install Dependencies ✅
```bash
npm install browser-image-compression jspdf papaparse
npm install --save-dev @types/papaparse
```

### Step 2: Create Shared Tool Registry
File: `src/shared/tool-registry.ts`
- Define tool interface
- List all tools (JS-only + future Pro tools)
- Categorize by type

### Step 3: Create JS Conversion Engine
Files:
- `src/main/conversions/js-engine/image-compress.ts`
- `src/main/conversions/js-engine/image-to-pdf.ts`
- `src/main/conversions/js-engine/json-csv.ts`

### Step 4: Create 3-Column Layout Components
Files:
- `src/renderer/components/ThreeColumnLayout.tsx` (main container)
- `src/renderer/components/ToolsSidebar.tsx` (left panel)
- `src/renderer/components/WorkspacePanel.tsx` (middle panel)
- `src/renderer/components/DependenciesPanel.tsx` (right panel)

### Step 5: Wire Up IPC Handlers
- Add conversion handlers to `src/main/ipc.ts`
- Expose APIs in `src/main/preload.ts`

### Step 6: Update App.tsx
- Replace current UI with ThreeColumnLayout
- Keep existing code commented for reference

## Tools in PoC

### ✅ Working JS-Only Tools

**1. Image Compressor**
- Input: JPG, PNG, WEBP
- Output: Compressed version
- Library: `browser-image-compression` + `sharp`
- Settings: Quality slider (0-100)

**2. Image to PDF**
- Input: JPG, PNG, WEBP
- Output: PDF
- Library: `jspdf` + `pdf-lib`
- Settings: Page size, orientation

**3. JSON ↔ CSV**
- Input: JSON or CSV
- Output: CSV or JSON
- Library: `papaparse`
- Settings: Delimiter, headers

### 🔜 Future Pro Tools (Not Implemented Yet)

**Office Conversions** (Requires LibreOffice)
- PDF → DOCX
- DOCX → PDF
- PPTX → PDF

**Advanced PDF** (Requires ImageMagick)
- High-quality PDF → Images

**Advanced Markdown** (Requires Pandoc)
- Markdown ↔ DOCX

## File Structure

```
src/
├── shared/
│   └── tool-registry.ts              # NEW: Tool definitions
├── main/
│   ├── conversions/
│   │   ├── js-engine/                # NEW: JS-only conversions
│   │   │   ├── image-compress.ts
│   │   │   ├── image-to-pdf.ts
│   │   │   └── json-csv.ts
│   │   └── ... (existing system tools)
│   └── ipc.ts                        # UPDATED: Add JS conversion handlers
├── renderer/
│   ├── components/
│   │   ├── ThreeColumnLayout.tsx    # NEW: Main layout
│   │   ├── ToolsSidebar.tsx         # NEW: Left panel
│   │   ├── WorkspacePanel.tsx       # NEW: Middle panel
│   │   ├── DependenciesPanel.tsx    # NEW: Right panel
│   │   └── ... (existing components)
│   └── App.tsx                       # UPDATED: Use new layout
└── ...
```

## Success Criteria

✅ App starts without errors
✅ 3-column layout displays correctly
✅ Can select tools from left sidebar
✅ Can upload files in middle panel
✅ Image compression works end-to-end
✅ Image to PDF works end-to-end
✅ JSON ↔ CSV works end-to-end
✅ Right panel shows dependencies info
✅ No external tools required for these 3 tools

## Extension Points

The PoC is designed to be easily extensible:

1. **Add More JS Tools:**
   - Create new file in `js-engine/`
   - Add to tool registry
   - Add IPC handler
   - Done!

2. **Add Pro Tools:**
   - Keep existing system tool code
   - Add to tool registry with `requiresSystemTool` flag
   - UI will show "Requires X" message
   - Right panel explains how to install

3. **Add More Panels:**
   - Layout is flexible
   - Can add 4th panel if needed
   - Can collapse/expand panels

## Next Steps After PoC

If PoC is approved:
1. Add more JS-only tools (OCR, ZIP, etc.)
2. Wire up existing Pro tools (LibreOffice, etc.)
3. Add tool detection service
4. Polish UI/UX
5. Add batch processing
6. Add history/favorites

## Timeline

- **Day 1:** Foundation (registry, layout, structure)
- **Day 2:** Implement 3 tools + wire everything up
- **Total:** 1-2 days for working PoC

Let's build it! 🚀
