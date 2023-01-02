

// Create a react placeholder
import React from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

const win:win_ = window;

// Define the props
type Props = {
    data: dataDict;
}

const AppCarack: React.FC<Props> = (props: Props) => {

    // Send notification to main process to change page
    win.api.send('pageChange', 'carrack');

    const carrackAdvance = require('@assets/images/carrack/'+props.data.carrack.boat[0].advance[0].image[0]);
    const carrackBalance = require('@assets/images/carrack/'+props.data.carrack.boat[0].balance[0].image[0]);
    const carrackVolante = require('@assets/images/carrack/'+props.data.carrack.boat[0].volante[0].image[0]);
    const carrackValor = require('@assets/images/carrack/'+props.data.carrack.boat[0].valor[0].image[0]);

    console.table(props.data.carrack)

    // Return the react component
    return(
        <div id='app-carrack'>
            <div id='app-carrack-title'>{props.data.lang.carrack[0].selectScreen[0].title[0]}</div>
            <div id='app-carrack-content'>
                <div className='app-carrack-box carrack-advance'>
                    <p>{props.data.lang.carrack[0].type[0].advance[0]}</p>
                    <img src={carrackAdvance} alt='Advance Carrack Image' />
                </div>
                <div className='app-carrack-box carrack-balance'>
                    <p>{props.data.lang.carrack[0].type[0].balance[0]}</p>
                    <img src={carrackBalance} alt='Balance Carrack Image' />
                </div>
                <div className='app-carrack-box carrack-volante'>
                    <p>{props.data.lang.carrack[0].type[0].volante[0]}</p>
                    <img src={carrackVolante} alt='Volante Carrack Image' />
                </div>
                <div className='app-carrack-box carrack-valor'>
                    <p>{props.data.lang.carrack[0].type[0].valor[0]}</p>
                    <img src={carrackValor} alt='Valor Carrack Image' />
                </div>
            </div>
        </div>
    );
};

export default AppCarack;