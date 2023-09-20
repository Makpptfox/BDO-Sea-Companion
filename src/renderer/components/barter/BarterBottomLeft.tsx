/**
 * @file BarterBottomLeft.tsx
 * @description Barter page bottom left component.
 * 
 * @author Ward
 * @license GPL-3.0
 * @version 0.0.1
 * @since 0.0.1
 */

import React from "react";

import dataDict from "@src/typings/data";

import "./BarterBottomLeft.scss";
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
}

/**
 * Barter Bottom Left Component.
 * @param props The props of the component, type: {@link Props}
 * @returns The component, type: {@link React.FC}
 */
const BarterBottomLeft: React.FC<Props> = (props: Props) => {



    // Thresholds states
    const [tier1Threshold, _setTier1Threshold] = React.useState(props.data.save.threshold[0].tier1[0]);
    const [tier2Threshold, _setTier2Threshold] = React.useState(props.data.save.threshold[0].tier2[0]);
    const [tier3Threshold, _setTier3Threshold] = React.useState(props.data.save.threshold[0].tier3[0]);
    const [tier4Threshold, _setTier4Threshold] = React.useState(props.data.save.threshold[0].tier4[0]);
    const [tier5Threshold, _setTier5Threshold] = React.useState(props.data.save.threshold[0].tier5[0]);

    const filter = require('../../../../assets/icons/filter.svg')

    
    /**
     * Set Tier1 Threshold
     * @param event
     * @returns void
     * @description Set Tier1 Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setTier1Threshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        if(value === "" || value.includes("-")){
            value = "0";
        }

        if(value.startsWith("0") && value.length > 1){
            value = value.replace("0", "");
        }

        props.data.save.threshold[0].tier1[0] = value;


        subEventHelper.getInstance().send("threshold-change", "tier1", value);

        _setTier1Threshold(value);
    }

    /**
     * Set Tier2 Threshold
     * @param event
     * @returns void
     * @description Set Tier2 Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setTier2Threshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        if(value === "" || value.includes("-")){
            value = "0";
        }

        if(value.startsWith("0") && value.length > 1){
            value = value.replace("0", "");
        }

        props.data.save.threshold[0].tier2[0] = value;

        subEventHelper.getInstance().send("threshold-change", "tier2", value);

        _setTier2Threshold(value);
    }

    /**
     * Set Tier3 Threshold
     * @param event
     * @returns void
     * @description Set Tier3 Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setTier3Threshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        if(value === "" || value.includes("-")){
            value = "0";
        }

        if(value.startsWith("0") && value.length > 1){
            value = value.replace("0", "");
        }

        props.data.save.threshold[0].tier3[0] = value;

        subEventHelper.getInstance().send("threshold-change", "tier3", value);

        _setTier3Threshold(value);
    }

    /**
     * Set Tier4 Threshold
     * @param event
     * @returns void
     * @description Set Tier4 Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setTier4Threshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        if(value === "" || value.includes("-")){
            value = "0";
        }

        if(value.startsWith("0") && value.length > 1){
            value = value.replace("0", "");
        }

        props.data.save.threshold[0].tier4[0] = value;


        subEventHelper.getInstance().send("threshold-change", "tier4", value);

        _setTier4Threshold(value);
    }

    /**
     * Set Tier5 Threshold
     * @param event
     * @returns void
     * @description Set Tier5 Threshold and send the value to the props data, then save it in the save_data.xml file in the user's home directory.
     * @todo Save the value in the save_data.xml file in the user's home directory.
     */
    const setTier5Threshold = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        if(value === "" || value.includes("-")){
            value = "0";
        }

        if(value.startsWith("0") && value.length > 1){
            value = value.replace("0", "");
        }

        props.data.save.threshold[0].tier5[0] = value;


        subEventHelper.getInstance().send("threshold-change", "tier5", value);

        _setTier5Threshold(value);
    }

    const openFilter = (e: React.MouseEvent) => {

        const icon = e.currentTarget as HTMLImageElement;

        icon.style.transition = "transform 0.1s ease-in-out";
        icon.style.transform = "scale(0.8, 0.8)";

        subEventHelper.getInstance().callEvent("open_setTier_page");

        setTimeout(() => {
            icon.style.transform = "scale(1, 1)";
        }, 100);
    }

    
    const mouseHover = () => {
        subEventHelper.getInstance().callEvent("rAdvice", props.data.lang.barter[0].bottom[0].left[0].tresholdAdvice[0]);
    };

    const mouseOut = () => {
        subEventHelper.getInstance().callEvent("rAdvice", "");
    };

    const mouseClick = (e: React.MouseEvent) => {

        const input = e.currentTarget as HTMLInputElement;

        input.select();
    };

    const input = (e: React.KeyboardEvent) => {
        const input = e.currentTarget as HTMLInputElement;

        if(input.value === "" || input.value.includes("-")){
            input.value = "0";
            input.textContent = input.value;
        }

        if(input.value.startsWith("0") && input.value.length > 1){
            input.value = input.value.replace("0", "");
        }
    }


        return(
            <div className="app-barter-bottom-left">
                <div className="app-barter-bottom-left-content-zone">
                    <div className="app-barter-bottom-left-content-zone-title">
                        <p>{props.data.lang.barter[0].bottom[0].left[0].title[0]}</p>
                    </div>
                    <div className="app-barter-bottom-left-content-zone-content">
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={tier1Threshold} min="0" onChange={setTier1Threshold} onMouseOver={mouseHover} onMouseOut={mouseOut} onClick={mouseClick} onKeyUpCapture={input}/>
                            <p>Tier 1</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={tier2Threshold} min="0" onChange={setTier2Threshold} onMouseOver={mouseHover} onMouseOut={mouseOut} onClick={mouseClick} onKeyUpCapture={input}/>
                            <p>Tier 2</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={tier3Threshold} min="0" onChange={setTier3Threshold} onMouseOver={mouseHover} onMouseOut={mouseOut} onClick={mouseClick} onKeyUpCapture={input}/>
                            <p>Tier 3</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={tier4Threshold} min="0" onChange={setTier4Threshold} onMouseOver={mouseHover} onMouseOut={mouseOut} onClick={mouseClick} onKeyUpCapture={input}/>
                            <p>Tier 4</p>
                        </div>
                        <div className="app-barter-bottom-left-content-zone-content-item">
                            <input type="number" placeholder="0" defaultValue={tier5Threshold} min="0" onChange={setTier5Threshold} onMouseOver={mouseHover} onMouseOut={mouseOut} onClick={mouseClick} onKeyUpCapture={input}/>
                            <p>Tier 5</p>
                        </div>
                    </div>
                </div>
                <div className="app-barter-bottom-left-filter">
                    <img src={filter} alt="cog" width="48" height="48" onClick={openFilter}/>
                </div>
            </div>
        )
    }

export default BarterBottomLeft;