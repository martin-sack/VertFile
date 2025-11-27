import { app, BrowserWindow } from 'electron';
import path from 'path';
import { setupIPC } from './ipc';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Set icon based on platform
  let iconPath: string | undefined;
  if (process.platform === 'darwin') {
    // macOS uses .icns
    iconPath = path.join(__dirname, '../../build/icon.icns');
  } else if (process.platform === 'win32') {
    // Windows uses .ico
    iconPath = path.join(__dirname, '../../build/icon.ico');
  } else {
    // Linux uses .png
    iconPath = path.join(__dirname, '../../build/icon-linux-512.png');
  }

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#050509',
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'default',
    show: false,
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    // Try to load from Vite dev server
    const viteUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5174';
    mainWindow.loadURL(viteUrl);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  setupIPC();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

export { mainWindow };
