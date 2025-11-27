import { useState, useEffect } from 'react';
import { BatchJob } from '../types';
import { tools } from '../data/tools';
import path from 'path-browserify';

export default function BatchPanel() {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [inputFolder, setInputFolder] = useState<string>('');
  const [outputFolder, setOutputFolder] = useState<string>('');
  const [jobs, setJobs] = useState<BatchJob[]>([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onBatchProgress((update) => {
        setJobs((prev) =>
          prev.map((job) =>
            job.id === update.jobId
              ? { ...job, status: update.status, progress: update.progress, error: update.error }
              : job
          )
        );
      });

      return () => {
        window.electronAPI.removeBatchProgressListener();
      };
    }
  }, []);

  const handleSelectInputFolder = async () => {
    if (!window.electronAPI) return;
    const folder = await window.electronAPI.selectFolder();
    if (folder) {
      setInputFolder(folder);
    }
  };

  const handleSelectOutputFolder = async () => {
    if (!window.electronAPI) return;
    const folder = await window.electronAPI.selectOutputFolder();
    if (folder) {
      setOutputFolder(folder);
    }
  };

  const handleStartBatch = async () => {
    if (!window.electronAPI || !inputFolder || !outputFolder) return;

    setProcessing(true);

    // Create mock jobs (in production, you'd scan the folder)
    const mockJobs: BatchJob[] = [
      {
        id: '1',
        fileName: 'document1.pdf',
        inputPath: path.join(inputFolder, 'document1.pdf'),
        outputPath: path.join(outputFolder, `document1${selectedTool.outputExtension}`),
        status: 'pending',
        progress: 0,
      },
    ];

    setJobs(mockJobs);

    const conversionJobs = mockJobs.map((job) => ({
      id: job.id,
      inputPath: job.inputPath,
      outputPath: job.outputPath,
      conversionType: selectedTool.conversionType,
    }));

    await window.electronAPI.startBatchConversion(conversionJobs);
    setProcessing(false);
  };

  const completedCount = jobs.filter((j) => j.status === 'completed').length;
  const failedCount = jobs.filter((j) => j.status === 'failed').length;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Batch Conversion</h2>
        <p className="text-gray-400">Convert multiple files at once</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Conversion Type</label>
          <select
            value={selectedTool.id}
            onChange={(e) => setSelectedTool(tools.find((t) => t.id === e.target.value)!)}
            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:border-purple-500/50 focus:outline-none"
          >
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Input Folder</label>
          <button
            onClick={handleSelectInputFolder}
            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-purple-500/50 transition-colors text-left"
          >
            {inputFolder ? (
              <span className="text-gray-300 truncate block">{inputFolder}</span>
            ) : (
              <span className="text-gray-500">Click to select input folder...</span>
            )}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Output Folder</label>
          <button
            onClick={handleSelectOutputFolder}
            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg hover:border-purple-500/50 transition-colors text-left"
          >
            {outputFolder ? (
              <span className="text-gray-300 truncate block">{outputFolder}</span>
            ) : (
              <span className="text-gray-500">Click to select output folder...</span>
            )}
          </button>
        </div>

        <button
          onClick={handleStartBatch}
          disabled={processing || !inputFolder || !outputFolder}
          className="w-full px-6 py-4 bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Start Batch Conversion'}
        </button>

        {jobs.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Jobs</h3>
              <div className="text-sm text-gray-400">
                {completedCount} completed, {failedCount} failed, {jobs.length} total
              </div>
            </div>
            <div className="space-y-2">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-dark-card border border-dark-border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{job.fileName}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        job.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : job.status === 'failed'
                          ? 'bg-red-500/20 text-red-300'
                          : job.status === 'processing'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  {job.status === 'processing' && (
                    <div className="w-full bg-dark-border rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                  {job.error && <div className="text-sm text-red-400 mt-2">{job.error}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
