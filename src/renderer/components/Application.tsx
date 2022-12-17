import React from 'react';
import './Application.scss';

import {HashRouter,NavLink,Route, Routes, Navigate} from "react-router-dom";

import AppCarack from "@components/carrack/AppCarrack";
import AppBarter from "@components/barter/AppBarter";
import langDict from '@src/typings/lang';
import dataDict from '@src/typings/data';


// Define the props
type Props = {
  data: dataDict;
}

// Create the component to render
const Application: React.FC<Props> = (props: Props) => {


  // Return the component to render
  return (
    <div id='erwt'>
      
      <HashRouter>
      
        <div id='app'>
          <div id='app-header'>
            <nav>
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/barter">{props.data.lang.navigation[0].barter[0]}</NavLink>
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/carrack">{props.data.lang.navigation[0].carrack[0]}</NavLink>
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
