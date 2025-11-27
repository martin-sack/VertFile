import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [appInfo, setAppInfo] = useState<{ version: string; name: string; platform: string } | null>(null);
  const [toolsAvailable, setToolsAvailable] = useState({ pandoc: false, libreoffice: false });

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getAppInfo().then(setAppInfo);
      window.electronAPI.checkTools().then(setToolsAvailable);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl rounded-2xl border-2 border-indigo-500/30 shadow-2xl shadow-indigo-500/20 animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-indigo-400/30 shadow-lg shadow-indigo-500/20">
              <img
                src="/file-converter-icon.png"
                alt="File Converter Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gradient">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* App Info */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-indigo-500/30">
            <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">Application Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{appInfo?.name || 'File Converter Pro'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Version:</span>
                <span className="text-white">{appInfo?.version || '1.0.0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform:</span>
                <span className="text-white capitalize">{appInfo?.platform || 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* External Tools */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
            <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">External Tools</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${toolsAvailable.pandoc ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-gray-600'}`}></div>
                  <span className="text-sm text-gray-300">Pandoc</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${toolsAvailable.pandoc ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                  {toolsAvailable.pandoc ? 'Installed' : 'Not Found'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${toolsAvailable.libreoffice ? 'bg-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-gray-600'}`}></div>
                  <span className="text-sm text-gray-300">LibreOffice</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${toolsAvailable.libreoffice ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                  {toolsAvailable.libreoffice ? 'Installed' : 'Not Found'}
                </span>
              </div>
            </div>
            {(!toolsAvailable.pandoc || !toolsAvailable.libreoffice) && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  Install missing tools for full functionality. See documentation for installation instructions.
                </p>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-pink-500/30">
            <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">Preferences</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Auto-check for updates</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Show notifications</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Open output folder after conversion</span>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </div>
              </label>
            </div>
          </div>

          {/* About */}
          <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30">
            <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">About</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              File Converter Pro is a powerful desktop application for converting files between various formats. 
              Built with Electron, React, and TypeScript.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-gray-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
