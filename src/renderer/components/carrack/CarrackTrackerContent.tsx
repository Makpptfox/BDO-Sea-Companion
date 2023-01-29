
import React, { useEffect } from 'react';

import dataDict from '@src/typings/data';

import './CarrackTrackerContent.scss'
import subEventHelper from '@common/subEvent';
import { stringify } from 'querystring';

type Props = {
    data: dataDict;
    boatType : 'volante' | 'advance' | 'balance' | 'valor';
}

type item = {
    for: string;
    have: number;
    need: number;
}

const CarrackTrackerContent  = (props: Props) => {
    // Props destructuring
    const { data, boatType } = props;
    
    // Get boat and item data from the data prop
    const boat = data.carrack.boat[0][boatType][0];
    const itemDict = data.carrack.items[0];
    
    // Get the need data for the selected boat type
    const need = boat.need[0];
    
    // Initialize the content state with a loading message
    const [content, setContent] = React.useState([<p key={"null"}>loading...</p>]);
    
    // Import check and not-check icons
    const check = require('@assets/icons/check.svg');
    const not_check = require('@assets/icons/not-check.svg');

    // Register a callback to update the need data when the 'update-carrack-need' event is emitted
    useEffect(() => {
    
        // Get the current inventory data
        const data_ = ({...data});
        const inventory = JSON.parse(JSON.stringify(data_.save.inventory[0]));

        const totalNeeded: Array<item> = []

        // Set the content state to an empty array
        setContent([]);

        // Initialize an array to hold the JSX elements for the content
        const contents: JSX.Element[] = [];

        // Iterate over each need type in the need data
        Object.keys(need).forEach((key) => {
            // Check if the current need type has sub-needs
            if(need[key][0].need !== undefined){
                // Initialize an array to hold the JSX elements for the sub-content
                const subContent: Array<JSX.Element> = [];

                // Iterate over each sub-need in the current need type
                Object.keys(need[key][0].need[0]).forEach((key2) => {

                    // Get the inventory data for the current sub-need
                    let inventoryHave =
                        inventory[key2] !== undefined ? parseInt(inventory[key2][0]) : 0;

                    // Calculate the total inventory needed for the current sub-need
                    const inventoryNeed =
                        parseInt(need[key][0].need[0][key2][0]) *
                        parseInt(need[key][0].quantity[0]);

                    // Calculate the difference between the current inventory and the total needed
                    const diff =
                        inventoryHave - inventoryNeed > 0
                        ? inventoryHave - inventoryNeed
                        : 0;

                    inventory[key2][0] = `${diff}`;

                    if(inventoryHave > inventoryNeed) {
                        inventoryHave = inventoryNeed;
                    }

                    // Update the inventory data with the difference
                    // inventory[key2] = [`${diff}`];

                    // Get the item data for the current sub-need
                    const info = itemDict[key2][0];

                    // Determine whether the item can be obtained daily, with coins, or by bartering
                    const daily = info.daily[0] === "1" ? check : not_check;
                    const coin = info.coin[0] === "1" ? check : not_check;
                    const barter = info.barter[0] === "1" ? check : not_check;
                    const item: item = {
                        for: key,
                        have: inventoryHave,
                        need: inventoryNeed
                    }
                    totalNeeded.push(item);



                    // Create a JSX element for the current sub-need
                    subContent.push(
                    <div key={key2}>
                        <p  className={`${(inventoryHave === inventoryNeed)? "complete-solo" : ""} subItem`}><span>{`${props.data.lang.carrack[0].items[0][key2][0].name[0]}`}</span><span>{`${inventoryHave}`}/{`${inventoryNeed}`}</span></p>
                    </div>);
                });

                let totalNeed = 0
                let totalHave = 0

                totalNeeded.forEach((item) => {
                    if(item.for === key) {
                        totalNeed += 1
                        if(item.have === item.need) {
                            totalHave += 1
                        }
                    }
                })

                // Create a JSX element for the current need type and add the sub-content to it
                contents.push(
                    <div key={key} className={`carrack-tracker-content-item multi-content-item`}>
                        <p onClick={()=>{
                            const subContent = document.querySelector(`.sub-content-${key}`);
                            if(subContent !== null) {
                                subContent.classList.toggle("hidden");
                            }
                        }} className={`${totalHave == totalNeed? "complete" : ""} title`}>
                            <span>{`${props.data.lang.carrack[0].items[0][key][0].name[0]}`}</span> <span>{totalHave}/{totalNeed}</span>
                        </p>
                        <div className={`sub-content-${key} hidden`}>
                            {subContent}
                        </div>
                    </div>
                );
                } else {

                    if(itemDict[key] === undefined) {
                        itemDict[key] = [{
                            image: [""],
                            barter: ["0"],
                            coin: ["0"],
                            daily: ["0"]
                        }]
                    }

                    // Get the inventory data for the current sub-need
                    let inventoryHave =
                        inventory[key] !== undefined ? parseInt(inventory[key][0]) : 0;

                    // Calculate the total inventory needed for the current sub-need
                    const inventoryNeed = parseInt(need[key][0].quantity[0]);

                    if(inventoryHave > inventoryNeed) {
                        inventoryHave = inventoryNeed;
                    }
                // Create a JSX element for the current need type without sub-content
                contents.push(
                    <div key={key} className={`carrack-tracker-content-item`}>
                        <p className={`${inventoryHave == inventoryNeed? "complete" : ""} solo-content-item`}>
                            <span>{`${props.data.lang.carrack[0].items[0][key][0].name[0]}`}</span> <span>{`${inventoryHave}`}/{`${inventoryNeed}`}</span>
                        </p>
                    </div>
                );
                }
        });

        // Create a JSX element for each of the total needed items
        // totalNeeded.forEach((item) => {

        //     let havingQTY = 0;
        //     if(inventory[item.name] !== undefined) {
        //         if(parseInt(inventory[item.name][0]) > item.qty) {
        //             havingQTY = item.qty;
        //         } else {
        //             havingQTY = parseInt(inventory[item.name][0]);
        //         }
        //     }

        // });

        // Set the content state with the JSX elements
        setContent(contents);

    }, []); // The empty array ensures the effect only runs on mount
    

    return (
        <div className="carrack-tracker-content">
            <div className='carrack-tracker-content-items'>
                {content}
            </div>
        </div>
    );
};


export default CarrackTrackerContent;
