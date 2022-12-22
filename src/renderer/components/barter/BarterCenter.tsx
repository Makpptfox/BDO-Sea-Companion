import React from "react";

import dataDict from "@src/typings/data";
import './BarterCenter.scss'
import BarterCenterItem from "./BarterCenterItem";
import { barterEventManager } from "./barterEventManager";


type Props = {
    data: dataDict;
}

const BarterCenter: React.FC<Props> = (props: Props) => {

    const [isSearch, setIsSearch] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const [valTotal, _setValTotal] = React.useState(0);


    const setValTotal = (qty: number, tier: number) => {

        console.log()

        switch(tier){
            case 1:
                _setValTotal(valTotal + (qty * 0));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 0));
                break;
            case 2:
                _setValTotal(valTotal + (qty * 0));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 0));
                break;
            case 3:
                _setValTotal(valTotal + (qty * 1000000));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 1000000));
                break;
            case 4:
                _setValTotal(valTotal + (qty * 2000000));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 2000000));
                break;
            case 5:
                _setValTotal(valTotal + (qty * 5000000));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 5000000));
                break;
            default:
                _setValTotal(valTotal + (qty * 0));
                barterEventManager.totalValue("BarterCenter", valTotal + (qty * 0));
                break;
        }

    }


    barterEventManager.onBarterSearch("BarterCenter",(data)=>{

        data = data.trim();

        if(data === "" || data === undefined || data === null){
            setIsSearch(false)
        }else{
            setIsSearch(true)
            setSearch(data)
        }
    });

    return(
        <table id="app-barter-center">
            <thead>
                <tr>
                    <th>{props.data.lang.barter[0].table[0].tier[0]}</th>
                    <th>{props.data.lang.barter[0].table[0].name[0]}</th>
                    <th>{props.data.lang.barter[0].table[0].qty[0]}</th>
                    <th className="iliya-table-viewer" >Iliya</th>
                    <th className="epheria-table-viewer">Epheria</th>
                    <th className="ancado-table-viewer">Ancado</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(props.data.item).map((key, index) => {
                        if(!isSearch){
                            return(
                                // eslint-disable-next-line react/jsx-key
                                <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} />
                            )
                        } else {
                            const itemName = props.data.lang.items[0][key][0].name[0].toLowerCase();
                            if(itemName.toLowerCase().includes(search.toLowerCase())){
                                return(
                                    // eslint-disable-next-line react/jsx-key
                                    <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} />
                                )
                            } else {
                                return(
                                // eslint-disable-next-line react/jsx-key
                                    <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} hide={true} />
                                )
                            }
                        }
                    })
                }
            </tbody>
        </table>
    )

};

export default BarterCenter;