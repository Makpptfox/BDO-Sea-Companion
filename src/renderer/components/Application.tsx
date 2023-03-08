import React from 'react';
import './Application.scss';

import {HashRouter,NavLink,Route, Routes, Navigate} from "react-router-dom";

import AppCarack from "@components/carrack/AppCarrack";
import AppBarter from "@components/barter/AppBarter";
import dataDict from '@src/typings/data';
import LangPage from './lang_page/lang_page';
import SettingTier from './setting-tier/settingTier';
import ChangeLog from './changeLog/changelog';
import subEventHelper from '../../common/subEvent';
import Advice from './advice/advice';


// Define the props
type Props = {
  data: dataDict;
}

// Create the component to render
const Application: React.FC<Props> = (props: Props) => {



  document.addEventListener('dragover', (event) => {
    event.preventDefault();
    return false;
  }, false);

  document.addEventListener("drop", (e: any) => {
    e.preventDefault();
  });

  document.addEventListener("dragenter", (e: any) => {
    e.preventDefault();
    // Change the cursor 
    e.dataTransfer.dropEffect = "move";
  });
  // Return the component to render
  return (
    <div id='erwt'>
      <LangPage data={props.data}/>
      <SettingTier data={props.data}/>
      <ChangeLog changelog={props.data.changelog} update={props.data.update}/>
      
      <HashRouter>
      
        <div id='app'>
          <div id='app-header'>
            <nav>
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/barter">{props.data.lang.navigation[0].barter[0]}</NavLink>
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/carrack">{props.data.lang.navigation[0].carrack[0]}</NavLink>
              <Advice/>
            </nav>
          </div>
          <div id='app-content'>
            <Routes>
              <Route path="/" element={<Navigate to="/barter" replace/>}/>
              <Route path="/barter" element={<AppBarter data={props.data}/>}/>
              <Route path="/carrack" element={<AppCarack data={props.data}/>}/>
            </Routes>
          </div>
        </div>
      
      </HashRouter>
    
    </div>
  );
};

export default Application;
