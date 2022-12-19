// Create a react placeholder

// TODO: Make this react component
import React from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

// Import the stylesheet
import './AppBarter.scss'
import BarterCenter from "./BarterCenter";
import BarterLeft from "./BarterLeft";
import BarterRight from "./BarterRight";

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

                <BarterLeft data={props.data} />
                <BarterCenter data={props.data} />
                <BarterRight onClick={(tier: number, hide:boolean) => {
                    Object.keys(document.getElementsByClassName('tier-' + tier)).forEach((value:string, index:number) => {
                        const element = document.getElementsByClassName('tier-' + tier)[index] as HTMLElement;
                        if (hide) {
                            element.style.display = '';
                        } else {
                            element.style.display = 'none';
                        }
                    });
                }} />

            </div>

            <div id='app-barter-footer'>

            </div>
        
        </div>
    );
};

export default AppBarter;