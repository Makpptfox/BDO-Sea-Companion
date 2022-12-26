import React from "react";

// This is a component that will be used to create the buttons in the top right corner of the window
// It takes an icon and an onClick function as props
// The icon is a string that will be displayed in the button
// The onClick function is called when the button is clicked
type ControlButtonProps = {
    icon: string;
    onClick: () => void;
};

// This is the component itself that will be exported and used in other files
const ControlButton: React.FunctionComponent<ControlButtonProps> = (props) => {
    let icon = ""
    if(props.icon.includes('lang_')){
        icon = require(`@assets/icons/${props.icon}.png`);
    }else{
        icon = require(`@assets/icons/${props.icon}.svg`);
    }

    return (
        <div className='control-button' onClick={props.onClick}>
            <div className='control-button-icon'><img src={icon} alt={props.icon} height='16'/></div>
        </div>
    );
};

export default ControlButton;