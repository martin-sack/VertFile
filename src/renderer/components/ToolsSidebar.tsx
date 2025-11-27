import { JS_ONLY_TOOLS, PRO_TOOLS, ToolDefinition, TOOL_CATEGORIES } from '../../shared/tool-registry';

interface ToolsSidebarProps {
  selectedTool: ToolDefinition;
  onSelectTool: (tool: ToolDefinition) => void;
}

export default function ToolsSidebar({ selectedTool, onSelectTool }: ToolsSidebarProps) {
  return (
    <div className="w-64 bg-gray-900/50 border-r border-purple-500/20 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <h2 className="text-xl font-bold text-gradient">Conversion Tools</h2>
        <p className="text-xs text-gray-400 mt-1">Select a tool to get started</p>
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* JS-Only Tools */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-green-400">✓ READY TO USE</span>
          </div>
          <div className="space-y-1">
            {JS_ONLY_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  selectedTool.id === tool.id
                    ? 'bg-purple-500/20 border border-purple-500/50 shadow-lg'
                    : 'hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{tool.name}</p>
                    <p className="text-xs text-gray-400 truncate">{tool.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pro Tools (Coming Soon) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-yellow-400">⚡ PRO TOOLS</span>
            <span className="text-xs text-gray-500">(Coming Soon)</span>
          </div>
          <div className="space-y-1 opacity-50">
            {PRO_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="w-full text-left px-3 py-2.5 rounded-lg border border-gray-700/30 cursor-not-allowed"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl grayscale">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-400 truncate">{tool.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      Requires {tool.requiresSystemTool}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500/20">
        <div className="text-xs text-gray-400 text-center">
          <p className="font-medium text-green-400 mb-1">
            {JS_ONLY_TOOLS.length} tools ready
          </p>
          <p className="text-gray-500">No setup required!</p>
        </div>
      </div>
    </div>
  );
}
