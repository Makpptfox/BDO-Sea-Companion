/* eslint-disable @typescript-eslint/no-explicit-any */

import langDict from '@src/typings/lang';
import itemDict from '@src/typings/item';
import saveData from '@src/typings/save';

/**
 * The channel object that is sent to the main process
 */
type channel = {
    "langChange": (event: any, lang: string) => void;
    "getDataFile": (event: any, lang: string) => void;
    "pageChange": (event: any, page: string) => void;
}

/**
 * The event object that is sent to the renderer process
 */
type channelEvent = {
    "langChange": {
        lang: string;
        dict: langDict;
    },
    "getDataFile": {
        lang: string;
        langDict:{
            root: langDict;
        }
        itemDict:{
            items: itemDict;
        },
        saveData:{
            data: saveData;
        },
    },
    "pageChange": {
        page: string;
    }
}

/**
 * The window object with the `api` property added
 */
type win_ = Window & {
    /**
     * The `api` property added to the window object to communicate with
     * the main process using the `ipcRenderer` and `ipcMain` modules of Electron
     * @property {Object} api the api object
     * @property {Function} api.send send data to main process
     * @property {Function} api.receive receive data from main process
     * @property {Function} api.receiveOnce receive data from main process once
     * @property {Function} api.invoke invoke a function in the main process and return the result to the renderer process
     * @property {Function} api.remove remove a listener from a channel
     * @property {Function} api.removeAll remove all listeners from a channel
     * @example
     * // Send data to main process
     * window.api.send('channel', data);
     * // Receive data from main process
     * window.api.receive('channel', (event, ...args) => {
     *  // do something
     * });
     * // Receive data from main process once
     * window.api.receiveOnce('channel', (event, ...args) => {
     * // do something
     * });
     * // Invoke a function in the main process and return the result to the renderer process
     * window.api.invoke('channel', data).then(result => {
     * // do something
     * });
     * // Remove a listener from a channel
     * window.api.remove('channel', listener);
     * // Remove all listeners from a channel
     * window.api.removeAll('channel');
     * 
     * @see https://www.electronjs.org/docs/api/ipc-renderer
     * @see https://www.electronjs.org/docs/api/ipc-main
     * @see https://www.electronjs.org/docs/api/context-bridge
     * 
     */
    api?: {
        /**
         * Send data to main process
         * @param channel the channel to send data to
         * @param data the data to send
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendchannel-args
         */
        send: (channel: string, data?: any) => void;

        /**
         * Send data to main process and wait for a response
         * @param channel the channel to send data to
         * @param data the data to send
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrenderersendsyncchannel-args
         */
        sendSync: (channel: string, data?: any) => void;
        /**
         * Receive data from main process
         * @param channel the channel to receive data from
         * @param func the function to execute when data is received
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereronchannel-listener
         */
        receive<K extends keyof channel>(channel: K, func: (event: any, args: channelEvent[K]) => void): void;
        /**
         * Receive data from main process once
         * @param channel the channel to receive data from
         * @param func the function to execute when data is received
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendereroncesyncchannel-listener
         */

        receiveOnce<K extends keyof channel>(channel: K, func: (event: any, args: channelEvent[K]) => void): void;
        /**
         * Invoke a function in the main process and return the result to the renderer process
         * @param channel the channel to invoke the function in the main process
         * @param data the data to send to the main process
         * @returns `Promise<any>` the result of the function in the main process
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererinvokechannel-args
         */
        invoke<K extends keyof channel>(channel: K, data?: any): Promise<channelEvent[K]>;
        /**
         * Remove a listener from a channel
         * @param channel the channel to remove the listener from
         * @param func the function to remove
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovechannel-listener
         */
        remove: (channel: string, func: (event: any, ...args: any[]) => void) => void;
        /**
         * Remove all listeners from a channel
         * @param channel the channel to remove all listeners from
         * @returns void
         * @see https://www.electronjs.org/docs/api/ipc-renderer#ipcrendererremovealllistenerschannel
         */
        removeAll: (channel: string) => void;
    }
}
export default win_;