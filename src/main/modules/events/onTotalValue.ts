
export default function onTotalValue(e: Electron.IpcMainEvent, data: {value: number}): void {
    e.sender.send('total-value', data);
}