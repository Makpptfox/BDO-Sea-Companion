import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@components/window/WindowFrame';
import Application from '@components/Application';

import win_ from '@src/typings/win';
import langDict from '@src/typings/lang';

const win:win_ = window;

// const dict:langDict = ;

console.trace(win.api.invoke('getLangFile'))

win.api.invoke('getLangFile').then((data: {lang:string, dict:langDict}) => {

  console.trace('[BDOC] : Language dictionary received', data)

  const lang:string = data.lang;
  const dict:langDict = data.dict;

  console.log('[BDOC] : Language dictionary received');
  console.log('[BDOC] : Language loaded', lang);

  // If in development mode, trace the dictionary
  if(process.env.NODE_ENV === 'development'){
    console.log('[BDOC] : Language dictionary', dict);
  }

  // Render application in DOM
  createRoot(document.getElementById('app')).render(app(dict));

});

console.log('[ERWT] : Renderer execution started');

// Create a window object
function app(dict: langDict): React.ReactNode{
  return (
    <WindowFrame dict={dict}>
      <Application dict={dict}/>
    </WindowFrame>
  );
}

// // Render application in DOM
// createRoot(document.getElementById('app')).render(app());


win.api.receive('langChange', (lang: string, data: langDict) => {
  console.log('[ERWT] : Language changed to', lang);
})