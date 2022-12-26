import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@components/window/WindowFrame';
import Application from '@components/Application';

import win_ from '@src/typings/win';
import langDict from '@src/typings/lang';
import itemDict from '@src/typings/item';
import dataDict from '@src/typings/data';
import saveData from '@src/typings/save';
import { barterEventManager } from '@components/barter/barterEventManager';


const log = console.log;
const trace = console.trace;
const debug = console.debug;
const info = console.info;
const warn = console.warn;

// Override console.log to add a prefix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.console.log = function(...args: any[]){

  log('%c[BDOC] :%c'+ args, 'color: #32a852;font-weight: bold', 'color: #ffffff');
}

// Override console.trace to add a prefix and only show in development mode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.console.trace = function(...args: any[]){
  // Trace only if in development mode
  if(process.env.NODE_ENV === 'development'){
    trace('%c[BDOC] :%c'+ args, 'color: #8b32a8;font-weight: bold', 'color: #ffffff');
  }
}

// Override console.debug to add a prefix and only show in development mode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.console.debug = function(...args: any[]){
  // Debug only if in development mode
  if(process.env.NODE_ENV === 'development'){
    debug('%c[BDOC] :%c'+ args, 'color: #5a32a8;font-weight: bold', 'color: #ffffff');
  }
}

// Override console.info to add a prefix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.console.info = function(...args: any[]){
  info('%c[BDOC] :%c'+ args, 'color: #9ba832;font-weight: bold', 'color: #ffffff');
}

// Override console.warn to add a prefix
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.console.warn = function(...args: any[]){
  warn('%c[BDOC] :%c'+ args, 'color: #a85e32;font-weight: bold', 'color: #ffffff');
}

const win:win_ = window;



// const dict:langDict = ;

win.api.invoke('getDataFile').then((data: {lang:string,langDict: {root: langDict}, itemDict: {items: itemDict}, saveData: {data: saveData}}) => {

  console.trace('[BDOC] : Language dictionary received', data)

  const lang:string = data.lang;

  // Get all dictionaries
  const langDict:langDict = data.langDict['root'];
  const itemDict:itemDict = data.itemDict['items'];
  const saveData:saveData = data.saveData['data'];

  // Create a data dictionary to pass to components
  let dataDict: dataDict ={
    lang: langDict,
    item: itemDict,
    save: saveData,
    setProps(lang, item, save) {
      this.lang = lang;
      this.item = item;
      this.save = save;
    },
  }

  win.api.receive('save-data-dict', (data: string) => {
    dataDict = JSON.parse(data);
  });

  console.log('[BDOC] : Language dictionary received');
  console.log('[BDOC] : Language loaded', lang);

  barterEventManager.setLang('appRenderer', lang);

  // If in development mode, trace the language dictionary
  if(process.env.NODE_ENV === 'development'){
    console.log('[BDOC] : Language dictionary', dataDict.lang);
    console.log('[BDOC] : Item dictionary', dataDict.item);
    console.log('[BDOC] : Save data', dataDict.save);
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