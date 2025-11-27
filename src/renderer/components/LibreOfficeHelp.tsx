interface LibreOfficeHelpProps {
  isVisible: boolean;
}

export default function LibreOfficeHelp({ isVisible }: LibreOfficeHelpProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-3 pt-3 border-t border-red-500/20 space-y-3 animate-in fade-in slide-in-from-top-2">
      <p className="text-xs font-medium text-red-300 mb-2">💡 To enable this conversion:</p>
      
      <div className="space-y-2">
        <div className="text-xs text-red-200">
          <p className="font-medium mb-1">Install LibreOffice</p>
          <p className="text-red-300/80">
            • macOS: <code className="px-1.5 py-0.5 bg-black/30 rounded text-red-400">brew install --cask libreoffice</code>
          </p>
          <p className="text-red-300/80 mt-0.5">
            • Windows/Linux: Download from{' '}
            <a
              href="https://www.libreoffice.org/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 underline"
            >
              libreoffice.org
            </a>
          </p>
        </div>
      </div>
      
      <p className="text-xs text-red-400/70 mt-2">
        After installation, restart the app to use this conversion.
      </p>
    </div>
  );
}
