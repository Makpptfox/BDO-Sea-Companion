import React, { useEffect } from "react";
import ControlButton from "./controlButton";
import subEventHelper from "@common/subEvent";
import tempHelper from '../../../common/temp';

const WindowControls = () => {

    const [maximized, setMaximized] = React.useState(false);

    const [lang, setLang] = React.useState(tempHelper.getInstance().has('lang') ? tempHelper.getInstance().get('lang') : 'en');

    subEventHelper.getInstance().registerCallback('app-maximize-reply', (maximize) => {

        setMaximized(maximize)

    }, 'windowControls');

    useEffect(() => {
        subEventHelper.getInstance().registerCallback('set-lang', (lang) => {

            setLang(lang)
        }, 'windowControls');
    }, []);

    // TODO: Add functionality to the buttons:
        // - Help button should open a help page
        // - Lang button should open a language selection page
    return(
        <section className="window-controls">

            
            <ControlButton icon={"help"} onClick={function (): void {
                subEventHelper.getInstance().callEvent('rOpenUpdate');
            } }/>
            <ControlButton icon={"lang_"+lang} onClick={function (): void {

                subEventHelper.getInstance().callEvent('open_lang_page');
            } }/>
            <ControlButton icon={"hBar"} onClick={function (): void {
                subEventHelper.getInstance().send('app-hide');
            } }/>
            <ControlButton icon={maximized? 'minimize' : 'maximize'} onClick={function (): void {

                subEventHelper.getInstance().send('app-maximize', {maximize: maximized});

            } }/>
            <ControlButton icon={"close"} onClick={function (): void {
                subEventHelper.getInstance().send('app-quit');
            } }/>

        </section>
    )

};

export default WindowControls;