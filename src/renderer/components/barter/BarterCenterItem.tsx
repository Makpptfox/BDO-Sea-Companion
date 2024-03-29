/**
 * @file BarterCenterItem.tsx
 * @description Barter page center item component, this component is used as a row in the table.
 * 
 * @author Ward
 * @license GPL-3.0
 * @version 0.0.1
 * @since 0.0.1
 */

import dataDict from "@src/typings/data";
import React, { useEffect } from "react";
import ElementMaker from './BarterCenterInput';
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
    index: number;
    setValTotal: (qty: number, tier: number) => void;
    hideBool: (hide: boolean, type: string) => void;
    hide?: boolean;
    hideIliya?: boolean;
    hideEpheria?: boolean;
    hideAncado?: boolean;
}

/**
 * Barter Center Item Component, this component is used as a row in the table.
 * @param props The props of the component, type: {@link Props}
 * @returns The component, type: {@link React.FC}
 */
const BarterCenterItem: React.FC<Props> = (props: Props) => {
    
    const key = Object.keys(props.data.item)[props.index];
    const index = props.index;

    const hideAncado = props.hideAncado
    const hideEpheria = props.hideEpheria
    const hideIliya = props.hideIliya

    const uniqueName = key;

    const className="tier-"+props.data.item[key][0].tier[0]

    const save = props.data.save.items[0][key]? props.data.save.items[0] : {[key]:[{qty: ["0"], iliya: ["0"], epheria: ["0"], ancado: ["0"]}]};

    if(!props.data.save.items[0][key]) {
        props.data.save.items[0][key] = [{qty: ["0"], iliya: ["0"], epheria: ["0"], ancado: ["0"]}]
    }


    // Create state for each city
    const [iliya, _setIliya] = React.useState(parseInt(save[key][0].iliya[0]? save[key][0].iliya[0] : "0"));
    const [epheria, _setEpheria] = React.useState(parseInt(save[key][0].epheria[0]? save[key][0].epheria[0] : "0"));
    const [ancado, _setAncado] = React.useState(parseInt(save[key][0].ancado[0]? save[key][0].ancado[0] : "0"));

    // Create state for quantity combining all cities together
    const [quantity, setQuantity] = React.useState(iliya+epheria+ancado);
    

    // Create state for showing input element for each city
    const [showInputEleIliya, setShowInputEleIliya] = React.useState(false);
    const [showInputEleEpheria, setShowInputEleEpheria] = React.useState(false);
    const [showInputEleAncado, setShowInputEleAncado] = React.useState(false);

    const [countIliya] = React.useState<boolean>(hideIliya);
    const [countEpheria] = React.useState<boolean>(hideEpheria);
    const [countAncado] = React.useState<boolean>(hideAncado);

    const [limitTier1, setLimitTier1] = React.useState(parseInt(props.data.save.threshold[0].tier1[0]));
    const [limitTier2, setLimitTier2] = React.useState(parseInt(props.data.save.threshold[0].tier2[0]));
    const [limitTier3, setLimitTier3] = React.useState(parseInt(props.data.save.threshold[0].tier3[0]));
    const [limitTier4, setLimitTier4] = React.useState(parseInt(props.data.save.threshold[0].tier4[0]));
    const [limitTier5, setLimitTier5] = React.useState(parseInt(props.data.save.threshold[0].tier5[0]));

    const [content, setContent] = React.useState(null)

    let enableThresholdIliya: boolean
    let setEnableThresholdIliya: (arg0: boolean) => void;

    let enableThresholdEpheria: unknown
    let setEnableThresholdEpheria: (arg0: boolean) => void;

    let enableThresholdAncado: unknown
    let setEnableThresholdAncado: (arg0: boolean) => void;

    

    subEventHelper.getInstance().registerCallback('rRefresh-itemList', ()=>{
        if(props.data.item[key][0].tier[0] === '5') {

            setEnableThresholdIliya(props.data.settings.settings.ignoreIliya[0] === "false" ? true : false);
            setEnableThresholdEpheria(props.data.settings.settings.ignoreEpheria[0] === "false" ? true : false);
            setEnableThresholdAncado(true);

        } else {

            setEnableThresholdIliya(true);
            setEnableThresholdEpheria(true);
            setEnableThresholdAncado(props.data.settings.settings.ignoreAncado[0] === "false" ? true : false)

        }
    }, uniqueName)

    
    if(props.data.item[key][0].tier[0] === '5') {

        [enableThresholdIliya, setEnableThresholdIliya] = React.useState<boolean>((props.data.settings.settings.ignoreIliya[0] === "false") ? true : false);
        [enableThresholdEpheria, setEnableThresholdEpheria] = React.useState<boolean>(props.data.settings.settings.ignoreEpheria[0] === "false" ? true : false);
        [enableThresholdAncado, setEnableThresholdAncado] = React.useState<boolean>(true);

    } else {

        [enableThresholdIliya, setEnableThresholdIliya] = React.useState<boolean>(true);
        [enableThresholdEpheria, setEnableThresholdEpheria] = React.useState<boolean>(true);
        [enableThresholdAncado, setEnableThresholdAncado] = React.useState<boolean>(props.data.settings.settings.ignoreAncado[0] === "false" ? true : false);

    }

    useEffect(()=>{

        subEventHelper.getInstance().registerCallback('threshold-change', (type, threshold) => {
    
            new Promise((resolve)=>{
                switch(type){
                    case "tier1":
                        setLimitTier1(threshold)
                        resolve(true)
                        break;
                    case "tier2":
                        setLimitTier2(threshold)
                        resolve(true)
                        break;
                    case "tier3":
                        setLimitTier3(threshold)
                        resolve(true)
                        break;
                    case "tier4":
                        setLimitTier4(threshold)
                        resolve(true)
                        break;
                    case "tier5":
                        setLimitTier5(threshold)
                        resolve(true)
                        break;
                    default:
                        resolve(false)
                        break;
                }
            })
        }, uniqueName)
    
        return(()=>{
            subEventHelper.getInstance().unregisterAllCallbacks("threshold-change");
            subEventHelper.getInstance().unregisterAllCallbacks("rRefresh-itemList");
        })
    }, [])

    useEffect(()=>{

        let warning_threshold_iliya = false;
        let warning_threshold_epheria = false;
        let warning_threshold_ancado = false;

        switch(props.data.item[key][0].tier[0]){
            case '1':
                setThresholdWarning(limitTier1)
                break;
            case '2':
                setThresholdWarning(limitTier2)
                break;
            case '3':
                setThresholdWarning(limitTier3)
                break;
            case '4':
                setThresholdWarning(limitTier4)
                break;
            case '5':
                setThresholdWarning(limitTier5)
                break;
            default:
                break;
            }
        
        function setThresholdWarning(limit: number) {
            if(iliya <= limit && enableThresholdIliya){
                warning_threshold_iliya = true;
            }
            if(epheria <= limit && enableThresholdEpheria){
                warning_threshold_epheria = true;
            }
            if(ancado <= limit && enableThresholdAncado){
                warning_threshold_ancado = true;
            }
        }
        setContent(
            <tr key={index} className={className + ` ${props.hide ? 'hide' : ''}`} onClick={()=>{
    
                subEventHelper.getInstance().callEvent('barterItemSelect', 
                    props.data.item[key][0].image[0],
                    parseInt(props.data.item[key][0].tier[0]),
                    props.data.lang.items[0][key][0].description[0]
                )
    
            }}>
                <td>{props.data.item[key][0].tier[0]}</td>
                <td>{props.data.lang.items[0][key]? props.data.lang.items[0][key][0].name[0] : key}</td>
                <td>{quantity}</td>
                <td className={`iliya-table-viewer ${(warning_threshold_iliya) ? 'warning-thresold ' : ' '}` + (!countIliya ? 'hide-h' : '')}>
                    <ElementMaker
                        value={iliya}
                        handleChange={(e) =>{
                            if(isNaN(parseInt(e.target.value))){
                                setIliyaCenter(0)
                            }else{
                                setIliyaCenter(parseInt(e.target.value))
                            }
                        }}
                        handleDoubleClick={(e) => 
                            {
                                setShowInputEleIliya(true);
                            }
                        }
                        handleBlur={(e) => 
                            {
                            setShowInputEleIliya(false)
                            countQuantity();
                            }
                        }
                        showInputEle={showInputEleIliya}
                    />
                </td>
                <td className={`epheria-table-viewer  ${!countEpheria ? 'hide-h' : ''} ${(warning_threshold_epheria) ? 'warning-thresold' : ''}`}>
                    
                    <ElementMaker
                        value={epheria}
                        handleChange={(e) =>
                            setEpheriaCenter(parseInt(e.target.value))
                        }
                        handleDoubleClick={(e) =>
                            {
                                setShowInputEleEpheria(true);
                            }
                        }
                        handleBlur={(e) => 
                            {
                            setShowInputEleEpheria(false)
                            countQuantity();
                            }
                        }
                        showInputEle={showInputEleEpheria}
                    />
                </td>
                <td className={`ancado-table-viewer  ${!countAncado ? 'hide-h' : ''} ${(warning_threshold_ancado) ? 'warning-thresold' : ''}`}>
                    <ElementMaker
                        value={ancado}
                        handleChange={(e) =>
                            setAncadoCenter(parseInt(e.target.value))
                        }
                        handleDoubleClick={(e) =>
                            {
                                setShowInputEleAncado(true);
                            }
                        }
                        handleBlur={(e) => 
                            {
                            setShowInputEleAncado(false)
                            countQuantity();
                            }
                        }
                        showInputEle={showInputEleAncado}
                    />
                </td>
            </tr>
            )

    }, [quantity, iliya, epheria, ancado, showInputEleIliya, showInputEleEpheria, showInputEleAncado, limitTier1, limitTier2, limitTier3, limitTier4, limitTier5, countIliya, countEpheria, countAncado, enableThresholdAncado, enableThresholdEpheria, enableThresholdIliya]);

    const countQuantity = () => {

        new Promise((resolve)=>{
            

            if(isNaN(iliya) || iliya <= 0){
                setIliyaCenter(0)
            }

            if(isNaN(epheria) || epheria <= 0){
                setEpheriaCenter(0)
            }

            if(isNaN(ancado) || ancado <= 0){
                setAncadoCenter(0)
            }

            // setQuantity(iliya+epheria+ancado) 
            // If a city is hidden, then don't count it in the total by setting it to 0
            setQuantity((countIliya?(isNaN(iliya) || iliya <=0)? 0:iliya :0)+(countEpheria?(isNaN(epheria) || epheria <=0)? 0:epheria :0)+(countAncado?(isNaN(ancado) || ancado <=0)? 0:ancado :0))

            props.setValTotal(0, 1)

            resolve(true);
        });
    }


    const setIliyaCenter = (value: number)=>{
        _setIliya(value)

        props.data.save.items[0][key][0].iliya[0] = value.toString();

        // const data = props.data
        // win.api.send('save-data-dict', {data: JSON.stringify(data)});

        // save the value to the save file
        subEventHelper.getInstance().send('save-item', key, value, 'iliya');
    }

    const setEpheriaCenter = (value: number)=>{
        _setEpheria(value)

        props.data.save.items[0][key][0].epheria[0] = value.toString();

        // const data = props.data
        // win.api.send('save-data-dict', {data: JSON.stringify(data)});

        // save the value to the save file
        subEventHelper.getInstance().send('save-item', key, value, 'epheria');
    }

    const setAncadoCenter = (value: number)=>{
        _setAncado(value)

        props.data.save.items[0][key][0].ancado[0] = value.toString();

        // const data = props.data
        // win.api.send('save-data-dict', {data: JSON.stringify(data)});

        // save the value to the save file
        subEventHelper.getInstance().send('save-item', key, value, 'ancado');
    }

    if(props.data.lang.items[0][key] == undefined){
        props.data.lang.items[0][key] = [{name: [key], description: [key+' description']}]
    }

    return(
        content
    )
}

export default BarterCenterItem;