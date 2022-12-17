

// Create a react placeholder
import React from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

const win:win_ = window;

// Define the props
type Props = {
    data: dataDict;
}

const AppCarack: React.FC<Props> = (props: Props) => {

    // Send notification to main process to change page
    win.api.send('pageChange', 'carrack');

    // Return the react component
    return(
        <div id='app-carrack'>
            <h3>Carrack</h3>
        </div>
    );
};

export default AppCarack;