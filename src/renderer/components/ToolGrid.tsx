import { ConversionTool } from '../types';
import { tools } from '../data/tools';

interface ToolGridProps {
  onToolSelect: (tool: ConversionTool) => void;
  onBatchClick: () => void;
  selectedTool: ConversionTool | null;
  showBatch: boolean;
}

const categoryIcons: Record<string, string> = {
  pdf: '📄',
  office: '📝',
  image: '🖼️',
  text: '📃',
};

const categoryColors: Record<string, string> = {
  pdf: 'from-neon-cyan/20 to-neon-blue/20 border-neon-cyan/30',
  office: 'from-neon-purple/20 to-neon-pink/20 border-neon-purple/30',
  image: 'from-neon-pink/20 to-neon-cyan/20 border-neon-pink/30',
  text: 'from-neon-blue/20 to-neon-purple/20 border-neon-blue/30',
};

export default function ToolGrid({ onToolSelect, onBatchClick, selectedTool, showBatch }: ToolGridProps) {
  return (
    <div className="p-4 space-y-3">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-gradient uppercase tracking-wider">
          Conversion Tools
        </h2>
        <div className="h-[1px] bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-transparent mt-2"></div>
      </div>

      {/* Tool Cards */}
      {tools.map((tool) => {
        const isSelected = selectedTool?.id === tool.id;
        const colorClass = categoryColors[tool.category] || categoryColors.pdf;
        
        return (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool)}
            className={`group w-full text-left p-4 rounded-xl transition-all duration-300 ${
              isSelected
                ? `neon-card shadow-neon-purple bg-gradient-to-br ${colorClass}`
                : 'glass-panel hover:shadow-neon-blue'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Icon with gradient background */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-xl border ${
                isSelected ? 'shadow-neon-glow' : ''
              }`}>
                {categoryIcons[tool.category]}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-sm ${
                  isSelected ? 'text-gradient' : 'text-white group-hover:text-neon-cyan'
                } transition-colors`}>
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-neon-blue animate-pulse"></div>
                </div>
              )}
            </div>
          </button>
        );
      })}

      {/* Batch Conversion Card */}
      <div className="pt-2">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3"></div>
        
        <button
          onClick={onBatchClick}
          className={`group w-full text-left p-4 rounded-xl transition-all duration-300 ${
            showBatch
              ? 'neon-card shadow-neon-purple bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 border-neon-pink/30'
              : 'glass-panel hover:shadow-neon-pink'
          }`}
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30 flex items-center justify-center text-xl ${
              showBatch ? 'shadow-neon-glow' : ''
            }`}>
              ⚡
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-sm ${
                showBatch ? 'text-gradient' : 'text-white group-hover:text-neon-pink'
              } transition-colors`}>
                Batch Conversion
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Convert multiple files at once
              </p>
            </div>

            {/* Selection indicator */}
            {showBatch && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-neon-pink shadow-neon-purple animate-pulse"></div>
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
