import dataDict from "@src/typings/data";
import React from "react";
import ElementMaker from './BarterCenterInput';
import win_ from '@src/typings/win';
import { barterEventManager } from './barterEventManager';

type Props = {
    data: dataDict;
    index: number;
    setValTotal: (qty: number, tier: number) => void;
    hide?: boolean;
}

const win:win_ = window;

// TODO: Add the threshold warning for each city
// // TODO: Add the tier color system for each item
// // TODO: Add the sort by tier system for each item

const BarterCenterItem: React.FC<Props> = (props: Props) => {

    const key = Object.keys(props.data.item)[props.index];
    const index = props.index;

    const className="tier-"+props.data.item[key][0].tier[0]

    // Create state for each city
    const [iliya, _setIliya] = React.useState(parseInt(props.data.save.items[0][key][0].iliya[0]));
    const [epheria, _setEpheria] = React.useState(parseInt(props.data.save.items[0][key][0].epheria[0]));
    const [ancado, _setAncado] = React.useState(parseInt(props.data.save.items[0][key][0].ancado[0]));

    // Create state for quantity combining all cities together
    const [quantity, setQuantity] = React.useState(iliya+epheria+ancado);

    

    // Create state for showing input element for each city
    const [showInputEleIliya, setShowInputEleIliya] = React.useState(false);
    const [showInputEleEpheria, setShowInputEleEpheria] = React.useState(false);
    const [showInputEleAncado, setShowInputEleAncado] = React.useState(false);

    const [countIliya, setCountIliya] = React.useState(true);
    const [countEpheria, setCountEpheria] = React.useState(true);
    const [countAncado, setCountAncado] = React.useState(true);

    const [limitIliya, setLimitIliya] = React.useState(parseInt(props.data.save.threshold[0].iliya[0]));
    const [limitEpheria, setLimitEpheria] = React.useState(parseInt(props.data.save.threshold[0].epheria[0]));
    const [limitAncado, setLimitAncado] = React.useState(parseInt(props.data.save.threshold[0].ancado[0]));

    barterEventManager.onThresholdChange('BarterCenterItem', (type, threshold) => {
        switch(type){
            case "iliya":
                setLimitIliya(threshold)
                break;
            case "epheria":
                setLimitEpheria(threshold)
                break;
            case "ancado":
                setLimitAncado(threshold)
                break;
        }
    })

    
    barterEventManager.onHideColBarter('BarterCenterItem', (hide, type) => {
        if(type === "iliya"){
            setCountIliya(hide)
        }else if(type === "epheria"){
            setCountEpheria(hide)
        }else if(type === "ancado"){
            setCountAncado(hide)
        }

        countQuantity();
    })


    const countQuantity = () => {

        if(isNaN(iliya) || iliya <= 0){
            setIliya(0)
        }

        if(isNaN(epheria) || epheria <= 0){
            setEpheria(0)
        }

        if(isNaN(ancado) || ancado <= 0){
            setAncado(0)
        }

        setQuantity((countIliya?(isNaN(iliya) || iliya <=0)? 0:iliya :0)+(countEpheria?(isNaN(epheria) || epheria <=0)? 0:epheria :0)+(countAncado?(isNaN(ancado) || ancado <=0)? 0:ancado :0))

        props.setValTotal(0, 1)
    }


    const setIliya = (value: number)=>{
        _setIliya(value)

        props.data.save.items[0][key][0].iliya[0] = value.toString();

        barterEventManager.saveItem('BarterCenterItem',
            key,
            value,
            'iliya'
        )
    }

    const setEpheria = (value: number)=>{
        _setEpheria(value)

        props.data.save.items[0][key][0].epheria[0] = value.toString();

        barterEventManager.saveItem('BarterCenterItem',
            key,
            value,
            'epheria'
        )
    }

    const setAncado = (value: number)=>{
        _setAncado(value)

        props.data.save.items[0][key][0].ancado[0] = value.toString();

        barterEventManager.saveItem('BarterCenterItem', 
            key,
            value,
            'ancado'
        )
    }

    return(
        <tr key={index} className={className + ` ${props.hide ? 'hide' : ''}`} onClick={()=>{

            barterEventManager.barterItemSelect("BarterCenterItem",
                props.data.item[key][0].image[0],
                parseInt(props.data.item[key][0].tier[0]),
                props.data.lang.items[0][key][0].name[0],
            )

        }}>
            <td>{props.data.item[key][0].tier[0]}</td>
            <td>{props.data.lang.items[0][key][0].name[0]}</td>
            <td>{quantity}</td>
            <td className={`iliya-table-viewer ${iliya <= limitIliya ? 'warning-thresold' : ''}`}>
                <ElementMaker
                    value={iliya}
                    handleChange={(e) =>{
                        if(isNaN(parseInt(e.target.value))){
                            setIliya(0)
                        }else{
                        setIliya(parseInt(e.target.value))
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
            <td className={`epheria-table-viewer ${epheria <= limitEpheria ? 'warning-thresold' : ''}`}>
                
                <ElementMaker
                    value={epheria}
                    handleChange={(e) =>
                        setEpheria(parseInt(e.target.value))
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
            <td className={`ancado-table-viewer ${ancado <= limitAncado ? 'warning-thresold' : ''}`}> 
                <ElementMaker
                    value={ancado}
                    handleChange={(e) =>
                        setAncado(parseInt(e.target.value))
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