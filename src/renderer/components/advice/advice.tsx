import subEventHelper from "@common/subEvent";
import React, { useEffect } from "react";

import "./advice.scss"


const Advice: React.FC = () => {

    const [advice, setAdvice] = React.useState(''); // advice

    const [displayIcon, setDisplayIcon] = React.useState({display: 'none'}); // display the icon

    const icon = require('@assets/images/Advice.png');

    useEffect(()=>{
        subEventHelper.getInstance().registerCallback('rAdvice', (advice: string) => {
            setAdvice(advice);
        }, 'Application');

        return(
            ()=>{
                subEventHelper.getInstance().unregisterAllCallbacks("rAdvice");
            }
        )
    }, [])

    useEffect(()=>{
        if(advice === ''){
            setDisplayIcon({display: 'none'});
        } else {
            setDisplayIcon({display: 'block'});
        }
    }, [advice])



    return (
        <div id="app-advice">
            <p>{advice}</p>
            <img src={icon} alt="Advice" width="auto" height="100%" id="adviceIcon" draggable={false} style={displayIcon}/>
        </div>
    );
};

export default Advice;