import { getXmlFileContent, saveXmlFileContent } from "../fileManager";


export default function onSaveLang(lang: string) {
    // Get xml setting file
    const setting = getXmlFileContent('settings');

    // Update lang
    setting.lang = lang;

    const toSend = JSONToXML(setting);

    // Save xml setting file
    saveXmlFileContent('settings', toSend);
}

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