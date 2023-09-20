import { stringifySaveData } from "@src/typings/save";
import { getXmlFileContent, saveXmlFileContent } from "../fileManager";

export default function handleVersionChange(version_data: any, version_change: string[]){
    
    version_change.forEach((version)=>{

        console.log('Checking version: ' + version);

        const new_data = version_data['versionData'][version];

        if(new_data != undefined) {
            checkSaveDataVersion(new_data, version);
        }


    })

}


/**
 * This function checks if the current save data version is the same as the
 * one in the save data file. If they are different, the function will attempt
 * to update the save data to the current version.
 * 
 * @param {object} version_data The version data from the save data file.
 * @returns {boolean} Returns true if the save data is up to date.
 * @async
 */
function checkSaveDataVersion(version_data: any, version: string): Promise<boolean> {

    if(version_data[0]['save'] == undefined) {
        console.trace('No save data version found.');
    }

    version_data = version_data[0]['save'];

    console.trace(version_data[0]['remove'][0])

    return new Promise((resolve, reject) => {

        console.log('Checking save data version...');

        // Get the current save data
        getXmlFileContent('data/save_data.xml').then((save_data) => {

            save_data = save_data['data'];

            // Remove any keys that need to be removed
            if(version_data[0]['remove'] != undefined) {

                console.log('Removing old save data...');

                Object.keys(version_data[0]['remove'][0]).forEach((remove: any) => {

                    console.log('Checking key: ' + remove);

                    console.trace(save_data);

                    if(Object.keys(version_data[0]['remove'][0][remove]).length == 0) {
                        delete save_data[0][remove];
                    } else {
                        Object.keys(version_data[0]['remove'][0][remove][0]).forEach((key: any) => {

                            console.log('Removing key: ' + key);

                            delete save_data[remove][0][key];
                        });
                    }
                });
            }
            // Add any keys that need to be added
            if(version_data[0]['add'] != undefined) {

                console.log('Adding new save data...');

                Object.keys(version_data[0]['add'][0]).forEach((add: any) => {
                    if(save_data[add] == undefined) {
                        save_data[add] = version_data[0]['add'][0][add][0];
                    } else {
                        Object.keys(version_data[0]['add'][0][add][0]).forEach((key: any) => {

                            console.log('Adding key: ' + key);

                            save_data[add][0][key] = version_data[0]['add'][0][add][0][key];
                        });
                    }
                });
            }

            save_data['version'] = [version.replace('v', '')];

            // Save the new save data by stringifying it
            const save_data_string = stringifySaveData(save_data);

            // Save the new save data
            saveXmlFileContent('data/save_data.xml', save_data_string);
        });
    });
}