import React from "react";

import dataDict from "@src/typings/data";


type Props = {
    data: dataDict;
}

const BarterCenter: React.FC<Props> = (props: Props) => {


    return(
        <div id='app-barter-center'>
            <table>
                <thead>
                    <tr>
                        <th>Tier</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th className="iliya-table-viewer" >Iliya</th>
                        <th className="epheria-table-viewer">Epheria</th>
                        <th className="ancado-table-viewer">Ancado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(props.data.item).map((key, index) => {

                            return(
                                <tr key={index}>
                                    <td>{props.data.item[key][0].tier[0]}</td>
                                    <td>{props.data.lang.items[0][key][0].name[0]}</td>
                                    <td>{props.data.save.items[0][key][0].qty[0]}</td>
                                    <td className="ilya-table-viewer">{props.data.save.items[0][key][0].iliya[0]}</td>
                                    <td className="epheria-table-viewer">{props.data.save.items[0][key][0].epheria[0]}</td>
                                    <td className="ancado-table-viewer">{props.data.save.items[0][key][0].ancado[0]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

};

export default BarterCenter;