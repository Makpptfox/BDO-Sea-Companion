import React from "react";
import ControlButton from "./controlButton";
import win_ from '@src/typings/win';
import { barterEventManager } from "@components/barter/barterEventManager";

const WindowControls = () => {

    const [maximized, setMaximized] = React.useState(false);

    const [lang, setLang] = React.useState('en');

    const win:win_ = window;

    barterEventManager.onAppMaximizeReply('windowControls', (maximize) => {
        setMaximized(maximize)
    });

    barterEventManager.onSetLang('windowControls', (lang) => {
        console.log("lang");

        setLang(lang)
    });

    // TODO: Add functionality to the buttons:
        // - Help button should open a help page
        // - Lang button should open a language selection page
        // - Minimize button should minimize the application
        // - Close button should close the application
    return(
        <section className="window-controls">

            
            <ControlButton icon={"help"} onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
            <ControlButton icon={"lang_"+lang} onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
            <ControlButton icon={maximized? 'minimize' : 'maximize'} onClick={function (): void {
                win.api.send('app-maximize', {maximize: maximized});
            } }/>
            <ControlButton icon={"close"} onClick={function (): void {
                win.api.send('app-quit');
            } }/>

        </section>
    )

};

export default WindowControls;