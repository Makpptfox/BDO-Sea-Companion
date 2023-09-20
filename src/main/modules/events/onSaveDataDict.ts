import saveData, { stringifySaveData } from "@src/typings/save";
import { saveXmlFileContent } from "../fileManager";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function onSaveDataDict(e: Electron.IpcMainEvent, data: {dict: saveData}): void {

    e.sender.send('save-data-dict', data);
}