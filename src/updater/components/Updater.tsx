import subEventHelper from '@common/subEvent';
import React, { useState } from 'react';

import './Updater.scss'

// Create the component to render
const Updater: React.FC = () => {

    const [title, setTitle] = useState('Searching update');
    const [message, setMessage] = useState('Please wait...');

    setTimeout(() => {
        console.log('Updater Window...');

        setTitle('Launching app')

        setMessage('No update found')

        setTimeout(() => {
            // Send a message to the main process
            subEventHelper.getInstance().send('sUpdater');
        }, 200);
    }, 1000);

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
