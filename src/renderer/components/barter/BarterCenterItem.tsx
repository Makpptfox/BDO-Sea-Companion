import dataDict from "@src/typings/data";
import React from "react";
import ElementMaker from './BarterCenterInput';
import win_ from '@src/typings/win';

type Props = {
    data: dataDict;
    index: number;
}

const win:win_ = window;

// TODO: Add the threshold warning for each city
// TODO: Add the tier color system for each item
// TODO: Add the sort by tier system for each item

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

    
    win.api.receive("r_hide-col-barter", (data) => {
        if(data.type === "iliya"){
            setCountIliya(data.hide)
        }else if(data.type === "epheria"){
            setCountEpheria(data.hide)
        }else if(data.type === "ancado"){
            setCountAncado(data.hide)
        }

        countQuantity();
    })


    const countQuantity = () => {
        setQuantity((countIliya?iliya:0)+(countEpheria?epheria:0)+(countAncado?ancado:0))
    }


    const setIliya = (value: number)=>{
        _setIliya(value)

        win.api.send('save-item', {
            key: key,
            value: value,
            type: 'iliya'
        })
    }

    const setEpheria = (value: number)=>{
        _setEpheria(value)

        win.api.send('save-item', {
            key: key,
            value: value,
            type: 'epheria'
        })
    }

    const setAncado = (value: number)=>{
        _setAncado(value)

        win.api.send('save-item', {
            key: key,
            value: value,
            type: 'ancado'
        })
    }

    return(
        <tr key={index} className={className}>
            <td>{props.data.item[key][0].tier[0]}</td>
            <td>{props.data.lang.items[0][key][0].name[0]}</td>
            <td>{quantity}</td>
            <td className="iliya-table-viewer">
                <ElementMaker
                    value={iliya}
                    handleChange={(e) =>
                        setIliya(parseInt(e.target.value))
                    }
                    handleDoubleClick={() =>
                        setShowInputEleIliya(true)
                    }
                    handleBlur={() => {
                        setShowInputEleIliya(false)
                        countQuantity()
                        }
                    }
                    showInputEle={showInputEleIliya}
                />
            </td>
            <td className="epheria-table-viewer">
                
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
                />
            </td>
            <td className="ancado-table-viewer">
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
                />
            </td>
        </tr>
    )
}

export default BarterCenterItem;