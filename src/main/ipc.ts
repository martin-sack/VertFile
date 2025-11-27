import { ipcMain, dialog, shell, app } from 'electron';
import { mainWindow } from './main';
import { ConversionJob, BatchJobUpdate } from './types';
import * as conversions from './conversions';
import { checkToolAvailability } from './conversions/utils';

export function setupIPC() {
  // File dialogs
  ipcMain.handle('dialog:selectFiles', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'All Files', extensions: ['*'] },
        { name: 'Documents', extensions: ['pdf', 'docx', 'doc', 'pptx', 'ppt', 'txt'] },
        { name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff'] },
      ],
    });
    return result.canceled ? null : result.filePaths;
  });

  ipcMain.handle('dialog:selectFolder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('dialog:selectOutputFolder', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('shell:openFolder', async (_event, folderPath: string) => {
    await shell.openPath(folderPath);
  });

  ipcMain.handle('shell:openFile', async (_event, filePath: string) => {
    if (!filePath) {
      console.error('No file path provided to openFile');
      return;
    }
    
    console.log('Opening file:', filePath);
    
    try {
      const result = await shell.openPath(filePath);
      if (result) {
        // shell.openPath returns a non-empty string on error
        console.error('Failed to open file:', result);
      } else {
        console.log('File opened successfully');
      }
    } catch (error) {
      console.error('Error opening file:', error);
    }
  });

  // Single file conversion
  ipcMain.handle('convert:file', async (_event, job: ConversionJob) => {
    return await conversions.convertFile(job);
  });

  // Batch conversion
  ipcMain.handle('convert:batch', async (_event, jobs: ConversionJob[]) => {
    const maxConcurrent = 3;
    let activeJobs = 0;
    let currentIndex = 0;

    const sendProgress = (update: BatchJobUpdate) => {
      mainWindow?.webContents.send('batch:progress', update);
    };

    const processNext = async () => {
      if (currentIndex >= jobs.length) return;

      const job = jobs[currentIndex];
      currentIndex++;
      activeJobs++;

      sendProgress({
        jobId: job.id,
        status: 'processing',
        progress: 0,
      });

      try {
        const result = await conversions.convertFile(job);

        sendProgress({
          jobId: job.id,
          status: result.success ? 'completed' : 'failed',
          progress: 100,
          error: result.error,
          outputPath: result.outputPath,
        });
      } catch (error) {
        sendProgress({
          jobId: job.id,
          status: 'failed',
          progress: 100,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      activeJobs--;
      if (currentIndex < jobs.length) {
        await processNext();
      }
    };

    // Start initial batch
    const promises = [];
    for (let i = 0; i < Math.min(maxConcurrent, jobs.length); i++) {
      promises.push(processNext());
    }

    await Promise.all(promises);
  });

  // Tool detection
  ipcMain.handle('tools:check', async () => {
    return await checkToolAvailability();
  });

  // Open external URL
  ipcMain.handle('shell:openExternal', async (_event, url: string) => {
    await shell.openExternal(url);
  });

  // Check for updates (placeholder - requires electron-updater setup)
  ipcMain.handle('app:checkUpdates', async () => {
    // TODO: Implement with electron-updater
    // For now, return mock response
    return {
      updateAvailable: false,
      version: app.getVersion(),
    };
  });

  // Get app info
  ipcMain.handle('app:getInfo', async () => {
    return {
      version: app.getVersion(),
      name: app.getName(),
      platform: process.platform,
    };
  });

  // JS-only conversions (no external tools required)
  const jsEngine = require('./conversions/js-engine');

  ipcMain.handle('convert:image-compress', async (_event, inputPath: string, outputPath: string, options: any) => {
    return await jsEngine.compressImage(inputPath, outputPath, options);
  });

  ipcMain.handle('convert:image-to-pdf', async (_event, inputPaths: string[], outputPath: string, options: any) => {
    return await jsEngine.imageToPDF(inputPaths, outputPath, options);
  });

  ipcMain.handle('convert:json-to-csv', async (_event, inputPath: string, outputPath: string, options: any) => {
    return await jsEngine.jsonToCSV(inputPath, outputPath, options);
  });

  ipcMain.handle('convert:csv-to-json', async (_event, inputPath: string, outputPath: string, options: any) => {
    return await jsEngine.csvToJSON(inputPath, outputPath, options);
  });
}
