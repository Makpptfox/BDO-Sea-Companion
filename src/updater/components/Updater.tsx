import subEventHelper from '@common/subEvent';
import React, { useState } from 'react';

import './Updater.scss'

// Create the component to render
const Updater: React.FC = () => {

    const [title, setTitle] = useState('Searching update');
    const [message, setMessage] = useState('Please wait...');

    subEventHelper.getInstance().registerCallback('update-downloaded', () => {
        
        setTitle('Update found');
        setMessage('It will be installed when you close the app');

        setTimeout(() => {
            // Send a message to the main process
            subEventHelper.getInstance().send('sUpdater');
        }, 2000);

    }, 'updater');

    subEventHelper.getInstance().registerCallback('error', ()=>{

        setTitle('Launching app')

        setMessage('No update found')
        setTimeout(() => {
            // Send a message to the main process
            subEventHelper.getInstance().send('sUpdater');
        }, 1000);

    }, 'updater')

    subEventHelper.getInstance().registerCallback('update-not-available', () => {

        console.log('Updater Window...');

        setTitle('Launching app')

        setMessage('No update found')
        setTimeout(() => {
            // Send a message to the main process
            subEventHelper.getInstance().send('sUpdater');
        }, 1000);

    }, 'updater');

    const logo = require('@assets/images/Logo.png');

  // Return the component to render
    return (
        <div id='BDOC-Updater'>
            <div id='BDOC-Updater-Header'>
                <img src={logo} alt='BDOSC Logo' width="100%" draggable={false}/>
            </div>
            <div id='BDOC-Updater-Body'>
                <p id='BDOC-Updater-Title'>{title}</p>
                <p id='BDOC-Updater-Message'>{message}</p>
            </div>
        </div>
    );
};

export default Updater;
