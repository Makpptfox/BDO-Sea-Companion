import React from "react";

import dataDict from "@src/typings/data";
import './BarterCenter.scss'
import BarterCenterItem from "./BarterCenterItem";


type Props = {
    data: dataDict;
}

const BarterCenter: React.FC<Props> = (props: Props) => {


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

                        return(
                            // eslint-disable-next-line react/jsx-key
                            <BarterCenterItem data={props.data} index={index} key={key} />
                        )
                    })
                }
            </tbody>
        </table>
    )

};

export default BarterCenter;