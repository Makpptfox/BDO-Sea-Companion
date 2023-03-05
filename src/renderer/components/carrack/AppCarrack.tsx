

// Create a react placeholder
import React, { useEffect } from "react";

import win_ from "@src/typings/win";
import dataDict from '@src/typings/data';

// Import the styles
import './AppCarrack.scss';
import CarrackTracker from "./CarrackTracker";
import subEventHelper from "@common/subEvent";
import tempHelper from "@common/temp";

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

        if(props.data.settings.settings.boatType[0].toLowerCase() !== undefined){
            setCarrackType(props.data.settings.settings.boatType[0].toLowerCase() as 'advance' | 'balance' | 'volante' | 'valor' | 'none');
        }

        if(tempHelper.getInstance().get('carrackType') !== undefined) {
            setCarrackType(tempHelper.getInstance().get('carrackType'));
        }

        subEventHelper.getInstance().registerCallback('returnCarrackType', () => {
            setCarrackType('none');
            props.data.settings.settings.boatType[0] = 'none';

            subEventHelper.getInstance().send('set-setting', {key: 'boatType', value: 'none'});

        }, 'AppCarrack')
        if(carrackType === 'none') {
            setContent(
            <div id='app-carrack'>
                <div id='app-carrack-title'>
                    {props.data.lang.carrack[0].selectScreen[0].title[0]}
                </div>
                <div id='app-carrack-content'>
                    <div className='app-carrack-box carrack-advance' onClick={()=>{
                        setCarrackType('advance')
                        tempHelper.getInstance().set('carrackType', 'advance');
                        props.data.settings.settings.boatType[0] = 'advance';
                        subEventHelper.getInstance().send('set-setting', {key: 'boatType', value: 'advance'});
                        }}>
                        <p>{props.data.lang.carrack[0].type[0].advance[0]}</p>
                        <img src={carrackAdvance} alt='Advance Carrack Image'  draggable={false}/>
                    </div>
                    <div className='app-carrack-box carrack-balance' onClick={()=>{
                        setCarrackType('balance')
                        tempHelper.getInstance().set('carrackType', 'balance');
                        props.data.settings.settings.boatType[0] = 'balance';
                        subEventHelper.getInstance().send('set-setting', {key: 'boatType', value: 'balance'});
                    }}>
                        <p>{props.data.lang.carrack[0].type[0].balance[0]}</p>
                        <img src={carrackBalance} alt='Balance Carrack Image'  draggable={false}/>
                    </div>
                    <div className='app-carrack-box carrack-volante' onClick={()=>{
                        setCarrackType('volante'); 
                        tempHelper.getInstance().set('carrackType', 'volante');
                        props.data.settings.settings.boatType[0] = 'volante';
                        subEventHelper.getInstance().send('set-setting', {key: 'boatType', value: 'volante'});
                        }}>
                        <p>{props.data.lang.carrack[0].type[0].volante[0]}</p>
                        <img src={carrackVolante} alt='Volante Carrack Image'  draggable={false}/>
                    </div>
                    <div className='app-carrack-box carrack-valor' onClick={()=>{
                        setCarrackType('valor')
                        tempHelper.getInstance().set('carrackType', 'valor');
                        props.data.settings.settings.boatType[0] = 'valor';
                        subEventHelper.getInstance().send('set-setting', {key: 'boatType', value: 'valor'});
                        }}>
                        <p>{props.data.lang.carrack[0].type[0].valor[0]}</p>
                        <img src={carrackValor} alt='Valor Carrack Image'  draggable={false}/>
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