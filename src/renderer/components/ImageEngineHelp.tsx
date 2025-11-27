import { useState } from 'react';

interface ImageEngineHelpProps {
  isVisible: boolean;
}

export default function ImageEngineHelp({ isVisible }: ImageEngineHelpProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-3 pt-3 border-t border-red-500/20 space-y-3 animate-in fade-in slide-in-from-top-2">
      <p className="text-xs font-medium text-red-300 mb-2">💡 To enable PDF → Images:</p>
      
      <div className="space-y-2">
        <div className="text-xs text-red-200">
          <p className="font-medium mb-1">Option 1 – ImageMagick</p>
          <p className="text-red-300/80">
            • macOS: <code className="px-1.5 py-0.5 bg-black/30 rounded text-red-400">brew install imagemagick</code>
          </p>
          <p className="text-red-300/80 mt-0.5">
            • Windows: Download from{' '}
            <a
              href="https://imagemagick.org/script/download.php#windows"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 underline"
            >
              imagemagick.org
            </a>
          </p>
        </div>
        
        <div className="text-xs text-red-200">
          <p className="font-medium mb-1">Option 2 – Poppler (pdftoppm)</p>
          <p className="text-red-300/80">
            • macOS: <code className="px-1.5 py-0.5 bg-black/30 rounded text-red-400">brew install poppler</code>
          </p>
          <p className="text-red-300/80 mt-0.5">
            • Linux: Use your package manager (apt, yum, etc.)
          </p>
        </div>
      </div>
      
      <p className="text-xs text-red-400/70 mt-2">
        After installation, restart the app to use PDF → Images conversion.
      </p>
    </div>
  );
}
