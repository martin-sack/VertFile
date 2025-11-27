#!/bin/bash

# Check if required external tools are installed

echo "🔍 Checking external conversion tools..."
echo ""

# Check Pandoc
if command -v pandoc &> /dev/null; then
  PANDOC_VERSION=$(pandoc --version | head -n 1)
  echo "✅ Pandoc: $PANDOC_VERSION"
else
  echo "❌ Pandoc: Not installed"
  echo "   Install: brew install pandoc (macOS)"
  echo "   Or visit: https://pandoc.org/installing.html"
fi

echo ""

# Check LibreOffice
if command -v soffice &> /dev/null; then
  LIBREOFFICE_VERSION=$(soffice --version)
  echo "✅ LibreOffice: $LIBREOFFICE_VERSION"
elif command -v libreoffice &> /dev/null; then
  LIBREOFFICE_VERSION=$(libreoffice --version)
  echo "✅ LibreOffice: $LIBREOFFICE_VERSION"
else
  echo "❌ LibreOffice: Not installed"
  echo "   Install: brew install --cask libreoffice (macOS)"
  echo "   Or visit: https://www.libreoffice.org/download/"
fi

echo ""
echo "Note: These tools are optional but enable more conversion types."
