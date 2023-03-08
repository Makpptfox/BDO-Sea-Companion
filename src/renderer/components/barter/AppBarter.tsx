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
import BarterBottom from "./BarterBottom";
import subEventHelper from "@common/subEvent";

const win:win_ = window;

// Define the props
type Props = {

    data: dataDict;

}

const AppBarter:React.FC<Props> = (props: Props) => {

    // Check each item in the save data
    Object.keys(props.data.item).forEach((value:string) => {

        if(props.data.save.items[0][value] == undefined) {
            props.data.save.items[0][value] = [{
                'qty': ['0'],
                'ancado': ['0'],
                'epheria': ['0'],
                'iliya': ['0']
            }];
        }
        subEventHelper.getInstance().send('save-item', value, parseInt(props.data.save.items[0][value][0].ancado[0]), 'ancado')
        subEventHelper.getInstance().send('save-item', value, parseInt(props.data.save.items[0][value][0].epheria[0]), 'epheria')
        subEventHelper.getInstance().send('save-item', value, parseInt(props.data.save.items[0][value][0].iliya[0]), 'iliya')

    });

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

                            subEventHelper.getInstance().send('set-setting', {key: 'hideTier' + tier, value: false})
                        } else {
                            element.style.display = 'none';
                            subEventHelper.getInstance().send('set-setting', {key: 'hideTier' + tier, value: true})
                        }
                    });
                }} />

            </div>

            <div id='app-barter-footer'>
                <BarterBottom data={props.data} />
            </div>
        
        </div>
    );
};

export default AppBarter;