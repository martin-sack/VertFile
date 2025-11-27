import { useState } from 'react';
import { JS_ONLY_TOOLS, ToolDefinition } from '../../shared/tool-registry';
import ToolsSidebar from './ToolsSidebar';
import WorkspacePanel from './WorkspacePanel';
import DependenciesPanel from './DependenciesPanel';
import Header from './Header';
import SettingsModal from './SettingsModal';
import HistoryModal from './HistoryModal';
import { useConversionHistory } from '../hooks/useConversionHistory';

export default function ThreeColumnLayout() {
  const [selectedTool, setSelectedTool] = useState<ToolDefinition>(JS_ONLY_TOOLS[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showUpdateMessage, setShowUpdateMessage] = useState(false);
  const { history, clearHistory, deleteRecord } = useConversionHistory();

  const handleCheckUpdates = () => {
    setShowUpdateMessage(true);
    setTimeout(() => setShowUpdateMessage(false), 3000);
  };

  const handleOpenWeb = () => {
    if (window.electronAPI) {
      window.electronAPI.openExternal('https://martinsfile-converter.vercel.app/');
    }
  };

  const handleOpenFolder = (path: string) => {
    if (window.electronAPI) {
      window.electronAPI.openFolder(path);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Header */}
      <Header
        onSettingsClick={() => setShowSettings(true)}
        onCheckUpdates={handleCheckUpdates}
        onHistoryClick={() => setShowHistory(true)}
        onOpenWeb={handleOpenWeb}
      />

      {/* Main Content - 3 Columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Tools Sidebar */}
        <ToolsSidebar
          selectedTool={selectedTool}
          onSelectTool={setSelectedTool}
        />

        {/* Middle: Workspace */}
        <WorkspacePanel tool={selectedTool} />

        {/* Right: Dependencies Info */}
        <DependenciesPanel />
      </div>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)} 
      />
      <HistoryModal 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onClearHistory={clearHistory}
        onDeleteRecord={deleteRecord}
        onOpenFolder={handleOpenFolder}
      />

      {/* Update Message Toast */}
      {showUpdateMessage && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-2 fade-in">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-xl shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">You're on the latest release!</span>
          </div>
        </div>
      )}
    </div>
  );
}
