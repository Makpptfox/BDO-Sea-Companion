import langDict from '@src/typings/lang';
import itemDict from '@src/typings/item';
import saveData from '@src/typings/save';

type dataDict = {
    lang: langDict;
    item: itemDict;
    save: saveData;
    setProps: (lang: langDict, item: itemDict, save: saveData) => void;
}

export default dataDict;