import { contextBridge, ipcRenderer } from 'electron';
import { ConversionJob, ConversionResult, BatchJobUpdate } from './types';

contextBridge.exposeInMainWorld('electronAPI', {
  // File dialogs
  selectFiles: () => ipcRenderer.invoke('dialog:selectFiles'),
  selectFolder: () => ipcRenderer.invoke('dialog:selectFolder'),
  selectOutputFolder: () => ipcRenderer.invoke('dialog:selectOutputFolder'),
  openFolder: (folderPath: string) => ipcRenderer.invoke('shell:openFolder', folderPath),
  openFile: (filePath: string) => ipcRenderer.invoke('shell:openFile', filePath),

  // Single conversions
  convertFile: (job: ConversionJob) => ipcRenderer.invoke('convert:file', job),

  // Batch conversions
  startBatchConversion: (jobs: ConversionJob[]) => ipcRenderer.invoke('convert:batch', jobs),
  onBatchProgress: (callback: (update: BatchJobUpdate) => void) => {
    ipcRenderer.on('batch:progress', (_event, update) => callback(update));
  },
  removeBatchProgressListener: () => {
    ipcRenderer.removeAllListeners('batch:progress');
  },

  // Tool detection
  checkTools: () => ipcRenderer.invoke('tools:check'),

  // App actions
  openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url),
  checkUpdates: () => ipcRenderer.invoke('app:checkUpdates'),
  getAppInfo: () => ipcRenderer.invoke('app:getInfo'),

  // JS-only conversions
  compressImage: (inputPath: string, outputPath: string, options?: any) =>
    ipcRenderer.invoke('convert:image-compress', inputPath, outputPath, options),
  imageToPDF: (inputPaths: string[], outputPath: string, options?: any) =>
    ipcRenderer.invoke('convert:image-to-pdf', inputPaths, outputPath, options),
  jsonToCSV: (inputPath: string, outputPath: string, options?: any) =>
    ipcRenderer.invoke('convert:json-to-csv', inputPath, outputPath, options),
  csvToJSON: (inputPath: string, outputPath: string, options?: any) =>
    ipcRenderer.invoke('convert:csv-to-json', inputPath, outputPath, options),
});

export type ElectronAPI = {
  selectFiles: () => Promise<string[] | null>;
  selectFolder: () => Promise<string | null>;
  selectOutputFolder: () => Promise<string | null>;
  openFolder: (folderPath: string) => Promise<void>;
  openFile: (filePath: string) => Promise<void>;
  convertFile: (job: ConversionJob) => Promise<ConversionResult>;
  startBatchConversion: (jobs: ConversionJob[]) => Promise<void>;
  onBatchProgress: (callback: (update: BatchJobUpdate) => void) => void;
  removeBatchProgressListener: () => void;
  checkTools: () => Promise<{ pandoc: boolean; libreoffice: boolean }>;
  openExternal: (url: string) => Promise<void>;
  checkUpdates: () => Promise<{ updateAvailable: boolean; version: string }>;
  getAppInfo: () => Promise<{ version: string; name: string; platform: string }>;
  // JS-only conversions
  compressImage: (inputPath: string, outputPath: string, options?: any) => Promise<any>;
  imageToPDF: (inputPaths: string[], outputPath: string, options?: any) => Promise<any>;
  jsonToCSV: (inputPath: string, outputPath: string, options?: any) => Promise<any>;
  csvToJSON: (inputPath: string, outputPath: string, options?: any) => Promise<any>;
};
