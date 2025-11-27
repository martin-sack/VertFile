export default function DependenciesPanel() {
  // More reliable cross-platform detection
  const getPlatform = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    if (platform.includes('mac') || userAgent.includes('mac')) return 'mac';
    if (platform.includes('win') || userAgent.includes('win')) return 'windows';
    if (platform.includes('linux') || userAgent.includes('linux')) return 'linux';
    return 'unknown';
  };

  const platform = getPlatform();
  const isMac = platform === 'mac';
  const isWindows = platform === 'windows';
  const isLinux = platform === 'linux';
  
  return (
    <div className="w-80 bg-gray-950/80 backdrop-blur-sm border-l border-indigo-500/20 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">System Info</h2>
          <p className="text-xs text-gray-500 mb-2">
            {isMac && '🍎 macOS'}
            {isWindows && '🪟 Windows'}
            {isLinux && '🐧 Linux'}
            {platform === 'unknown' && '🖥️ Desktop'}
          </p>
          <p className="text-sm text-gray-400">
            Current tools and future capabilities
          </p>
        </div>

        {/* JS Tools Status */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">✅</span>
            <h3 className="font-semibold text-emerald-300">JS Tools Active</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            These tools work immediately with no setup:
          </p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              Image Compressor
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              Image to PDF
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">•</span>
              JSON ↔ CSV
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-emerald-500/20">
            <p className="text-xs text-emerald-400/80">
              ✓ 100% offline • No installation required
            </p>
          </div>
        </div>

        {/* Advanced Tools (Coming Soon) */}
        <div>
          <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
            <span>⚡</span>
            Advanced Tools (Coming Soon)
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Optional system tools that will unlock additional "Pro" conversions in future updates.
          </p>

          {/* LibreOffice Card */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-600/30">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">📄</span>
              <div>
                <h4 className="font-medium text-gray-300">LibreOffice</h4>
                <p className="text-xs text-gray-500 mt-1">Office document conversions</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 space-y-1 mb-3">
              <p className="text-yellow-400">Will unlock:</p>
              <p>• PDF → DOCX</p>
              <p>• DOCX → PDF</p>
              <p>• PPTX → PDF</p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-400 mb-2">Install:</p>
              {isMac && (
                <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                  brew install --cask libreoffice
                </code>
              )}
              {isWindows && (
                <div className="space-y-2">
                  <a 
                    href="https://www.libreoffice.org/download/download/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/30 px-2 py-1 rounded text-indigo-400 hover:text-indigo-300 underline text-center"
                  >
                    Download Installer
                  </a>
                  <div>
                    <p className="text-gray-500 mb-1">Or via Chocolatey:</p>
                    <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                      choco install libreoffice
                    </code>
                  </div>
                </div>
              )}
              {!isMac && !isWindows && (
                <div className="space-y-2">
                  <p className="text-gray-400">Linux:</p>
                  <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                    sudo apt install libreoffice
                  </code>
                  <p className="text-gray-500 text-xs mt-1">Or use your distro's package manager</p>
                </div>
              )}
            </div>
          </div>

          {/* ImageMagick Card */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-gray-600/30">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">🖼️</span>
              <div>
                <h4 className="font-medium text-gray-300">ImageMagick</h4>
                <p className="text-xs text-gray-500 mt-1">High-quality image processing</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 space-y-1 mb-3">
              <p className="text-yellow-400">Will unlock:</p>
              <p>• High-quality PDF → Images</p>
              <p>• Advanced image effects</p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-400 mb-2">Install:</p>
              {isMac && (
                <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                  brew install imagemagick
                </code>
              )}
              {isWindows && (
                <div className="space-y-2">
                  <a 
                    href="https://imagemagick.org/script/download.php#windows" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/30 px-2 py-1 rounded text-indigo-400 hover:text-indigo-300 underline text-center"
                  >
                    Download Installer
                  </a>
                  <div>
                    <p className="text-gray-500 mb-1">Or via Chocolatey:</p>
                    <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                      choco install imagemagick
                    </code>
                  </div>
                </div>
              )}
              {!isMac && !isWindows && (
                <div className="space-y-2">
                  <p className="text-gray-400">Linux:</p>
                  <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                    sudo apt install imagemagick
                  </code>
                  <p className="text-gray-500 text-xs mt-1">Or use your distro's package manager</p>
                </div>
              )}
            </div>
          </div>

          {/* Pandoc Card */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">📝</span>
              <div>
                <h4 className="font-medium text-gray-300">Pandoc</h4>
                <p className="text-xs text-gray-500 mt-1">Advanced document conversion</p>
              </div>
            </div>
            <div className="text-xs text-gray-400 space-y-1 mb-3">
              <p className="text-yellow-400">Will unlock:</p>
              <p>• Markdown ↔ DOCX</p>
              <p>• Advanced text conversions</p>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-400 mb-2">Install:</p>
              {isMac && (
                <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                  brew install pandoc
                </code>
              )}
              {isWindows && (
                <div className="space-y-2">
                  <a 
                    href="https://pandoc.org/installing.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-black/30 px-2 py-1 rounded text-indigo-400 hover:text-indigo-300 underline text-center"
                  >
                    Download Installer
                  </a>
                  <div>
                    <p className="text-gray-500 mb-1">Or via Chocolatey:</p>
                    <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                      choco install pandoc
                    </code>
                  </div>
                </div>
              )}
              {!isMac && !isWindows && (
                <div className="space-y-2">
                  <p className="text-gray-400">Linux:</p>
                  <code className="block bg-black/30 px-2 py-1 rounded text-gray-300">
                    sudo apt install pandoc
                  </code>
                  <p className="text-gray-500 text-xs mt-1">Or use your distro's package manager</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-700/30">
          <p>Pro tools will be enabled in future updates</p>
        </div>
      </div>
    </div>
  );
}
