import { ipcMain } from "electron";

// Import all events
import onPagechange from "./events/onPageChange";
import { findXmlFile, getXmlFiles } from "./fileManager";

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
        const lang = findXmlFile('lang_'+lang_);

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
}