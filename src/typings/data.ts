import langDict from '@src/typings/lang';
import itemDict from '@src/typings/item';
import saveData from '@src/typings/save';
import carrackDict from '@src/typings/carrack';

type dataDict = {
    lang: langDict;
    item: itemDict;
    save: saveData;
    carrack: carrackDict;
    setProps: (lang: langDict, item: itemDict, save: saveData, carrack: carrackDict) => void;
}

export default dataDict;