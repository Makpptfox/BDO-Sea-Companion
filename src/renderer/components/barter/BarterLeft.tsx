import React from 'react';

import dataDict from '@src/typings/data';

import './BarterLeft.scss';
import BarterLeftSelector from './BarterLeftSelector';
import win_ from '@src/typings/win';
import BarterLeftSpecial from './BarterLeftSpecial';
import BarterLeftItem from './BarterLeftItem';
import BarterLeftSearch from './BarterLeftSearch';

const win:win_ = window;

type Props = {
    data: dataDict;
}

const BarterLeft:React.FC<Props> = (props: Props) => {

    const icon = require(`../../../../assets/icons/chest.svg`);
    return(
        <div id='app-barter-left-content'>
            <div id='app-barter-left-content-zone-header'>
                <p>{props.data.lang.barter[0].left[0].storageTitle[0]}</p>
                <img src={icon} />
            </div>
            <div id='app-barter-left-content-zone-selector'>
                <BarterLeftSelector default={true} for="Iliya" onChange={(change:boolean)=>{
                    Object.keys(document.getElementsByClassName('iliya-table-viewer')).forEach((value:string, index:number) => {
                        const element = document.getElementsByClassName('iliya-table-viewer')[index] as HTMLElement;
                        if (!change) {
                            element.style.display = 'none';
                        } else {
                            element.style.display = '';
                        }

                        win.api.send('hide-col-barter', {hide: change, type: 'iliya'});
                    });
                }}/>
                <BarterLeftSelector default={true} for="Epheria" onChange={(change:boolean)=>{
                    Object.keys(document.getElementsByClassName('epheria-table-viewer')).forEach((value:string, index:number) => {
                        const element = document.getElementsByClassName('epheria-table-viewer')[index] as HTMLElement;
                        if (!change) {
                            element.style.display = 'none';
                        } else {
                            element.style.display = '';
                        }

                        win.api.send('hide-col-barter', {hide: change, type: 'epheria'});
                    });
                }} />
                <BarterLeftSelector default={true} for="Ancado" onChange={(change:boolean)=>{
                    Object.keys(document.getElementsByClassName('ancado-table-viewer')).forEach((value:string, index:number) => {
                        const element = document.getElementsByClassName('ancado-table-viewer')[index] as HTMLElement;
                        if (!change) {
                            element.style.display = 'none';
                        } else {
                            element.style.display = '';
                        }

                        win.api.send('hide-col-barter', {hide: change, type: 'ancado'});
                    });
                }} />

            </div>
            <BarterLeftSpecial data={props.data} />
            <BarterLeftItem data={props.data}/>
            <BarterLeftSearch data={props.data} search={''}/>
        </div>
    );
};

export default BarterLeft;