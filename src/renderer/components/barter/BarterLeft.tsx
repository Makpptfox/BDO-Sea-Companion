import React, { useEffect } from 'react';

import dataDict from '@src/typings/data';

import './BarterLeft.scss';
import BarterLeftSelector from './BarterLeftSelector';
import win_ from '@src/typings/win';
import BarterLeftSpecial from './BarterLeftSpecial';
import BarterLeftItem from './BarterLeftItem';
import BarterLeftSearch from './BarterLeftSearch';
import subEventHelper from '@common/subEvent';

const win:win_ = window;

type Props = {
    data: dataDict;
}

let doOnce = (setIliya: any, setEpheria: any, setAncado: any) => {
    doOnce = ()=>{return null}


    const parent = document.getElementsByTagName('tbody')[0].children

    for (let i = 0; i < parent.length; i++) {
        const targets = parent[i].children
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i] as HTMLTableCellElement;
            if(target.classList.contains('iliya-table-viewer')) {
                if (target.classList.contains('warning-thresold')) {
                    setIliya(true)
                }
            } else if (target.classList.contains('epheria-table-viewer')) {
                if (target.classList.contains('warning-thresold')) {
                    setEpheria(true)
                }
            } else if (target.classList.contains('ancado-table-viewer')) {
                if (target.classList.contains('warning-thresold')) {
                    setAncado(true)
                }
            }
        }
    }

}

