import React, { useEffect } from "react";

import dataDict from "@src/typings/data";

import "./BarterBottomRight.scss";
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
}


let init = (setTotal: React.Dispatch<React.SetStateAction<number>>, props: Props)=>{
    // !!! DO NOT REMOVE THIS LINE OR ELSE THE FUNCTION WILL BE RECALLED EVERYTIME THE COMPONENT IS RENDERED !!! \\
    // !!! MAKING THE APP CRASH !!! \\
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    init = () => {};

    let _total = 0;

    Object.keys(props.data.save.items[0]).forEach((key) => {

        const tier = parseInt(props.data.item[key][0].tier[0]);
        const qty = parseInt(props.data.save.items[0][key][0].iliya[0]) + parseInt(props.data.save.items[0][key][0].epheria[0]) + parseInt(props.data.save.items[0][key][0].ancado[0]);

        switch(tier){
            case 3:
                _total = _total + (qty * 1000000);
                break;
            case 4:
                _total = _total + (qty * 2000000);
                break;
            case 5:
                _total = _total + (qty * 5000000);
                break;
        }
        
    })
    setTotal(_total);
}

const BarterBottomRight: React.FC<Props> = (props: Props) => {

    const [total, setTotal] = React.useState(0);

    let _total = 0;

    const silver = require('../../../../assets/icons/silver.svg')
    

    init(setTotal, props);

    subEventHelper.getInstance().registerCallback("total-value", () => {

        console.log('total-value event called')

        setTotal(0);
        new Promise((resolve) => {
        
            setTotal(0);
            _total = 0
            Object.keys(props.data.save.items[0]).forEach((key) => {
                const tier = parseInt(props.data.item[key][0].tier[0]);
                const qty = parseInt(props.data.save.items[0][key][0].iliya[0] + props.data.save.items[0][key][0].epheria[0] + props.data.save.items[0][key][0].ancado[0]);


                switch(tier){
                    case 1:
                        _total = _total + (qty * 1000000);
                        break;
                    case 4:
                        _total = _total + (qty * 2000000);
                        break;
                    case 5:
                        _total = _total + (qty * 5000000);
                        break;
                }
                
            })
            console.log('total-value equal to: ' + _total)
            
            setTotal(_total);

            resolve(true);
        
        })
    }, 'BarterBottomRight')

    useEffect(()=>()=>{
        subEventHelper.getInstance().unregisterAllCallbacks("total-value");
    })

    return(
        <div className="app-barter-bottom-right-content">
            <p>{props.data.lang.barter[0].bottom[0].right[0].totalStoragesValue[0]}</p>

            <p className="last">{total.toLocaleString('us-US')}</p>
            <img src={silver} />
        </div>
    )
}

export default BarterBottomRight;