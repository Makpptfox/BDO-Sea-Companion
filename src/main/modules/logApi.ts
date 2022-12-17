import { ipcMain } from 'electron';


export default class logApi {

    constructor(app: Electron.App){
        app.on('ready', this.log.bind(this, 'App ready'));
        app.on('activate', this.log.bind(this, 'App activated'));
        app.on('window-all-closed', this.log.bind(this, 'All windows closed'));

        ipcMain.on('log', this.log.bind(this));
    }


    log(...args: any[]) {
        if (process.env.NODE_ENV == 'development') {
        console.log(...args);
        }
    }
}