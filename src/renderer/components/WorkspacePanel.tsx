import { useState, useEffect } from 'react';
import { ToolDefinition } from '../../shared/tool-registry';
import path from 'path-browserify';
import { useConversionHistory } from '../hooks/useConversionHistory';

interface WorkspacePanelProps {
  tool: ToolDefinition;
}

export default function WorkspacePanel({ tool }: WorkspacePanelProps) {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [outputFolder, setOutputFolder] = useState<string>('');
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { addRecord } = useConversionHistory();

  // Clear results when tool changes
  useEffect(() => {
    setResult(null);
    setInputFiles([]);
  }, [tool.id]);
  
  // Tool-specific settings
  const [quality, setQuality] = useState(80);
  const [pageSize, setPageSize] = useState<'A4' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const handleSelectFiles = async () => {
    const files = await window.electronAPI.selectFiles();
    if (files) {
      setInputFiles(files);
      setResult(null);
    }
  };

  const handleSelectOutputFolder = async () => {
    const folder = await window.electronAPI.selectOutputFolder();
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const handleConvert = async () => {
    if (inputFiles.length === 0 || !outputFolder) {
      setResult({ success: false, error: 'Please select input files and output folder' });
      return;
    }

    setConverting(true);
    setResult(null);

    try {
      let conversionResult;
      const inputPath = inputFiles[0];
      const fileName = path.basename(inputPath, path.extname(inputPath));
      const outputPath = path.join(outputFolder, `${fileName}.${tool.outputFormat === 'same' ? path.extname(inputPath).slice(1) : tool.outputFormat}`);

      switch (tool.id) {
        case 'image-compress':
          conversionResult = await window.electronAPI.compressImage(inputPath, outputPath, { quality });
          break;
        
        case 'image-to-pdf':
          conversionResult = await window.electronAPI.imageToPDF(inputFiles, outputPath, { pageSize, orientation });
          break;
        
        case 'json-to-csv':
          conversionResult = await window.electronAPI.jsonToCSV(inputPath, outputPath, {});
          break;
        
        case 'csv-to-json':
          conversionResult = await window.electronAPI.csvToJSON(inputPath, outputPath, {});
          break;
        
        default:
          conversionResult = { success: false, error: 'Tool not implemented yet' };
      }

      setResult(conversionResult);

      // Add to history
      addRecord({
        toolId: tool.id,
        toolName: tool.name,
        inputPaths: inputFiles.map(f => path.basename(f)),
        outputPath: conversionResult.success ? outputPath : undefined,
        status: conversionResult.success ? 'success' : 'failed',
        error: conversionResult.error,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Conversion failed';
      setResult({ success: false, error: errorMessage });

      // Add failed conversion to history
      addRecord({
        toolId: tool.id,
        toolName: tool.name,
        inputPaths: inputFiles.map(f => path.basename(f)),
        outputPath: undefined,
        status: 'failed',
        error: errorMessage,
      });
    } finally {
      setConverting(false);
    }
  };

  const handleOpenFile = () => {
    if (result?.outputPath) {
      window.electronAPI.openFile(result.outputPath);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tool Header */}
      <div className="p-8 border-b border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-4xl border border-purple-500/30">
            {tool.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gradient">{tool.name}</h1>
            <p className="text-gray-400 mt-1">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Input Files */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Input Files
            </label>
            <button
              onClick={handleSelectFiles}
              className="w-full px-6 py-8 border-2 border-dashed border-purple-500/30 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-200 text-gray-400 hover:text-gray-300"
            >
              {inputFiles.length > 0 ? (
                <div className="space-y-2">
                  {inputFiles.map((file, i) => (
                    <div key={i} className="text-sm text-purple-400">
                      📄 {path.basename(file)}
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-2">Click to change</div>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">📁</div>
                  <div>Click to select files</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Accepts: {tool.inputFormats.join(', ')}
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Output Folder */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output Folder
            </label>
            <button
              onClick={handleSelectOutputFolder}
              className="w-full px-6 py-4 glass-panel rounded-xl hover:shadow-neon-purple transition-all duration-200 text-left"
            >
              {outputFolder ? (
                <span className="text-purple-400">📂 {outputFolder}</span>
              ) : (
                <span className="text-gray-500">Click to select output folder...</span>
              )}
            </button>
          </div>

          {/* Tool-Specific Settings */}
          {tool.hasQualitySlider && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          {tool.customSettings?.includes('pageSize') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as any)}
                  className="w-full px-4 py-2 glass-panel rounded-lg"
                >
                  <option value="A4">A4</option>
                  <option value="Letter">Letter</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as any)}
                  className="w-full px-4 py-2 glass-panel rounded-lg"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          )}

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={converting || inputFiles.length === 0 || !outputFolder}
            className="w-full px-8 py-5 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-indigo-500/20 transform hover:scale-[1.01] disabled:hover:scale-100"
          >
            {converting ? 'Converting...' : 'Convert Now'}
          </button>

          {/* Result */}
          {result && (
            <div
              className={`glass-panel rounded-2xl p-6 border-2 ${
                result.success
                  ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                  : 'border-red-500/50 bg-gradient-to-br from-red-500/10 to-pink-500/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {result.success ? '✅' : '❌'}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                    {result.success ? 'Success!' : 'Error'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {result.success 
                      ? `File converted successfully${result.compressionRatio ? ` (${result.compressionRatio.toFixed(1)}% smaller)` : ''}`
                      : result.error}
                  </p>
                  {result.success && result.outputPath && (
                    <button
                      onClick={handleOpenFile}
                      className="mt-4 px-6 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-300 font-medium text-sm transition-all"
                    >
                      📄 Open Converted File
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
