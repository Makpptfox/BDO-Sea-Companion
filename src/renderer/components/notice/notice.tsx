/**
 * @file notice.tsx
 * @description This file contains the notice component.
 * @author Ward
 * @version 0.0.3
 * @license GPL-3.0
 * @since 0.0.3
 */

import subEventHelper from "@common/subEvent";
import dataDict from "@src/typings/data";
import update from "@src/typings/update";
import React, { useEffect } from "react";

import "./notice.scss";

type Props = {
    data: dataDict
}

/**
 * The notice component, used to show the notice
 * @param props The props of the component: {@link Props}
 * @returns the react component to render, type: {@link React.FC}
 */
const Notice: React.FunctionComponent<Props> = (props: Props) => {

    // register the callback to show the page
    useEffect(()=>{
        if(props.data.settings.settings.disclaimer[0] === "false"){
            document.getElementById("notice-back").style.display = "flex";
        }

        const eventHelper = subEventHelper.getInstance();

        // If the app is updated, show the notice for the first time
        eventHelper.registerCallback('rOpenNotice', ()=>{
            
            document.getElementById("notice-back").style.display = "flex";

            document.getElementById("notice-back").style.opacity = "0";
            document.getElementById("notice-back").style.transition = "opacity 0.3s";
            setTimeout(()=>{
                document.getElementById("notice-back").style.opacity = "1";
            }, 10);
        }, "notice");

    },[])

    // function to close the notice
    const close = (e: React.MouseEvent) => {

        if(e.target !== e.currentTarget){
            return;
        }

        e.preventDefault();

        if(props.data.settings.settings.disclaimer[0] === "false"){
            subEventHelper.getInstance().send('set-setting', {key: "disclaimer", value: "true"});
        }

        document.getElementById("notice-back").style.transition = "opacity 0.3s";
        document.getElementById("notice-back").style.opacity = "0";

        setTimeout(()=>{
            document.getElementById("notice-back").style.display = "none";
        }, 300);
    }

    // Return the notice component
    return (
        <div id="notice-back" onClick={close}>
            <div id="notice-container">
                <div className="notice-header">
                    <h1>Disclaimer of Affiliation</h1>
                </div>

                <div className="notice-content">
                    <p>
                        We are two independent developers who have created this free software as an unofficial tool to help players of the game Black Desert Online (BDO). This software is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Pearl Abyss or Black Desert Online.
                    </p>
                    <p>
                        The official Pearl Abyss website can be found at https://www.pearlabyss.com.
                    </p>
                    <p>
                        The official Black Desert Online (BDO) website can be found at https://www.naeu.playblackdesert.com.
                    </p>
                    <p>
                        All information and names used in this software are trademarks or registered trademarks of their respective holders. The use of these trademarks does not imply any affiliation with or endorsement by them.
                    </p>
                    <p>
                        If you have any questions or concerns about this software, please contact us via Github at https://github.com/Makpptfox/BDO-Sea-Companion.
                    </p>
                </div>

                <button className="notice-button" onClick={close}>Yes, I understand</button>

            </div>

        </div>
    )
}

export default Notice;