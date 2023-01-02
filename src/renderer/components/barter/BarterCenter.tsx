import React, { ReactNode, useEffect } from "react";

import dataDict from "@src/typings/data";
import './BarterCenter.scss'
import BarterCenterItem from "./BarterCenterItem";
import subEventHelper from "@common/subEvent";


type Props = {
    data: dataDict;
}

const BarterCenter: React.FC<Props> = (props: Props) => {

    const [isSearch, setIsSearch] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const [valTotal, _setValTotal] = React.useState(0);

    const [state, setState] = React.useState('');
    const [table, setTable] = React.useState<ReactNode[]>([]);

    const [hideIliya, setHideIliya] = React.useState(true);
    const [hideEpheria, setHideEpheria] = React.useState(true);
    const [hideAncado, setHideAncado] = React.useState(true);

    const tagueuleetmarche = (hide: boolean, type: string) => {
        switch(type){
            case "iliya":
                setHideIliya(hide);
                break;
            case "epheria":
                setHideEpheria(hide);
                break;
            case "ancado":
                setHideAncado(hide);
                break;
            default:
                break;
        }
    };


    // Use the useEffect to load the table in a async way
    useEffect(() => {
        setState('loading');
        

        new Promise<ReactNode[]>((resolve) => {
            const data:ReactNode[] = [];
            Object.keys(props.data.item).map((key, index) => {
                if(!isSearch){
                    data.push(
                        // eslint-disable-next-line react/jsx-key
                        <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} hideBool={tagueuleetmarche} hideIliya={hideIliya} hideEpheria={hideEpheria} hideAncado={hideAncado} />
                    )
                } else {
                    const itemName = props.data.lang.items[0][key][0].name[0].toLowerCase();
                    if(itemName.toLowerCase().includes(search.toLowerCase())){
                        data.push(

                            // eslint-disable-next-line react/jsx-key
                            <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} hideBool={tagueuleetmarche} hideIliya={hideIliya} hideEpheria={hideEpheria} hideAncado={hideAncado} />
                        )
                    } else {
                        data.push(
                        // eslint-disable-next-line react/jsx-key
                            <BarterCenterItem data={props.data} index={index} key={key} setValTotal={setValTotal} hideBool={tagueuleetmarche} hideIliya={hideIliya} hideEpheria={hideEpheria} hideAncado={hideAncado} hide={true} />
                        )
                    }
                }
            })

            resolve(data);
        }).then((data)=>{
            setTable(data);
            setState('loaded');
        });
    }, [isSearch, search]);


    const setValTotal = (qty: number, tier: number) => {

        new Promise(()=>{
            switch(tier){
                case 1:
                    _setValTotal(valTotal + (qty * 0));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 0));
                    break;
                case 2:
                    _setValTotal(valTotal + (qty * 0));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 0));
                    break;
                case 3:
                    _setValTotal(valTotal + (qty * 1000000));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 1000000));
                    break;
                case 4:
                    _setValTotal(valTotal + (qty * 2000000));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 2000000));
                    break;
                case 5:
                    _setValTotal(valTotal + (qty * 5000000));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 5000000));
                    break;
                default:
                    _setValTotal(valTotal + (qty * 0));
                    subEventHelper.getInstance().callEvent('total-value', valTotal + (qty * 0));
                    break;
            }
        })

    }

    subEventHelper.getInstance().registerCallback('search-barter', (search)=>{
        if(search !== undefined ) search = search.trim();

        if(search === "" || search === undefined || search === null){
            setIsSearch(false)
        }else{
            setIsSearch(true)
            setSearch(search)
        }
    }, 'BarterCenter')

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
            <tbody className="table-body">
                {
                    state === 'loading' ? <tr><td colSpan={6}>Loading...</td></tr> : table
                }
            </tbody>
        </table>
    )

};

export default BarterCenter;