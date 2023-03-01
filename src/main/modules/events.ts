import { app, ipcMain, IpcMainEvent } from "electron";

// Import all events
import onPagechange from "./events/onPageChange";
import onSaveDataDict from "./events/onSaveDataDict";
import handleSaveItem from "./events/onSaveItem";
import handleSaveMisc from "./events/onSaveMisc";
import handleSaveThreshold from "./events/onSaveThreshold";
import onSearchBarter from "./events/onSearchBarter";
import onThresholdWarning from "./events/onThresholdWarning";
import onTotalValue from "./events/onTotalValue";
import onBarterItemSelect from "./events/onBarterItemSelect";
import onHideColBarter from "./events/onHideColBarter";

// import file manager
import { findXmlFile, getXmlFileContent, saveXmlFileContent } from "./fileManager";
import onAppQuit from "./events/onAppQuit";
import onSaveLang from "./events/onSaveLang";
import mainEventHelper from '../../common/mainEvent';
import handleSaveCarrackItem from "./events/handleSaveCarrackItem";
import tempHelper from "@common/temp";
import fileHelper from "@common/file";
import { settings } from "@src/typings/settings";
import onSetSetting from "./events/onSetSetting";

const eventHelper = mainEventHelper.getInstance();

// Export all events in one function
export function events(){

    // Register page change event
    ipcMain.on('pageChange', (event, page) => {
        onPagechange(page, event);
    });

    ipcMain.handle('getSettings', async () => {
        
        // Get xml setting file
        const setting = findXmlFile('settings');

        return setting;

    });

    ipcMain.handle('getLangFile', async (e: Electron.IpcMainInvokeEvent, lang_: string | null) => {
        
        if (lang_ == null || lang_ == undefined) {
            const settings = findXmlFile('settings')
            lang_ = settings.lang;
        }

        // Get xml lang file
        const lang = findXmlFile('lang/lang_'+lang_);

        return {lang: lang_, dict: lang};

    });

    ipcMain.handle('getDataFile', async (e: Electron.IpcMainInvokeEvent, lang_: string | null) => {
        
        const _settings = findXmlFile('settings') as settings;

        if (lang_ == null || lang_ == undefined) {
            lang_ = _settings.settings.lang[0];
        }

        // Get xml lang file
        const lang = findXmlFile('lang/lang_'+lang_);
        const item = findXmlFile('data/item_data');
        const save = findXmlFile('data/save_data');
        const carrack = findXmlFile('data/carrack_data');
        const update = findXmlFile('update');

        const changelog = JSON.parse(fileHelper.getInstance(app).readFileFromUserdir('changelog.json'));

        return {lang: lang_, langDict: lang, itemDict: item, saveData: save, carrackDict: carrack, settings: _settings, update: update, changelog: changelog};

    });

    // SAVE DATA EVENT

    ipcMain.on('save-item', async (e: Electron.IpcMainEvent, key: string, value:number, type:"iliya"|"epheria"|"ancado") => {
        handleSaveItem(key, value, type, e);
    });

    ipcMain.on('save-misc', async (e: Electron.IpcMainEvent, key: "lastBarter", value:string) => {
        handleSaveMisc(key, value, e);
    });

    mainEventHelper.getInstance().registerCallback('carrack-inventory-save-qty', (e, key: string, value: number) => {
        console.log('carrack-inventory-save-qty', key, value)

        handleSaveCarrackItem(key, value);
    });

    eventHelper.registerCallback('sAskStatusSelector', (e: IpcMainEvent, type: "iliya"|"epheria"|"ancado") => {
        const temp = tempHelper.getInstance();

        if(temp.has('statusSelector-'+type)) {
            e.sender.send('rAskStatusSelector-'+type, temp.get('statusSelector-'+type));
        } else {
            e.sender.send('rAskStatusSelector-'+type, 1);
        }
        
    });

    eventHelper.registerCallback('sStatusSelector', (e: IpcMainEvent, type: 'iliya'|'epheria'|'ancado', status: number) => {
        const temp = tempHelper.getInstance();

        temp.set('statusSelector-'+type, status);
    })

    eventHelper.registerCallback('sSaveInLog', (e: IpcMainEvent, log: string) => {

        const file = fileHelper.getInstance(app);

        const dateFull = new Date(Date.now())

        const date = dateFull.getDay()+"-"+dateFull.getMonth()+"-"+dateFull.getFullYear()

        file.checkFileExists('log/'+date+'.txt').then((exists) => {
            if(exists){
                file.appendFileToUserdir('log/'+date+'.txt', log);
            }
            else{
                file.setFileToUserdir('log/'+date+'.txt', log);
            }
        });
    })

    eventHelper.registerCallback('sCheckUpdate', (e: IpcMainEvent) => {
        const file = fileHelper.getInstance(app);

        file.checkFileExists('update.xml').then((exists) => {
            if(exists){
                const data = file.readFileFromUserdir('update.xml');

                e.sender.send('rCheckUpdate', data);
            }
            else{
                e.sender.send('rCheckUpdate', null);
            }
        });
    })
    // FUNCTION EVENT

    eventHelper.registerCallback('set-setting', (e, data: {key: string, value: string}) => {

        onSetSetting(e, data.key, data.value);
    });

    eventHelper.registerCallback('set-update', (e)=>{
        // This is a function to set the "firstlaunch" property to false

        getXmlFileContent('update.xml').then((content) => {

            console.log(content);

            content.update.firstLaunch[0] = "false";

            saveXmlFileContent('update.xml', JSONToXML(content));
        });

        function JSONToXML(obj: any) {
            let xml = '';
            for (const prop in obj) {
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(prop)) {
                    if (isNaN(Number(prop))) {
                        xml += "<" + prop + ">";
                    }
                    if (typeof obj[prop] == "object") {
                        xml += JSONToXML(new Object(obj[prop]));
                    } else {
                        xml += obj[prop];
                    }
                    if (isNaN(Number(prop))) {
                        xml += "</" + prop + ">";
                    }
                }
            }
            return xml;
        }
    })

    ipcMain.on('hide-col-barter', async (e: Electron.IpcMainEvent, hide: boolean, type:"iliya"|"epheria"|"ancado") => {
        const data = {hide: hide, type: type}
        onHideColBarter(e, data);
    });

    ipcMain.on('barterItemSelect', async (e: Electron.IpcMainEvent, icon: string, tier: number, name: string) => {
        const data = {icon: icon, tier: tier, name: name}
        onBarterItemSelect(e, data);
    });

    ipcMain.on('search-barter', async (e: Electron.IpcMainEvent, search: string) => {
        onSearchBarter(e, search);
    });

    ipcMain.on('total-value', async (e: Electron.IpcMainEvent, value: number) => {
        onTotalValue(e, value);
    });

    ipcMain.on('threshold-change', async (e: Electron.IpcMainEvent, name: string, value: number) => {

        handleSaveThreshold(name, value);

        e.sender.send('threshold-change', name, value);
    });

    ipcMain.on('threshold-warning', async (e: Electron.IpcMainEvent, name: "iliya"|"epheria"|"ancado", value: number) => {

        const data = {name: name, value: value}

        onThresholdWarning(e, data);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ipcMain.on('save-data-dict', async (e: Electron.IpcMainEvent, dict: any) => {
        onSaveDataDict(e, dict);
    });

    ipcMain.on('app-quit', async () => {
        onAppQuit();
    });

    ipcMain.on('set-lang', async (e: Electron.IpcMainEvent, lang: string) => {

        console.log('set-lang', lang)

        onSaveLang(lang);

        e.sender.send('set-lang', lang);
    });

    

    mainEventHelper.getInstance().registerCallback('app-restart', ()=>{
        // if in dev mode, don't do anything and throw an error that explains why it's not working in dev mode
        if (process.env.NODE_ENV === 'development') {
        
            throw new Error('Cannot restart app in development mode, but it\'s working in production mode, so you\'re good!');
            return;
        
        }

        // if not in dev mode, restart the app
        app.relaunch();
        app.exit()
    })

    // DEPRECATED EVENT

    ipcMain.on('check-threshold', async (e: Electron.IpcMainEvent, data: {name: "iliya"|"epheria"|"ancado", value: number}) => {

        console.error('USING DREPRECATED EVENT: check-threshold');

        e.sender.send('check-threshold', data);
    });

    ipcMain.on('ask-check-threshold', async (e: Electron.IpcMainEvent, data: {name: "iliya"|"epheria"|"ancado", value: number}) => {

        console.error('USING DREPRECATED EVENT: ask-check-threshold');

        e.sender.send('ask-check-threshold', data);
    });
}