import React, { useState } from 'react';

import './BarterLeftSelector.scss';
import win_ from '@src/typings/win';

type Props = {
    default: boolean;
    for: "Iliya" | "Epheria" | "Ancado"
    onChange: (value: boolean) => void;
    warn: boolean
}

const win:win_ = window;

const BarterLeftSelector:React.FC<Props> = (props: Props) => {

    const [checked, setChecked] = useState(props.default);
    const [warning, setWarning] = useState(false);
    const icon = require(`../../../../assets/icons/checkbox-cross.svg`);


    return(
        <div className={`app-barter-left-selector ${props.for.toLowerCase()}-selector ${checked && props.warn? 'warned' : ''}`}>
            {/* custom checkbox style */}
            <label>
                <input type='checkbox' checked={checked} onChange={() => {
                    setChecked(!checked)
                    props.onChange(!checked)
                    }} />
                <p>{props.for}</p>
                <div className='checkbox-border'>
                    <img className={`display-checkbox-${checked ? 'y' : 'n'}`} src={icon}/>
                </div>
            </label>
        </div>
    );
};

export default BarterLeftSelector;