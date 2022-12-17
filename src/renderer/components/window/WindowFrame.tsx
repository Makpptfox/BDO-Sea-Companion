import langDict from "@src/typings/lang";
import win_ from "@src/typings/win";
import React, {useState} from "react";
import WindowControls from "./WindowControls";

import "./WindowFrame.scss"
import dataDict from '@src/typings/data';


type Props = {
    children: React.ReactNode;
    data: dataDict;
}

const win:win_ = window;

/**
 * The window frame component
 * @param Props the props of the component:
 * - children: the react children
 * @returns the react component
 */
const WindowFrame: React.FC<Props> = (props: Props) => {

    // title and icon of the window
    const [titleTag, setTitle] = useState("barter");
    const [_icon, setIcon] = useState("chest");

    const title = props.data.lang['pageTitle'][0][titleTag][0];

    const changeData = (page: string)=>{
    
        // If in development mode, log the page change
        if (process.env.NODE_ENV === 'development'){
            console.log("Page change to: " + page);
        }
    
        // Check the page and change the title and icon
        switch (page) {
            case 'barter':
                setTitle("barter");
                setIcon("chest");
                break;
            case 'carrack':
                setTitle("carrack");
                setIcon("anchor");
                break;
            default:
                setTitle("barter");
                setIcon("chest");
                break;
            }
        
        // Remove the listener and add it again
        win.api.removeAll('pageChange');
        win.api.receiveOnce('pageChange', changeData);
    }

    // Receive the page change event
    win.api.receiveOnce('pageChange', changeData);

    // icon and alt of the icon
    const alt = "icon "+_icon;
    const icon = require(`../../../../assets/icons/${_icon}.svg`);
    

    // Return the react component
    return (
        <div id='window-frame'>
            <div id='window-frame-header'>
                <div id='window-frame-header-title'>
                    <div id='window-frame-header-title-icon'>
                        <img src={icon} alt={alt} />
                    </div>
                    <div id='window-frame-header-title-text'>
                        <h3>{title}</h3>
                    </div>
                </div>
                <div id='window-frame-header-actions'>
                    
                    <WindowControls/>
                </div>
            </div>
            <div id='window-frame-content'>
                {props.children}
            </div>
        </div>
    );
}

// Export the component
export default WindowFrame;