import { ipcMain } from "electron";

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
import { findXmlFile } from "./fileManager";
import onAppQuit from "./events/onAppQuit";

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
        
        if (lang_ == null || lang_ == undefined) {
            const settings = findXmlFile('settings')
            lang_ = settings.lang;
        }

        // Get xml lang file
        const lang = findXmlFile('lang/lang_'+lang_);
        const item = findXmlFile('data/item_data');
        const save = findXmlFile('data/save_data');

        return {lang: lang_, langDict: lang, itemDict: item, saveData: save};

    });

    // SAVE DATA EVENT

    ipcMain.on('save-item', async (e: Electron.IpcMainEvent, data: {key: string, value:number, type:"iliya"|"epheria"|"ancado"}) => {
        handleSaveItem(data['key'], data['value'], data['type'], e);
    });

    ipcMain.on('save-misc', async (e: Electron.IpcMainEvent, data: {key: "lastBarter", value:string}) => {
        handleSaveMisc(data['key'], data['value'], e);
    });

    // FUNCTION EVENT

    ipcMain.on('hide-col-barter', async (e: Electron.IpcMainEvent, data: {hide: boolean, type:"iliya"|"epheria"|"ancado"}) => {
        onHideColBarter(e, data);
    });

    ipcMain.on('barterItemSelect', async (e: Electron.IpcMainEvent, data: {icon: string, tier: number, name: string}) => {
        onBarterItemSelect(e, data);
    });

    ipcMain.on('search-barter', async (e: Electron.IpcMainEvent, data: {search: string}) => {
        onSearchBarter(e, data);
    });

    ipcMain.on('total-value', async (e: Electron.IpcMainEvent, data: {value: number}) => {
        onTotalValue(e, data);
    });

    ipcMain.on('threshold-change', async (e: Electron.IpcMainEvent, data: {name: "iliya"|"epheria"|"ancado", value: number}) => {

        handleSaveThreshold(data['name'], data['value']);

        e.sender.send('threshold-change', data);
    });

    ipcMain.on('threshold-warning', async (e: Electron.IpcMainEvent, data: {name: "iliya"|"epheria"|"ancado", value: number}) => {
        onThresholdWarning(e, data);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ipcMain.on('save-data-dict', async (e: Electron.IpcMainEvent, data: {dict: any}) => {
        onSaveDataDict(e, data);
    });

    ipcMain.on('app-quit', async () => {
        onAppQuit();
    });

    ipcMain.on('set-lang', async (e: Electron.IpcMainEvent, data: {lang: string}) => {

        console.log('set-lang', data)

        e.sender.send('set-lang', data);
    });

    

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