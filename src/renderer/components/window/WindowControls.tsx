import React from "react";
import ControlButton from "./controlButton";
import subEventHelper from "@common/subEvent";

const WindowControls = () => {

    const [maximized, setMaximized] = React.useState(false);

    const [lang, setLang] = React.useState('en');

    subEventHelper.getInstance().registerCallback('app-maximize-reply', (maximize) => {

        setMaximized(maximize)

    }, 'windowControls');

    subEventHelper.getInstance().registerCallback('set-lang', (lang) => {

        setLang(lang)
    }, 'windowControls');

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