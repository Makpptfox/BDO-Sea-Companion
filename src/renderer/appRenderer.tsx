import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@components/window/WindowFrame';
import Application from '@components/Application';

import win_ from '@src/typings/win';
import langDict from '@src/typings/lang';
import itemDict from '@src/typings/item';
import dataDict from '@src/typings/data';
import saveData from '@src/typings/save';

const win:win_ = window;

// const dict:langDict = ;

win.api.invoke('getDataFile').then((data: {lang:string,langDict: {root: langDict}, itemDict: {items: itemDict}, saveData: {data: saveData}}) => {

  console.trace('[BDOC] : Language dictionary received', data)

  const lang:string = data.lang;
  const langDict:langDict = data.langDict['root'];
  const itemDict:itemDict = data.itemDict['items'];
  const saveData:saveData = data.saveData['data'];

  const dataDict: dataDict ={
    lang: langDict,
    item: itemDict,
    save: saveData
  }

  console.log('[BDOC] : Language dictionary received');
  console.log('[BDOC] : Language loaded', lang);

  // If in development mode, trace the dictionary
  if(process.env.NODE_ENV === 'development'){
    console.log('[BDOC] : Language dictionary', dataDict.lang);
  }

  // Render application in DOM
  createRoot(document.getElementById('app')).render(app(dataDict));

});

console.log('[ERWT] : Renderer execution started');

// Create a window object
function app(dict: dataDict): React.ReactNode{

  return (
    <WindowFrame data={dict}>
      <Application data={dict} />
    </WindowFrame>
  );
}


win.api.receive('langChange', (lang: string) => {
  console.log('[ERWT] : Language changed to', lang);
})