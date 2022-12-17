import React from "react";
import ControlButton from "./controlButton";

const WindowControls = () => {

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
            <ControlButton icon={"lang"} onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
            <ControlButton icon={"minimize"} onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>
            <ControlButton icon={"close"} onClick={function (): void {
                throw new Error("Function not implemented.");
            } }/>

        </section>
    )

};

export default WindowControls;