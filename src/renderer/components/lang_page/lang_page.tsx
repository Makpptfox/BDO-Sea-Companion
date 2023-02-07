import subEventHelper from "@common/subEvent";
import React, { useEffect } from "react";

import "./lang_page.scss";

const LangPage: React.FunctionComponent = () => {

    const [show, setShow] = React.useState(false);

    let show_ = false;

    subEventHelper.getInstance().registerCallback('open_lang_page', (state?) => {
        show_ = state? state : !show_;

        setShow(state? state : show_);
    }, 'langPage');

    
    
    useEffect(()=>()=>{
        subEventHelper.getInstance().unregisterAllCallbacks("open_lang_page");
    })

    if(!show){
        return null;
    }

    const changeLang = (lang: string) => {
        subEventHelper.getInstance().send('set-lang', lang);
        subEventHelper.getInstance().callEvent('open_lang_page', false);
    }
    return (
        <div className="lang-page" onClick={(e: any)=>{if(e.target.className === "lang-page"){subEventHelper.getInstance().callEvent('open_lang_page', false);}}}>
            <div className="lang-page-content">
                <div className="lang-page-title">Select Language</div>
                <div className="lang-page-content-list">
                    <div className="lang-page-content-item" onClick={()=>{changeLang("en")}}>
                        <div className="lang-page-content-item-icon"><img src={require("@assets/icons/lang_en.png")} alt="lang_en" height="16"/></div>
                        <div className="lang-page-content-item-text">English</div>
                    </div>
                    <div className="lang-page-content-item" onClick={()=>{changeLang("fr")}}>
                        <div className="lang-page-content-item-icon"><img src={require("@assets/icons/lang_fr.png")} alt="lang_fr" height="16"/></div>
                        <div className="lang-page-content-item-text">Français</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LangPage;