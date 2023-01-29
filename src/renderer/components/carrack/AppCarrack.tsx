

// Create a react placeholder
import React, { useEffect } from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

// Import the styles
import './AppCarrack.scss';
import CarrackTracker from "./CarrackTracker";
import subEventHelper from "@common/subEvent";

const win:win_ = window;

// Define the props
type Props = {
    data: dataDict;
}

const AppCarack = (props: Props) => {

    const [carrackType, setCarrackType] = React.useState('none' as 'advance' | 'balance' | 'volante' | 'valor' | 'none');

    const [content, setContent] = React.useState(
            <div id='app-carrack'>
                <p>loading...</p>
            </div> as JSX.Element);
    // Send notification to main process to change page
    win.api.send('pageChange', 'carrack');

    const carrackAdvance = require('@assets/images/carrack/'+props.data.carrack.boat[0].advance[0].image[0]);
    const carrackBalance = require('@assets/images/carrack/'+props.data.carrack.boat[0].balance[0].image[0]);
    const carrackVolante = require('@assets/images/carrack/'+props.data.carrack.boat[0].volante[0].image[0]);
    const carrackValor = require('@assets/images/carrack/'+props.data.carrack.boat[0].valor[0].image[0]);

    console.table(props.data.carrack)

    useEffect(() => {

        subEventHelper.getInstance().registerCallback('returnCarrackType', () => {
            setCarrackType('none');
        }, 'AppCarrack')
        if(carrackType === 'none') {
            setContent(
            <div id='app-carrack'>
                <div id='app-carrack-title'>
                    {props.data.lang.carrack[0].selectScreen[0].title[0]}
                </div>
                <div id='app-carrack-content'>
                    <div className='app-carrack-box carrack-advance' onClick={()=>{setCarrackType('advance')}}>
                        <p>{props.data.lang.carrack[0].type[0].advance[0]}</p>
                        <img src={carrackAdvance} alt='Advance Carrack Image' />
                    </div>
                    <div className='app-carrack-box carrack-balance' onClick={()=>{setCarrackType('balance')}}>
                        <p>{props.data.lang.carrack[0].type[0].balance[0]}</p>
                        <img src={carrackBalance} alt='Balance Carrack Image' />
                    </div>
                    <div className='app-carrack-box carrack-volante' onClick={()=>{setCarrackType('volante')}}>
                        <p>{props.data.lang.carrack[0].type[0].volante[0]}</p>
                        <img src={carrackVolante} alt='Volante Carrack Image' />
                    </div>
                    <div className='app-carrack-box carrack-valor' onClick={()=>{setCarrackType('valor')}}>
                        <p>{props.data.lang.carrack[0].type[0].valor[0]}</p>
                        <img src={carrackValor} alt='Valor Carrack Image' />
                    </div>
                </div>
            </div>
            )
        }
        else if(carrackType === 'advance') {
            setContent(
            <div id='app-carrack'>
                <CarrackTracker boatType='advance' data={props.data} />
            </div>
            )
        }
        else if(carrackType === 'balance') {
            setContent(
            <div id='app-carrack'>
                <CarrackTracker boatType='balance' data={props.data} />
            </div>
            )
        }
        else if(carrackType === 'volante') {
            setContent(
            <div id='app-carrack'>
                <CarrackTracker boatType='volante' data={props.data} />
            </div>
            )
        }
        else if(carrackType === 'valor') {
            setContent(
            <div id='app-carrack'>
                <CarrackTracker boatType='valor' data={props.data} />
            </div>
            )
        }
        return () => {
            subEventHelper.getInstance().unregisterAllCallbacks('returnCarrackType')
        }
    }, [carrackType]);

    // Return the react component
    return(
        content
    );
};

export default AppCarack;