import React from 'react';
import './Application.scss';

import {HashRouter,NavLink,Route, Routes, Navigate} from "react-router-dom";

import AppCarack from "@components/carrack/AppCarrack";
import AppBarter from "@components/barter/AppBarter";
import langDict from '@src/typings/lang';


// Define the props
type Props = {
  dict: langDict;
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
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/barter">Barter</NavLink>
              <NavLink className={({ isActive }) => isActive ? "activeLink" : "link" } to="/carrack">Carrack</NavLink>
            </nav>
          </div>
          <div id='app-content'>
            <Routes>
              <Route path="/" element={<Navigate to="/barter" replace/>}/>
              <Route path="/barter" element={<AppBarter dict={props.dict}/>}/>
              <Route path="/carrack" element={<AppCarack dict={props.dict}/>}/>
            </Routes>
          </div>
        </div>
      
      </HashRouter>
    
    </div>
  );
};

export default Application;