const BarterLeft:React.FC<Props> = (props: Props) => {

    const [iliya, setIliya] = React.useState(false);
    const [epheria, setEpheria] = React.useState(false);
    const [ancado, setAncado] = React.useState(false);    

    const [iliyaSelector, setIliyaSelector] = React.useState(<p>Loading...</p>);
    const [epheriaSelector, setEpheriaSelector] = React.useState(<p>Loading...</p>);
    const [ancadoSelector, setAncadoSelector] = React.useState(<p>Loading...</p>);
    
    let iliyaTable:boolean[] = []
    let epheriaTable:boolean[] = []
    let ancadoTable:boolean[] = []


    setTimeout(() => {
        doOnce(setIliya, setEpheria, setAncado);
    }, 150);

    // Check change of in class of the element with MutationObserver and set the state accordingly
    const observer = new MutationObserver(async (mutations) => {
        iliyaTable = []
        epheriaTable = []
        ancadoTable = []
        await mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'class') {
                    const parent = mutation.target.parentElement.parentElement as HTMLTableElement;
                    for (let i = 0; i < parent.children.length; i++) {
                        const targets = parent.children[i] as HTMLTableRowElement;
                        for (let i = 0; i < targets.children.length; i++) {
                            const target = targets.children[i] as HTMLTableCellElement;

                            if(target.classList.contains('iliya-table-viewer')) {
                                if (target.classList.contains('warning-thresold')) {
                                    iliyaTable.push(false)
                                } else {
                                    iliyaTable.push(true)
                                }
                            }
                            if(target.classList.contains('epheria-table-viewer')) {
                                if (target.classList.contains('warning-thresold')) {
                                    epheriaTable.push(false)
                                } else {
                                    epheriaTable.push(true)
                                }
                            }
                            if(target.classList.contains('ancado-table-viewer')) {
                                if (target.classList.contains('warning-thresold')) {
                                    ancadoTable.push(false)
                                } else {
                                    ancadoTable.push(true)
                                }
                            }
                        }
                    }
                }
            }
        });
        

        if (iliyaTable.length > 0) {
            if(iliyaTable.includes(false)) {
                setIliya(true);
            } else {
                setIliya(false);
            }
        }
        if (epheriaTable.length > 0) {
            if(epheriaTable.includes(false)) {
                setEpheria(true);
            } else {
                setEpheria(false);
            }
        }
        if (ancadoTable.length > 0) {
            if(ancadoTable.includes(false)) {
                setAncado(true);
            } else {
                setAncado(false);
            }
        }

    });

    useEffect(() => {
        subEventHelper.getInstance().registerEvent('rAskStatusSelector-iliya');
        subEventHelper.getInstance().registerEvent('rAskStatusSelector-epheria');
        subEventHelper.getInstance().registerEvent('rAskStatusSelector-ancado');

        subEventHelper.getInstance().registerCallback('rAskStatusSelector-iliya', (data) => {
            setIliyaSelector(
                <BarterLeftSelector default={data} for="Iliya" onChange={(change:boolean)=>{
                    new Promise((resolve) => {
                            Object.keys(document.getElementsByClassName('iliya-table-viewer')).forEach((value:string, index:number) => {
                                const element = document.getElementsByClassName('iliya-table-viewer')[index] as HTMLElement;
                                if (!change) {
                                    element.style.display = 'none';
                                } else {
                                    element.style.display = '';
                                }

                                win.api.send('hide-col-barter', {hide: change, type: 'iliya'});
                                subEventHelper.getInstance().send('sStatusSelector', 'iliya', change);
                            });
                        resolve(true);
                    });
                }} warn={iliya}/>
            );
        }, 'BarterLeft', true);

        subEventHelper.getInstance().registerCallback('rAskStatusSelector-epheria', (data) => {
            setEpheriaSelector(
                <BarterLeftSelector default={data} for="Epheria" onChange={(change:boolean)=>{
                    new Promise((resolve) => {
                        Object.keys(document.getElementsByClassName('epheria-table-viewer')).forEach((value:string, index:number) => {
                            const element = document.getElementsByClassName('epheria-table-viewer')[index] as HTMLElement;
                            if (!change) {
                                element.style.display = 'none';
                            } else {
                                element.style.display = '';
                            }

                            win.api.send('hide-col-barter', {hide: change, type: 'epheria'});
                            subEventHelper.getInstance().send('sStatusSelector', 'epheria', change);
                        });
                        resolve(true);
                    });
                }} warn={epheria}/>
            );
        }, 'BarterLeft', true);

        subEventHelper.getInstance().registerCallback('rAskStatusSelector-ancado', (data) => {
            setAncadoSelector(
                <BarterLeftSelector default={data} for="Ancado" onChange={(change:boolean)=>{
                    new Promise((resolve) => {
                        Object.keys(document.getElementsByClassName('ancado-table-viewer')).forEach((value:string, index:number) => {
                            const element = document.getElementsByClassName('ancado-table-viewer')[index] as HTMLElement;
                            if (!change) {
                                element.style.display = 'none';
                            } else {
                                element.style.display = '';
                            }

                            win.api.send('hide-col-barter', {hide: change, type: 'ancado'});
                            subEventHelper.getInstance().send('sStatusSelector', 'ancado', change);
                        });
                        resolve(true);
                    });
                }} warn={ancado}/>
            );
        }, 'BarterLeft', true);


        
        subEventHelper.getInstance().send('sAskStatusSelector', 'iliya');
        subEventHelper.getInstance().send('sAskStatusSelector', 'epheria');
        subEventHelper.getInstance().send('sAskStatusSelector', 'ancado');

        return () => {
            subEventHelper.getInstance().unregisterAllCallbacks("rAskStatusSelector-ancado");
            subEventHelper.getInstance().unregisterAllCallbacks("rAskStatusSelector-epheria");
            subEventHelper.getInstance().unregisterAllCallbacks("rAskStatusSelector-iliya");
            subEventHelper.getInstance().unregisterAllCallbacks('rAskStatusSelector');
        };
    }, [])

    // Launch the observer script on the body once before observing it
    observer.observe(document.body, {
        attributes: true,
        childList: false,
        subtree: true
    });
        

                    
    subEventHelper.getInstance().registerEvent('rAskStatusSelector');
    
    const icon = require(`@assets/icons/chest.svg`);
    return(
        <div id='app-barter-left-content'>
            <div id='app-barter-left-content-zone-header'>
                <p>{props.data.lang.barter[0].left[0].storageTitle[0]}</p>
                <img src={icon} />
            </div>
            <div id='app-barter-left-content-zone-selector'>
                {
                    iliyaSelector
                }
                {
                    epheriaSelector
                }
                {
                    ancadoSelector
                }

            </div>
            <BarterLeftSpecial data={props.data} />
            <BarterLeftItem data={props.data}/>
            <BarterLeftSearch data={props.data} search={''}/>
        </div>
    );
};

export default BarterLeft;