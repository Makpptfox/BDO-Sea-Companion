
export default function onSearchBarter(e: Electron.IpcMainEvent, data: {search: string}): void {
    e.sender.send('search-barter', data);
}