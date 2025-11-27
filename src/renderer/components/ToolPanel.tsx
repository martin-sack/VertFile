import { useState, useEffect } from 'react';
import { ConversionTool } from '../types';
import path from 'path-browserify';
import { ConversionRecord } from '../types/history';
import ImageEngineHelp from './ImageEngineHelp';
import LibreOfficeHelp from './LibreOfficeHelp';

interface ToolPanelProps {
  tool: ConversionTool;
  onConversionComplete?: (record: Omit<ConversionRecord, 'id' | 'timestamp'>) => void;
}

export default function ToolPanel({ tool, onConversionComplete }: ToolPanelProps) {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [outputFolder, setOutputFolder] = useState<string>('');
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    outputPath?: string;
    outputFiles?: string[];
    errorDetails?: {
      type: string;
      message: string;
      hint: string;
      action?: string;
      reason?: string;
    };
  } | null>(null);
  const [showImageEngineHelp, setShowImageEngineHelp] = useState(false);
  const [showLibreOfficeHelp, setShowLibreOfficeHelp] = useState(false);
  const [showEncryptedPdfOptions, setShowEncryptedPdfOptions] = useState(false);

  // Reset session whenever the tool changes
  useEffect(() => {
    resetSession();
  }, [tool.id]);

  // Reset all form state for a fresh session
  const resetSession = () => {
    setInputFiles([]);
    setOutputFolder('');
    setConverting(false);
    setResult(null);
    setShowImageEngineHelp(false);
    setShowLibreOfficeHelp(false);
    setShowEncryptedPdfOptions(false);
  };

  const handleSelectFiles = async () => {
    if (!window.electronAPI) {
      setResult({ success: false, message: 'Electron API not available. Please run in Electron app.' });
      return;
    }
    const files = await window.electronAPI.selectFiles();
    if (files) {
      setInputFiles(files);
      setResult(null);
    }
  };

  const handleSelectOutputFolder = async () => {
    if (!window.electronAPI) {
      setResult({ success: false, message: 'Electron API not available. Please run in Electron app.' });
      return;
    }
    const folder = await window.electronAPI.selectOutputFolder();
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const handleConvert = async (ignoreEncryption = false) => {
    if (!window.electronAPI) {
      setResult({ success: false, message: 'Electron API not available. Please run in Electron app.' });
      return;
    }

    if (inputFiles.length === 0 || !outputFolder) {
      setResult({ success: false, message: 'Please select input files and output folder' });
      return;
    }

    setConverting(true);
    setResult(null);
    setShowEncryptedPdfOptions(false);

    try {
      let lastOutputPath: string | undefined;
      let lastOutputFiles: string[] | undefined;

      for (const inputFile of inputFiles) {
        const fileName = path.basename(inputFile, path.extname(inputFile));
        const outputPath = path.join(outputFolder, `${fileName}${tool.outputExtension}`);

        const conversionResult = await window.electronAPI.convertFile({
          id: Date.now().toString(),
          inputPath: inputFile,
          outputPath,
          conversionType: tool.conversionType as any,
          options: ignoreEncryption ? { ignoreEncryption: true } : undefined,
        });

        if (!conversionResult.success) {
          // Check if it's an encrypted PDF error
          if (conversionResult.errorDetails?.reason === 'encrypted_pdf' && !ignoreEncryption) {
            setResult({
              success: false,
              message: conversionResult.error || 'Conversion failed',
              errorDetails: conversionResult.errorDetails,
            });
            setShowEncryptedPdfOptions(true);
            setConverting(false);
            return;
          }

          setResult({
            success: false,
            message: conversionResult.error || 'Conversion failed',
            errorDetails: conversionResult.errorDetails,
          });
          setConverting(false);
          return;
        }

        // Store the last successful conversion result
        lastOutputPath = conversionResult.outputPath || outputPath;
        lastOutputFiles = conversionResult.outputFiles;
      }

      // Set final success result
      console.log('Conversion success! Output:', { lastOutputPath, lastOutputFiles });
      setResult({
        success: true,
        message: `Successfully converted ${inputFiles.length} file(s)`,
        outputPath: lastOutputPath,
        outputFiles: lastOutputFiles,
      });
      
      // Record to history
      if (onConversionComplete) {
        onConversionComplete({
          toolId: tool.id,
          toolName: tool.name,
          inputPaths: inputFiles,
          outputPath: outputFolder,
          status: 'success',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult({ success: false, message: errorMessage });
      
      // Record failed conversion to history
      if (onConversionComplete) {
        onConversionComplete({
          toolId: tool.id,
          toolName: tool.name,
          inputPaths: inputFiles,
          outputPath: outputFolder,
          status: 'failed',
          error: errorMessage,
        });
      }
    } finally {
      setConverting(false);
    }
  };

  const handleLoadAnyway = () => {
    handleConvert(true); // Retry with ignoreEncryption = true
  };

  const handleCancelEncrypted = () => {
    setShowEncryptedPdfOptions(false);
    setResult(null);
  };

  const handleOpenOutput = async () => {
    if (!window.electronAPI) {
      console.error('electronAPI not available');
      return;
    }

    try {
      // For multi-file outputs (like PDF → Images), open the folder
      if (result?.outputFiles && result.outputFiles.length > 1) {
        console.log('Opening folder with multiple files:', outputFolder);
        if (outputFolder) {
          await window.electronAPI.openFolder(outputFolder);
        }
        return;
      }

      // For single file outputs, open the file directly
      const fileToOpen = result?.outputPath || result?.outputFiles?.[0];
      console.log('Opening file:', fileToOpen);
      
      if (fileToOpen) {
        await window.electronAPI.openFile(fileToOpen);
      } else if (outputFolder) {
        // Fallback to opening folder if no specific file
        console.log('Fallback: opening folder:', outputFolder);
        await window.electronAPI.openFolder(outputFolder);
      } else {
        console.error('No file or folder to open');
      }
    } catch (error) {
      console.error('Error opening output:', error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Tool Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center text-4xl border border-neon-purple/30 shadow-neon-glow">
            {tool.icon}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gradient">{tool.name}</h2>
            <p className="text-gray-400 mt-1">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* File Drop Zone */}
        <div className="glass-panel rounded-2xl p-6 neon-border">
          <label className="block text-sm font-semibold text-gradient mb-3">Input Files</label>
          <button
            onClick={handleSelectFiles}
            className="group w-full min-h-[120px] rounded-xl border-2 border-dashed border-neon-cyan/30 hover:border-neon-cyan/60 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 hover:from-neon-cyan/10 hover:to-neon-purple/10 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6"
          >
            {inputFiles.length > 0 ? (
              <div className="w-full space-y-2">
                {inputFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg glass-panel">
                    <svg className="w-5 h-5 text-neon-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-gray-300 truncate flex-1">{path.basename(file)}</span>
                    <span className="text-xs text-gray-500">{path.extname(file)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <svg className="w-12 h-12 text-neon-cyan/50 group-hover:text-neon-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-center">
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Click to select files</p>
                  <p className="text-xs text-gray-600 mt-1">or drag and drop here</p>
                </div>
              </>
            )}
          </button>
        </div>

        {/* Output Folder */}
        <div className="glass-panel rounded-2xl p-6 neon-border">
          <label className="block text-sm font-semibold text-gradient mb-3">Output Folder</label>
          <button
            onClick={handleSelectOutputFolder}
            className="w-full p-4 rounded-xl border border-neon-purple/30 hover:border-neon-purple/60 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 transition-all duration-300 text-left flex items-center gap-3"
          >
            <svg className="w-5 h-5 text-neon-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {outputFolder ? (
              <span className="text-gray-300 truncate flex-1">{outputFolder}</span>
            ) : (
              <span className="text-gray-500 flex-1">Click to select output folder...</span>
            )}
          </button>
        </div>

        {/* Convert Button */}
        <button
          onClick={() => handleConvert(false)}
          disabled={converting || inputFiles.length === 0 || !outputFolder}
          className="w-full px-8 py-5 neon-button rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
        >
          {converting && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {converting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Converting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Convert Now
              </>
            )}
          </span>
        </button>

        {/* Result Panel */}
        {result && (
          <div
            className={`glass-panel rounded-2xl p-6 border-2 ${
              result.success
                ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-emerald-500/10'
                : 'border-red-500/50 bg-gradient-to-br from-red-500/10 to-pink-500/10'
            } animate-in fade-in slide-in-from-bottom-4 duration-300`}
          >
            <div className="flex items-start gap-3">
              {result.success ? (
                <svg
                  className="w-6 h-6 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-red-400 flex-shrink-0 animate-shake"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <div className="flex-1">
                <p className={`font-semibold ${result.success ? 'text-green-300' : 'text-red-300'}`}>
                  {result.success ? 'Success!' : result.errorDetails?.message || 'Error'}
                </p>
                <p className={`text-sm mt-1 ${result.success ? 'text-green-400/80' : 'text-red-400/80'}`}>
                  {result.success ? result.message : result.errorDetails?.hint || result.message}
                </p>
                {!result.success && result.errorDetails?.action && (
                  <div className="mt-3 pt-3 border-t border-red-500/20">
                    <p className="text-xs font-medium text-red-300 mb-1">💡 How to fix:</p>
                    <p className="text-xs text-red-400/90">{result.errorDetails.action}</p>
                  </div>
                )}
                
                {/* Special handling for PDF → Images missing tools or no images generated */}
                {!result.success && 
                 (result.errorDetails?.message === 'ImageMagick or Poppler not found' ||
                  result.errorDetails?.message === 'No images generated' ||
                  result.errorDetails?.reason === 'no_images_generated') && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowImageEngineHelp(!showImageEngineHelp)}
                      className="text-xs text-red-400 hover:text-red-300 underline flex items-center gap-1"
                    >
                      {showImageEngineHelp ? 'Hide details' : 'Learn more'}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={showImageEngineHelp ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                        />
                      </svg>
                    </button>
                    <ImageEngineHelp isVisible={showImageEngineHelp} />
                  </div>
                )}

                {/* Special handling for LibreOffice missing */}
                {!result.success && 
                 result.errorDetails?.message === 'LibreOffice not found' && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowLibreOfficeHelp(!showLibreOfficeHelp)}
                      className="text-xs text-red-400 hover:text-red-300 underline flex items-center gap-1"
                    >
                      {showLibreOfficeHelp ? 'Hide details' : 'Learn more'}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={showLibreOfficeHelp ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                        />
                      </svg>
                    </button>
                    <LibreOfficeHelp isVisible={showLibreOfficeHelp} />
                  </div>
                )}

                {/* Special handling for encrypted PDFs */}
                {!result.success && showEncryptedPdfOptions && result.errorDetails?.reason === 'encrypted_pdf' && (
                  <div className="mt-4 pt-4 border-t border-red-500/20 space-y-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-300">Encrypted PDF Detected</p>
                        <p className="text-xs text-yellow-400/80 mt-1">
                          This PDF is encrypted. You can try loading it anyway, but some features may not work correctly.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleLoadAnyway}
                        disabled={converting}
                        className="flex-1 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg text-yellow-300 font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {converting ? 'Loading...' : 'Load Anyway'}
                      </button>
                      <button
                        onClick={handleCancelEncrypted}
                        className="px-4 py-2 text-red-400/80 hover:text-red-300 text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Password required message */}
                {!result.success && result.errorDetails?.reason === 'password_required' && (
                  <div className="mt-4 pt-4 border-t border-red-500/20">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-300">Password Protected</p>
                        <p className="text-xs text-red-400/80 mt-1">
                          This PDF requires a password. Password entry is not yet supported. Please remove the password protection and try again.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Open Output Button */}
        {result?.success && (result?.outputPath || result?.outputFiles || outputFolder) && (
          <button
            onClick={handleOpenOutput}
            className="w-full px-6 py-4 glass-panel rounded-xl hover:shadow-neon-cyan transition-all duration-300 flex items-center justify-center gap-2 text-neon-cyan border border-neon-cyan/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {result?.outputFiles && result.outputFiles.length > 1 ? (
                // Folder icon for multiple files
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              ) : (
                // File icon for single file
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              )}
            </svg>
            {result?.outputFiles && result.outputFiles.length > 1 
              ? 'Open Output Folder' 
              : 'Open Converted File'}
          </button>
        )}
      </div>
    </div>
  );
}
