// Create a react placeholder

// TODO: Make this react component
import React from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

// Import the stylesheet
import './AppBarter.scss'
import BarterCenter from "./BarterCenter";

const win:win_ = window;

// Define the props
type Props = {

    data: dataDict;

}

const AppBarter:React.FC<Props> = (props: Props) => {

    // Send notification to main process to change page
    win.api.send('pageChange', 'barter');

    // Return the react component
    return(
        <div id='app-barter'>
            
            <div id='app-barter-content'>

                <div id='app-barter-left-content'>

                </div>
                <div id="app-barter-center-content">
                    <BarterCenter data={props.data} />
                </div>
                <div id='app-barter-right-content'>

                </div>

            </div>

            <div id='app-barter-footer'>

            </div>
        
        </div>
    );
};

export default AppBarter;