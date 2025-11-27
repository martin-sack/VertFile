# 🔧 Installing External Tools

File Converter Pro uses external tools for some conversions. While the app works without them, installing these tools unlocks full functionality.

## 📊 What You Need

| Tool | Used For | Required? |
|------|----------|-----------|
| **Pandoc** | PDF ↔ DOCX, DOCX → TXT | Recommended |
| **LibreOffice** | DOCX/PPTX → PDF | Recommended |

Without these tools, you'll see a yellow warning banner in the app.

---

## 🍎 macOS Installation

### Pandoc

**Option 1: Homebrew (Recommended)**
```bash
brew install pandoc
```

**Option 2: Download Installer**
1. Visit https://pandoc.org/installing.html
2. Download the macOS .pkg installer
3. Double-click to install

**Verify Installation:**
```bash
pandoc --version
# Should show: pandoc 3.x.x
```

### LibreOffice

**Option 1: Homebrew (Recommended)**
```bash
brew install --cask libreoffice
```

**Option 2: Download Installer**
1. Visit https://www.libreoffice.org/download/
2. Download macOS version
3. Drag to Applications folder

**Verify Installation:**
```bash
soffice --version
# Should show: LibreOffice 7.x.x
```

---

## 🪟 Windows Installation

### Pandoc

**Option 1: Download Installer (Recommended)**
1. Visit https://pandoc.org/installing.html
2. Download Windows installer (.msi)
3. Run installer (adds to PATH automatically)

**Option 2: Chocolatey**
```powershell
choco install pandoc
```

**Verify Installation:**
```cmd
pandoc --version
```

### LibreOffice

**Download Installer**
1. Visit https://www.libreoffice.org/download/
2. Download Windows version
3. Run installer
4. Restart computer

**Verify Installation:**
```cmd
"C:\Program Files\LibreOffice\program\soffice.exe" --version
```

---

## 🐧 Linux Installation

### Pandoc

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install pandoc
```

**Fedora:**
```bash
sudo dnf install pandoc
```

**Arch:**
```bash
sudo pacman -S pandoc
```

**Verify Installation:**
```bash
pandoc --version
```

### LibreOffice

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install libreoffice
```

**Fedora:**
```bash
sudo dnf install libreoffice
```

**Arch:**
```bash
sudo pacman -S libreoffice-fresh
```

**Verify Installation:**
```bash
libreoffice --version
```

---

## ✅ Verify Everything is Working

### Check Tool Availability

Run this script:
```bash
./scripts/check-tools.sh
```

**Expected Output:**
```
✅ Pandoc: pandoc 3.1.9
✅ LibreOffice: LibreOffice 7.6.4.1
```

### Test in the App

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Check the warning banner:**
   - ✅ No banner = All tools installed
   - ⚠️ Yellow banner = Some tools missing

3. **Test a conversion:**
   - Click "PDF → DOCX" in the sidebar
   - Select a PDF file
   - Choose output folder
   - Click Convert
   - Should succeed without errors

---

## 🔍 Troubleshooting

### "Pandoc not found" after installation

**macOS/Linux:**
```bash
# Check if pandoc is in PATH
which pandoc

# If not found, add to PATH in ~/.zshrc or ~/.bashrc:
export PATH="/usr/local/bin:$PATH"

# Reload shell
source ~/.zshrc
```

**Windows:**
- Restart terminal/PowerShell
- Restart the app
- Check PATH in System Environment Variables

### "LibreOffice not found" after installation

**macOS:**
```bash
# Check if soffice is accessible
which soffice

# If not found, create symlink:
sudo ln -s /Applications/LibreOffice.app/Contents/MacOS/soffice /usr/local/bin/soffice
```

**Linux:**
```bash
# Check if libreoffice is in PATH
which libreoffice

# Try running directly:
/usr/bin/libreoffice --version
```

**Windows:**
- Add LibreOffice to PATH:
  - `C:\Program Files\LibreOffice\program`
- Restart terminal and app

### App still shows warning after installation

1. **Restart the app completely:**
   ```bash
   # Stop the app (Ctrl+C)
   npm run dev
   ```

2. **Check terminal output:**
   - Look for tool detection messages
   - Check for any error messages

3. **Verify tools work from terminal:**
   ```bash
   pandoc --version
   soffice --version  # or libreoffice --version
   ```

4. **Check app console:**
   - Open Electron DevTools
   - Look for tool detection errors

---

## 📝 What Each Tool Does

### Pandoc
- **PDF → DOCX**: Converts PDF to editable Word documents
- **DOCX → TXT**: Extracts plain text from Word documents
- **Fallback**: Also used for DOCX → PDF if LibreOffice not available

### LibreOffice
- **DOCX → PDF**: Converts Word documents to PDF (most reliable)
- **PPTX → PDF**: Converts PowerPoint presentations to PDF
- **Best quality**: Better formatting preservation than Pandoc

---

## 🎯 Quick Install (All Platforms)

### macOS
```bash
brew install pandoc
brew install --cask libreoffice
```

### Windows (Chocolatey)
```powershell
choco install pandoc libreoffice
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install pandoc libreoffice
```

---

## 🚀 After Installation

1. **Restart the app:**
   ```bash
   npm run dev
   ```

2. **Verify no warnings:**
   - Yellow banner should disappear
   - All conversion tools should work

3. **Test conversions:**
   - Try PDF → DOCX
   - Try DOCX → PDF
   - Check output files open correctly

---

## 💡 Optional: Advanced Setup

### Install Additional Formats

**For EPUB support (future):**
```bash
brew install calibre  # macOS
```

**For video/audio (future):**
```bash
brew install ffmpeg  # macOS
```

**For OCR (future):**
```bash
brew install tesseract  # macOS
```

---

## 📚 More Information

- **Pandoc Documentation**: https://pandoc.org/
- **LibreOffice Documentation**: https://www.libreoffice.org/get-help/documentation/

---

## ✅ Summary

1. Install Pandoc from https://pandoc.org/installing.html
2. Install LibreOffice from https://www.libreoffice.org/download/
3. Restart the app
4. Warning banner disappears
5. All conversions work!

**Need help?** See TROUBLESHOOTING.md or check the app's DevTools console.
