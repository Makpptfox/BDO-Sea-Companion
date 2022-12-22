import { app, BrowserWindow } from 'electron';
import path from 'path';
import { events } from './modules/events';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => {
    appWindow.show()
  });

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  process.on('warning', e => console.warn(e.stack));

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */

  events()
}


