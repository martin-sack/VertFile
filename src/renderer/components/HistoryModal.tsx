import { ConversionRecord } from '../types/history';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ConversionRecord[];
  onClearHistory: () => void;
  onDeleteRecord: (id: string) => void;
  onOpenFolder?: (path: string) => void;
}

export default function HistoryModal({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onDeleteRecord,
  onOpenFolder,
}: HistoryModalProps) {
  if (!isOpen) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const getFileName = (path: string) => {
    return path.split('/').pop() || path.split('\\').pop() || path;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[80vh] glass-panel rounded-2xl border-2 border-neon-cyan/30 shadow-neon-glow animate-in fade-in slide-in-from-bottom-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border border-neon-cyan/30">
              <svg
                className="w-6 h-6 text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gradient">Conversion History</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {history.length} {history.length === 1 ? 'conversion' : 'conversions'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="px-3 py-1.5 text-xs glass-panel rounded-lg hover:bg-red-500/20 transition-colors text-gray-300 hover:text-red-300 border border-white/10 hover:border-red-500/30"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg glass-panel hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border border-neon-cyan/30 mb-4">
                <svg
                  className="w-8 h-8 text-neon-cyan/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No conversion history yet</p>
              <p className="text-gray-500 text-xs mt-1">Your completed conversions will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="glass-panel rounded-xl p-4 border border-white/10 hover:border-neon-cyan/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border ${
                        record.status === 'success'
                          ? 'bg-green-500/20 border-green-500/30'
                          : 'bg-red-500/20 border-red-500/30'
                      }`}
                    >
                      {record.status === 'success' ? (
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">{record.toolName}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{formatDate(record.timestamp)}</span>
                      </div>

                      <div className="text-xs text-gray-400 space-y-1">
                        <p>
                          <span className="text-gray-500">Input:</span>{' '}
                          {record.inputPaths.length === 1
                            ? getFileName(record.inputPaths[0])
                            : `${record.inputPaths.length} files`}
                        </p>
                        {record.outputPath && (
                          <p className="truncate">
                            <span className="text-gray-500">Output:</span> {record.outputPath}
                          </p>
                        )}
                        {record.error && (
                          <p className="text-red-400">
                            <span className="text-gray-500">Error:</span> {record.error}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      {record.status === 'success' && record.outputPath && onOpenFolder && (
                        <button
                          onClick={() => onOpenFolder(record.outputPath!)}
                          className="p-2 rounded-lg glass-panel hover:bg-neon-cyan/20 transition-colors group"
                          title="Open output folder"
                        >
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-neon-cyan"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteRecord(record.id)}
                        className="p-2 rounded-lg glass-panel hover:bg-red-500/20 transition-colors group"
                        title="Delete record"
                      >
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
