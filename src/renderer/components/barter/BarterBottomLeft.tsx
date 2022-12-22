import React from "react";

import dataDict from "@src/typings/data";

import "./BarterBottomLeft.scss";
import { barterEventManager } from "./barterEventManager";

type Props = {
    data: dataDict;
}

const BarterBottomLeft: React.FC<Props> = (props: Props) => {

    const [iliyaThreshold, _setIliyaThreshold] = React.useState(props.data.save.threshold[0].iliya[0]);
    const [epheriaThreshold, _setEpheriaThreshold] = React.useState(props.data.save.threshold[0].epheria[0]);
    const [ancadoThreshold, _setAncadoThreshold] = React.useState(props.data.save.threshold[0].ancado[0]);

    
    /**
     * Set Iliya Threshold
     * @param event
     * @returns void
     * @description Set Iliya Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setIliyaThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].iliya[0] = event.target.value;

        barterEventManager.thresholdChange("BarterBottomLeft", { name: "iliya", value: event.target.value })

        _setIliyaThreshold(event.target.value);
    }

    /**
     * Set Epheria Threshold
     * @param event
     * @returns void
     * @description Set Epheria Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setEpheriaThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].epheria[0] = event.target.value;

        barterEventManager.thresholdChange("BarterBottomLeft", { name: "epheria", value: event.target.value })

        _setEpheriaThreshold(event.target.value);
    }

    /**
     * Set Ancado Threshold
     * @param event
     * @returns void
     * @description Set Ancado Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setAncadoThreshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.data.save.threshold[0].ancado[0] = event.target.value;

        barterEventManager.thresholdChange("BarterBottomLeft", { name: "ancado", value: event.target.value })

        _setAncadoThreshold(event.target.value);
    }

        return(
            <div className="app-barter-bottom-left-content-zone">
                <div className="app-barter-bottom-left-content-zone-title">
                    <p>{props.data.lang.barter[0].bottom[0].left[0].title[0]}</p>
                </div>
                <div className="app-barter-bottom-left-content-zone-content">
                    <div className="app-barter-bottom-left-content-zone-content-item">
                        <input type="number" placeholder="0" defaultValue={iliyaThreshold} min="0" onChange={setIliyaThreshold}/>
                        <p>Iliya</p>
                    </div>
                    <div className="app-barter-bottom-left-content-zone-content-item">
                        <input type="number" placeholder="0" defaultValue={epheriaThreshold} min="0" onChange={setEpheriaThreshold}/>
                        <p>Epheria</p>
                    </div>
                    <div className="app-barter-bottom-left-content-zone-content-item">
                        <input type="number" placeholder="0" defaultValue={ancadoThreshold} min="0" onChange={setAncadoThreshold}/>
                        <p>Ancado</p>
                    </div>
                </div>
            </div>
        )
    }

export default BarterBottomLeft;