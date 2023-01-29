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

    const [countIliya, setCountIliya] = React.useState<boolean>(hideIliya);
    const [countEpheria, setCountEpheria] = React.useState<boolean>(hideEpheria);
    const [countAncado, setCountAncado] = React.useState<boolean>(hideAncado);

    const [limitIliya, setLimitIliya] = React.useState(parseInt(props.data.save.threshold[0].iliya[0]));
    const [limitEpheria, setLimitEpheria] = React.useState(parseInt(props.data.save.threshold[0].epheria[0]));
    const [limitAncado, setLimitAncado] = React.useState(parseInt(props.data.save.threshold[0].ancado[0]));

    subEventHelper.getInstance().registerCallback('threshold-change', (type, threshold) => {
        
        console.log("threshold-change", type, threshold)

        new Promise((resolve)=>{
            switch(type){
                case "iliya":
                    setLimitIliya(threshold)
                    resolve(true)
                    break;
                case "epheria":
                    setLimitEpheria(threshold)
                    resolve(true)
                    break;
                case "ancado":
                    setLimitAncado(threshold)
                    resolve(true)
                    break;
                default:
                    resolve(false)
                    break;
            }
        })
    }, uniqueName)

    subEventHelper.getInstance().registerCallback('search-barter', ({hide, type}) => {

        new Promise((resolve)=>{
            props.hideBool(hide, type)
            switch(type){
                case "iliya":
                    setCountIliya(hide)
                    resolve(true)
                    break;
                case "epheria":
                    setCountEpheria(hide)
                    resolve(true)
                    break;
                case "ancado":
                    setCountAncado(hide)
                    resolve(true)
                    break;
                default:
                    resolve(false)
                    break;
            }

            setQuantity((countIliya?(isNaN(iliya) || iliya <=0)? 0:iliya :0)+(countEpheria?(isNaN(epheria) || epheria <=0)? 0:epheria :0)+(countAncado?(isNaN(ancado) || ancado <=0)? 0:ancado :0))
        })
    }, uniqueName);
    
    useEffect(()=>()=>{
        subEventHelper.getInstance().unregisterAllCallbacks("threshold-change");
        subEventHelper.getInstance().unregisterAllCallbacks("search-barter");
    })

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
            <td className={`iliya-table-viewer ${iliya <= limitIliya ? 'warning-thresold ' : ' '}` + (!countIliya ? 'hide-h' : '')}>
                <ElementMaker
                    value={iliya}
                    handleChange={(e) =>{
                        if(isNaN(parseInt(e.target.value))){
                            setIliyaCenter(0)
                        }else{
                            setIliyaCenter(parseInt(e.target.value))
                        }
                    }}
                    handleDoubleClick={() =>
                        setShowInputEleIliya(true)
                    }
                    handleBlur={() => {
                        setShowInputEleIliya(false)
                        countQuantity()
                        }
                    }
                    showInputEle={showInputEleIliya}
                    limit={limitIliya}
                />
            </td>
            <td className={`epheria-table-viewer  ${!countEpheria ? 'hide-h' : ''} ${epheria <= limitEpheria ? 'warning-thresold' : ''}`}>
                
                <ElementMaker
                    value={epheria}
                    handleChange={(e) =>
                        setEpheriaCenter(parseInt(e.target.value))
                    }
                    handleDoubleClick={() =>
                        setShowInputEleEpheria(true)
                    }
                    handleBlur={() => {
                        setShowInputEleEpheria(false)
                        countQuantity()
                        }
                    }
                    showInputEle={showInputEleEpheria}
                    limit={limitEpheria}
                />
            </td>
            <td className={`ancado-table-viewer  ${!countAncado ? 'hide-h' : ''} ${ancado <= limitAncado ? 'warning-thresold' : ''}`}>
                <ElementMaker
                    value={ancado}
                    handleChange={(e) =>
                        setAncadoCenter(parseInt(e.target.value))
                    }
                    handleDoubleClick={() =>
                        setShowInputEleAncado(true)
                    }
                    handleBlur={() => {
                        setShowInputEleAncado(false)
                        countQuantity()
                        }
                    }
                    showInputEle={showInputEleAncado}
                    limit={limitAncado}
                />
            </td>
        </tr>
    )
}

export default BarterCenterItem;