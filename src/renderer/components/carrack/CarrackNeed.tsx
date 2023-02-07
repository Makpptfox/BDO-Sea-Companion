
import React, { useEffect } from 'react';

import dataDict from '@src/typings/data';

import './CarrackNeed.scss'
import subEventHelper from '@common/subEvent';

type Props = {
    data: dataDict;
    boatType : 'volante' | 'advance' | 'balance' | 'valor';
}

type item = {
    name: string;
    name_lang: string;
    desc_lang: string;
    image: string;
    barter: string;
    coin: string;
    daily: string;
    qty: number;

}

const CarrackNeed  = (props: Props) => {
    // Props destructuring
    const { data, boatType } = props;
    
    // Get boat and item data from the data prop
    const boat = data.carrack.boat[0][boatType][0];
    const itemDict = data.carrack.items[0];
    
    // Get the need data for the selected boat type
    const need = boat.need[0];
    
    // Initialize the content state with a loading message
    const [content, setContent] = React.useState([<p key={"null"}>loading...</p>]);
    
    // Get the current inventory data
    let inventory = data.save.inventory[0];
    
    // Import check and not-check icons
    const check = require('@assets/icons/check.svg');
    const not_check = require('@assets/icons/not-check.svg');

    // Register a callback to update the need data when the 'update-carrack-need' event is emitted
    useEffect(() => {
    subEventHelper.getInstance().registerCallback('update-carrack-need', (data: any) => {

        // Update the inventory data
        inventory = ({...data});

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

                    if(totalNeeded.map((item) => item.name).includes(key2)) {
                        const index = totalNeeded.map((item) => item.name).indexOf(key2);
                        totalNeeded[index].qty += inventoryNeed;
                    } else {


                        const item: item = {
                            name: key2,
                            name_lang: props.data.lang.carrack[0].items[0][key2][0].name[0],
                            desc_lang: props.data.lang.carrack[0].items[0][key2][0].description? props.data.lang.carrack[0].items[0][key2][0].description[0] : props.data.lang.carrack[0].items[0][key2][0].name[0],
                            image: info.image[0],
                            barter: info.barter[0],
                            coin: info.coin[0],
                            daily: info.daily[0],
                            qty: inventoryNeed
                        }
                        totalNeeded.push(item);
                    }



                    // Create a JSX element for the current sub-need
                    // subContent.push(
                    // <div key={key2}>
                    //     <p>{`${key2}`}: {`${inventoryHave}`}/{`${inventoryNeed}`}</p>
                    //     <div className={`detail-${key2} hidden`}>
                    //         <div className='detail-daily'>
                    //             <p>daily</p>
                    //             <img src={daily}/>
                    //         </div>
                    //         <div className='detail-coin'>
                    //             <p>coin</p>
                    //             <img src={coin}/>
                    //         </div>
                    //         <div className='detail-barter'>
                    //             <p>barter</p>
                    //             <img src={barter}/>
                    //         </div>
                    //     </div>
                    // </div>);
                });
                // Create a JSX element for the current need type and add the sub-content to it
                contents.push(
                    // <div key={key}>
                    //     <p>
                    //         {`${key}`}: {`${need[key][0].quantity[0]}`}
                    //     </p>
                    //     {subContent}
                    // </div>
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

                    const info = itemDict[key][0];
                    
                    if(totalNeeded.map((item) => item.name).includes(key)) {
                        const index = totalNeeded.map((item) => item.name).indexOf(key);
                        totalNeeded[index].qty += parseInt(need[key][0].quantity[0]);
                    } else {
                        const item: item = {
                            name: key,
                            name_lang: props.data.lang.carrack[0].items[0][key][0].name[0],
                            desc_lang: props.data.lang.carrack[0].items[0][key][0].description? props.data.lang.carrack[0].items[0][key][0].description[0] : props.data.lang.carrack[0].items[0][key][0].name[0],
                            image: info.image[0],
                            barter: info.barter[0],
                            coin: info.coin[0],
                            daily: info.daily[0],
                            qty: parseInt(need[key][0].quantity[0])
                        }
                        totalNeeded.push(item);
                    }

                // Create a JSX element for the current need type without sub-content
                contents.push(
                    // <div key={key}>
                    //     <p>
                    //         {`${key}`}: {`${need[key][0].quantity[0]}`}
                    //     </p>
                    // </div>
                );
                }
        });

        // Create a JSX element for each of the total needed items
        totalNeeded.forEach((item) => {

            let havingQTY = 0;
            if(inventory[item.name] !== undefined) {
                if(parseInt(inventory[item.name][0]) > item.qty) {
                    havingQTY = item.qty;
                } else {
                    havingQTY = parseInt(inventory[item.name][0]);
                }
            }

            contents.push(
                <div key={item.name} className={`total-needed-item ${havingQTY == item.qty? 'complete':''}`} onClick={()=>{
                    const detail = document.querySelector(`.detail-${item.name}`);

                    if(detail !== null) {
                        if(detail.classList.contains("hidden")) {
                            detail.classList.remove("hidden");
                        } else {
                            detail.classList.add("hidden");
                        }
                    }
                }}>
                    <div className='info-item'>
                    <p>{`${item.name_lang}`}</p><p>{havingQTY}/{`${item.qty}`}</p>
                    </div>
                    <div className={`detail-${item.name} hidden detail-item`}>
                        <div className='detail-daily'>
                            <p>{props.data.lang.carrack[0].totalNeeded[0].daily[0]}</p>
                            <img src={item.daily === "1" ? check : not_check}/>
                        </div>
                        <div className='detail-coin'>
                            <p>{props.data.lang.carrack[0].totalNeeded[0].coin[0]}</p>
                            <img src={item.coin === "1" ? check : not_check}/>
                        </div>
                        <div className='detail-barter'>
                            <p>{props.data.lang.carrack[0].totalNeeded[0].barter[0]}</p>
                            <img src={item.barter === "1" ? check : not_check}/>
                        </div>
                    </div>
                </div>
            );
        });

        // Set the content state with the JSX elements
        setContent(contents);
    }, 'CarrackNeed');

    return(()=>{
        // Unsubscribe from the inventory data
        subEventHelper.getInstance().unregisterAllCallbacks('update-carrack-need');
    });

    }, []); // The empty array ensures the effect only runs on mount
    

    return (
        <div className="carrack-need">
            <h3>{props.data.lang.carrack[0].totalNeeded[0].title[0]}</h3>
            <div className='carrack-need-content'>
            {content}
            </div>
        </div>
    );
};


export default CarrackNeed;