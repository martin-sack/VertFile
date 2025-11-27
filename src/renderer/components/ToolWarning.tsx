import { useState } from 'react';

interface ToolWarningProps {
  toolsAvailable: { pandoc: boolean; libreoffice: boolean };
}

export default function ToolWarning({ toolsAvailable }: ToolWarningProps) {
  const [showDetails, setShowDetails] = useState(false);

  const missingTools = [];
  if (!toolsAvailable.pandoc) missingTools.push('Pandoc');
  if (!toolsAvailable.libreoffice) missingTools.push('LibreOffice');

  if (missingTools.length === 0) return null;

  return (
    <div className="relative border-b border-yellow-500/20">
      <div className="glass-panel bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 px-6 py-3">
        <div className="flex items-start gap-3">
          {/* Warning Icon */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <p className="text-yellow-200 text-sm font-medium">
              Missing tools: <span className="text-yellow-300">{missingTools.join(', ')}</span>
            </p>
            <p className="text-yellow-300/70 text-xs mt-1">
              Some conversions require external tools. Install them for full functionality.
            </p>

            {/* Collapsible Details */}
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-yellow-500/20 space-y-2 animate-in fade-in slide-in-from-top-2">
                {!toolsAvailable.pandoc && (
                  <div className="text-xs text-yellow-200">
                    <p className="font-medium mb-1">Pandoc:</p>
                    <p className="text-yellow-300/80">
                      • macOS: <code className="px-1.5 py-0.5 bg-black/30 rounded text-yellow-400">brew install pandoc</code>
                    </p>
                    <p className="text-yellow-300/80 mt-0.5">
                      • Windows/Linux: Download from{' '}
                      <a
                        href="https://pandoc.org/installing.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 underline"
                      >
                        pandoc.org
                      </a>
                    </p>
                  </div>
                )}
                {!toolsAvailable.libreoffice && (
                  <div className="text-xs text-yellow-200">
                    <p className="font-medium mb-1">LibreOffice:</p>
                    <p className="text-yellow-300/80">
                      • macOS: <code className="px-1.5 py-0.5 bg-black/30 rounded text-yellow-400">brew install --cask libreoffice</code>
                    </p>
                    <p className="text-yellow-300/80 mt-0.5">
                      • Windows/Linux: Download from{' '}
                      <a
                        href="https://www.libreoffice.org/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 underline"
                      >
                        libreoffice.org
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Learn More Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg glass-panel hover:bg-yellow-500/20 transition-all duration-300 text-yellow-300 border border-yellow-500/30 flex items-center gap-1.5"
          >
            {showDetails ? (
              <>
                Hide details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                Learn more
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
    </div>
  );
}
