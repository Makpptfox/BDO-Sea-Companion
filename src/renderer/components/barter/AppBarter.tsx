// Create a react placeholder

// TODO: Make this react component
import React from "react";

import langDict from "@src/typings/lang";
import win_ from "@src/typings/win";

// Import the stylesheet
import './AppBarter.scss'

const win:win_ = window;

// Define the props
type Props = {

    dict: langDict;

}

const AppBarter:React.FC<Props> = (props: Props) => {

    // Send notification to main process to change page
    win.api.send('pageChange', 'barter');

    // Return the react component
    return(
        <div id='app-barter'>
        <h3>Barter</h3>
        </div>
    );
};

export default AppBarter;