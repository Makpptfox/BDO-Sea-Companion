import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import { events } from './modules/events';
import fs from 'fs';
import { eventSystem } from './modules/eventSystem';
import { templateCheck } from './modules/templateChecker';
import mainEventHelper from '@common/mainEvent';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const UPDATE_WINDOW_WEBPACK_ENTRY: string;
declare const UPDATE_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Check if the data files exist
 * If not, create them
 * If they do, delete the ones in the resources folder
 * @returns {void}
 */
function checkDataFiles() {

  // If in development, don't do anything with the data files
  // This is because the data files are in the assets folder not the resources folder
  if(process.env.NODE_ENV === 'development'){
    return;
  }

  // Check if the data files exist
  // If not, create them

  const userDataPath = app.getPath('userData');

  const resources = process.resourcesPath;

  const xmlFolder = path.join(userDataPath, 'xml');
  const dataFolder = path.join(xmlFolder, 'data');
  const langFolder = path.join(xmlFolder, 'lang');
  const templateFolder = path.join(userDataPath, 'templates');

  if(!fs.existsSync(xmlFolder)){
    fs.mkdirSync(xmlFolder);
    fs.mkdirSync(dataFolder);
    fs.mkdirSync(langFolder);
    fs.mkdirSync(templateFolder);
  }

  // Check if the save data exists in the user data folder
  // eslint-disable-next-line no-constant-condition
  if(fs.existsSync(path.join(dataFolder, 'save_data.xml'))){
    // If it does, delete the one in the resources folder
    console.log('Save data exists');
    if(fs.existsSync(path.join(resources, 'save_data.xml'))){
      fs.rmSync(path.join(resources, 'save_data.xml'));
    }
  } else {

    if(!fs.existsSync(path.join(dataFolder, 'save_data.xml'))){

      // If it doesn't, copy the one in the resources folder to the user data folder then delete it from the resources folder
      console.log('Save data does not exist');
      fs.copyFileSync(path.join(resources, 'save_data.xml'), path.join(dataFolder, 'save_data.xml'));
      
      if(fs.existsSync(path.join(resources, 'save_data.xml'))){
        fs.rmSync(path.join(resources, 'save_data.xml'));
      }
    }
  }

  // Check if the settings data exists in the user data folder
  if(fs.existsSync(path.join(xmlFolder, 'settings.xml'))){
    // If it does, delete the one in the resources folder
    console.log('Settings data exists');
    if(fs.existsSync(path.join(resources, 'settings.xml'))){
      fs.rmSync(path.join(resources, 'settings.xml'));
    }
  } else {
    // If it doesn't, copy the one in the resources folder to the user data folder then delete it from the resources folder
    console.log('Settings data does not exist');
    if(fs.existsSync(path.join(resources, 'settings.xml'))){
      fs.copyFileSync(path.join(resources, 'settings.xml'), path.join(xmlFolder, 'settings.xml'));
      fs.rmSync(path.join(resources, 'settings.xml'));
    }
  }

  // Check if the item data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'item_data.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'item_data.xml'), path.join(dataFolder, 'item_data.xml'));
    fs.rmSync(path.join(resources, 'item_data.xml'));
  }

  // Check if the lang_fr data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'lang_fr.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'lang_fr.xml'), path.join(langFolder, 'lang_fr.xml'));
    fs.rmSync(path.join(resources, 'lang_fr.xml'));
  }

  // Check if the lang_en data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'lang_en.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'lang_en.xml'), path.join(langFolder, 'lang_en.xml'));
    fs.rmSync(path.join(resources, 'lang_en.xml'));
  }

  // Check if the carrack data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'carrack_data.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'carrack_data.xml'), path.join(dataFolder, 'carrack_data.xml'));
    fs.rmSync(path.join(resources, 'carrack_data.xml'));
  }

  if(fs.existsSync(path.join(resources, 'carrack_data.json'))){

    // It's the first object that need the "template" folder, so we need to check if it's exist, and if not, create it
    if(!fs.existsSync(templateFolder)){
      fs.mkdirSync(templateFolder);
    }

    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'carrack_data.json'), path.join(templateFolder, 'carrack_data.json'));
    fs.rmSync(path.join(resources, 'carrack_data.json'));
  }

  if(fs.existsSync(path.join(resources, 'settings.json'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'settings.json'), path.join(templateFolder, 'settings.json'));
    fs.rmSync(path.join(resources, 'settings.json'));
  }

  if(fs.existsSync(path.join(resources, 'item_data.json'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'item_data.json'), path.join(templateFolder, 'item_data.json'));
    fs.rmSync(path.join(resources, 'item_data.json'));
  }

  if(fs.existsSync(path.join(resources, 'changelog.json'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'changelog.json'), path.join(xmlFolder, 'changelog.json'));
    fs.rmSync(path.join(resources, 'changelog.json'));
  }

  if(fs.existsSync(path.join(resources, 'update.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'update.xml'), path.join(xmlFolder, 'update.xml'));
    fs.rmSync(path.join(resources, 'update.xml'));
  }
}

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(updateWindow: BrowserWindow): BrowserWindow {
  
  eventSystem.getInstance().addEvent('app-maximize');

  // Create new window instance
  appWindow = new BrowserWindow({
    width: 1100,
    height: 900,
    minWidth: 1100,
    minHeight: 900,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
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

    eventSystem.getInstance().linkToEvent((e, {maximize})=>{

      console.log(maximize ? 'Maximize window' : 'Unmaximize window')

      const ev = e as IpcMainEvent;

      if(appWindow.isMaximized()){
        appWindow.unmaximize();
        ev.sender.send('app-maximize-reply', false);
      } else {
        appWindow.maximize();
        ev.sender.send('app-maximize-reply', true);
      }
    }, 'app-maximize', 'appWindow');

    mainEventHelper.getInstance().registerCallback('app-hide', () => {
      appWindow.minimize();
    });

    if(!updateWindow.isDestroyed()) updateWindow.close();
  });

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  process.on('warning', e => console.warn(e.stack));


  return appWindow;
}

export function createUpdateWindow(autoUpdater: any): BrowserWindow {

  // Create new window instance
  let updateWindow = new BrowserWindow({
    width: 350,
    height: 400,
    minWidth: 350,
    minHeight: 400,
    backgroundColor: '#000',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: UPDATE_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  updateWindow.loadURL(UPDATE_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  updateWindow.on('ready-to-show', () => {
    updateWindow.show()

    // Check the template with the app version
    templateCheck(app.getVersion());
  
    // Check if the data files exist
    checkDataFiles();
  
    // Register Inter Process Communication for main process
    registerMainIPC();

    if(process.env.NODE_ENV !== 'development'){
      autoUpdater.checkForUpdates();
    }
  });

  autoUpdater.on('update-downloaded', () => {
    updateWindow.webContents.send('update-downloaded');
  });

  autoUpdater.on('update-not-available', () => {
    updateWindow.webContents.send('update-not-available');
  });

  autoUpdater.on('error', () => {
    updateWindow.webContents.send('error');
  });

  // Close all windows when main window is closed
  updateWindow.on('close', () => {
    updateWindow = null;
  });

  process.on('warning', e => console.warn(e.stack));

  return updateWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */

  events(appWindow);
}


