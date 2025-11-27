#!/bin/bash

# Development startup script for File Converter Pro

echo "🚀 Starting File Converter Pro in development mode..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

# Check for external tools
echo "🔍 Checking for external tools..."

if command -v pandoc &> /dev/null; then
  echo "✅ Pandoc is installed"
else
  echo "⚠️  Pandoc not found (optional - needed for PDF/DOCX conversions)"
fi

if command -v soffice &> /dev/null || command -v libreoffice &> /dev/null; then
  echo "✅ LibreOffice is installed"
else
  echo "⚠️  LibreOffice not found (optional - needed for Office to PDF)"
fi

echo ""
echo "🎨 Starting development server..."
npm run dev
