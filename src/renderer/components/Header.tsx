interface HeaderProps {
  onSettingsClick: () => void;
  onCheckUpdates: () => void;
  onHistoryClick: () => void;
  onOpenWeb: () => void;
}

export default function Header({ onSettingsClick, onCheckUpdates, onHistoryClick, onOpenWeb }: HeaderProps) {
  return (
    <div className="relative">
      {/* Glass panel with backdrop blur */}
      <div className="bg-gray-950/80 backdrop-blur-sm border-b border-indigo-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center gap-4">
            {/* Glowing app icon */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 border-2 border-indigo-400/30">
                <img
                  src="/app-icon.png"
                  alt="File Converter Pro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">File Converter Pro</h1>
              <p className="text-xs text-gray-400 mt-0.5">Local. Powerful. Unlimited.</p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            {/* Settings icon */}
            <button
              onClick={onSettingsClick}
              className="w-9 h-9 rounded-lg bg-gray-800/30 backdrop-blur-sm border border-indigo-500/20 flex items-center justify-center hover:border-indigo-400/50 hover:bg-gray-800/50 transition-all duration-300 group"
              title="Settings"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Check for Updates */}
            <button
              onClick={onCheckUpdates}
              className="px-3 py-1.5 text-xs bg-gray-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-lg hover:border-indigo-400/50 hover:bg-gray-800/50 transition-all duration-300 text-gray-300 hover:text-white"
              title="Check for updates"
            >
              Check Updates
            </button>

            {/* History */}
            <button
              onClick={onHistoryClick}
              className="px-3 py-1.5 text-xs bg-gray-800/30 backdrop-blur-sm border border-indigo-500/20 rounded-lg hover:border-indigo-400/50 hover:bg-gray-800/50 transition-all duration-300 text-gray-300 hover:text-white flex items-center gap-1.5"
              title="Conversion history"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              History
            </button>

            {/* Open Web Version */}
            <button
              onClick={onOpenWeb}
              className="px-3 py-1.5 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all duration-300 text-white border border-indigo-400/30 shadow-lg shadow-indigo-500/20"
              title="Open web version"
            >
              Open Web
            </button>
          </div>
        </div>
      </div>

      {/* Gradient line underneath */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
    </div>
  );
}
