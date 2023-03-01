
import React, { useEffect } from 'react';

import dataDict from '@src/typings/data';

import './CarrackTrackerContent.scss'
import subEventHelper from '@common/subEvent';
import { stringify } from 'querystring';
import tempHelper from '@common/temp';

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
    let need = boat.need;
    
    // Initialize the content state with a loading message
    const [content, setContent] = React.useState([<p key={"null"}>loading...</p>]);
    
    // Import check and not-check icons
    const check = require('@assets/icons/check.svg');
    const not_check = require('@assets/icons/not-check.svg');

    // Register a callback to update the need data when the 'update-carrack-need' event is emitted
    useEffect(() => {

        console.log("Registering update-carrack-need callback")

        const temp = tempHelper.getInstance();
        console.log("getting temp instance")
    
        // Get the current inventory data
        const data_ = ({...data});
        const inv = JSON.parse(JSON.stringify(data_.save.inventory[0]));

        let order: any;

        if(temp.has('carrack-order')){

            order = temp.get('carrack-order');

            if(order.boat !== boatType){
                order = {
                    boat: boatType,
                    items: Array<any>()
                }
                temp.set('carrack-order', order);
            }

        } else {

            order = {
                boat: boatType,
                items: ['fishBone']
            };

            temp.set('carrack-order', {
                boat: boatType,
                items: ['fishBone']
            });
        }

        const reloadContent = (invCopy: any) => {

            const inventory = JSON.parse(JSON.stringify(invCopy));

            // Change order of the need array to match the order of the order array
            console.log("Ordering need array")
            
            Object.keys(need[0]).forEach((key) => {
                if(order.items.indexOf(key) === -1){
                    order.items.push(key)
                }
            });

            const newJSONOrder: any = [{}];

            order.items.forEach((key:string) => {
                const data = need[0][key];
                newJSONOrder[0][key] = data;
            });

            need = newJSONOrder

            const totalNeeded: Array<item> = []

            // Set the content state to an empty array
            setContent([]);

            // Initialize an array to hold the JSX elements for the content
            const contents: JSX.Element[] = [];

            // Iterate over each need type in the need data
            Object.keys(need[0]).forEach((key, index) => {

                // Check if the current need type has sub-needs
                if(need[0][key][0].need !== undefined){
                    // Initialize an array to hold the JSX elements for the sub-content
                    const subContent: Array<JSX.Element> = [];

                    // Iterate over each sub-need in the current need type
                    Object.keys(need[0][key][0].need[0]).forEach((key2) => {

                        // Get the inventory data for the current sub-need
                        let inventoryHave =
                            inventory[key2] !== undefined ? parseInt(inventory[key2][0]) : 0;

                        // Calculate the total inventory needed for the current sub-need
                        const inventoryNeed =
                            parseInt(need[0][key][0].need[0][key2][0]) *
                            parseInt(need[0][key][0].quantity[0]);

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

                    let dragY = 0;

                    // Create a JSX element for the current need type and add the sub-content to it
                    contents.push(
                        <div key={key} className={`carrack-tracker-content-item multi-content-item`} id={key}>
                            <div className={`${totalHave == totalNeed? "complete" : ""}  content-header`}  onClick={()=>{
                                    const subContent = document.querySelector(`.sub-content-${key}`);
                                    if(subContent !== null) {
                                        subContent.classList.toggle("hidden");
                                    }
                                }} >
                                <p className={`title`}>
                                    <span>{`${props.data.lang.carrack[0].items[0][key][0].name[0]}`}</span> <span>{totalHave}/{totalNeed}</span>
                                </p>
                                <span id={`drag-${key}`} className='drag' onDragStart={(e:React.DragEvent)=>{
                                    const img = document.createElement("img");
                                    e.dataTransfer.setDragImage(img, 0, 0);

                                    dragY = e.currentTarget.getBoundingClientRect().top;
                                    e.currentTarget.parentElement.parentElement.style.zIndex = "100";
                                    e.currentTarget.parentElement.parentElement.style.opacity = "0.8";
                                }} onDrag={(e: React.DragEvent) => {
                                    const img = document.createElement("img");
                                    e.dataTransfer.setDragImage(img, 0, 0);

                                    e.currentTarget.parentElement.parentElement.style.transform = `translateY(${e.clientY - dragY}px)`;

                                }} onDragEnd={(e:React.DragEvent)=>{

                                    e.currentTarget.parentElement.parentElement.style.transform = `translateY(0px)`;
                                    e.currentTarget.parentElement.parentElement.style.zIndex = "0";
                                    e.currentTarget.parentElement.parentElement.style.opacity = "1";
                                    // get the element where the element is dropped
                                    let dropElement = document.elementFromPoint(e.clientX, e.clientY);
                                    let test = 0;


                                    if(dropElement === null){
                                        return;
                                    }

                                    while (!dropElement.classList?.contains("carrack-tracker-content-item") || test > 10) {
                                        dropElement = dropElement.parentElement;
                                        if(dropElement === null){
                                            return;
                                        }
                                        test += 1;
                                    }

                                    const newPositionY = e.clientY - e.currentTarget.getBoundingClientRect().top;

                                    const oldPositionY = e.currentTarget.getBoundingClientRect().top

                                    if(newPositionY < -20){
                                        let parent = e.currentTarget.parentElement;

                                        while(!parent.classList.contains("carrack-tracker-content-item")){
                                            parent = parent.parentElement;
                                        }

                                        if(dropElement !== null){
                                            const mainParent = parent.parentElement;

                                            if(mainParent !== null){
                                                parent.remove();
                                                mainParent.insertBefore(parent, dropElement);

                                                const newOrder: any[] = [];

                                                order.items.forEach((item:any, key:any) => {

                                                    if(item !== dropElement.id && item !== parent.id){
                                                        newOrder.push(item);
                                                    } else if(item === parent.id) {
                                                        newOrder.push(dropElement.id);
                                                    } else if(item === dropElement.id) {
                                                        newOrder.push(parent.id);
                                                    }
                                                });

                                                order.items = newOrder;
                                                temp.set("carrack-order", order)

                                                reloadContent(inv);
                                            }
                                        }
                                    } else if(newPositionY > 50){
                                        let parent = e.currentTarget.parentElement;

                                        while(!parent.classList.contains("carrack-tracker-content-item")){
                                            parent = parent.parentElement;
                                        }

                                        const bottomBrother = dropElement;

                                        if(bottomBrother !== null){
                                            const mainParent = parent.parentElement;

                                            if(mainParent !== null){
                                                parent.remove();
                                                mainParent.insertBefore(parent, bottomBrother.nextElementSibling);

                                                const newOrder: any[] = [];

                                                order.items.forEach((item:any, key:any) => {

                                                    if(item !== dropElement.id && item !== parent.id){
                                                        newOrder.push(item);
                                                    } else if(item === parent.id) {
                                                        newOrder.push(dropElement.id);
                                                    } else if(item === dropElement.id) {
                                                        newOrder.push(parent.id);
                                                    }
                                                });

                                                order.items = newOrder;
                                                temp.set("carrack-order", order)

                                                reloadContent(inv);
                                            }
                                        }
                                    }
                                }} draggable={true}>&#9776;</span>
                            </div>
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
                        const inventoryNeed = parseInt(need[0][key][0].quantity[0]);

                        if(inventoryHave > inventoryNeed) {
                            inventoryHave = inventoryNeed;
                        }

                        let dragY = 0;
                    // Create a JSX element for the current need type without sub-content
                    contents.push(
                        <div key={key} className={`carrack-tracker-content-item`}  id={key}>
                            <div className={`${inventoryHave == inventoryNeed? "complete" : ""}  content-header solo-content-item`} >
                                <p>
                                    <span>{`${props.data.lang.carrack[0].items[0][key][0].name[0]}`}</span> <span>{`${inventoryHave}`}/{`${inventoryNeed}`}</span>
                                </p>
                                <span id={`drag-${key}`} className='drag' onDragStart={(e:React.DragEvent)=>{
                                    const img = document.createElement("img");
                                    e.dataTransfer.setDragImage(img, 0, 0);
                                    dragY = e.currentTarget.getBoundingClientRect().top;
                                    e.currentTarget.parentElement.parentElement.style.zIndex = "100";
                                    e.currentTarget.parentElement.parentElement.style.opacity = "0.8";
                                }} onDrag={(e: React.DragEvent) => {
                                    const img = document.createElement("img");
                                    e.dataTransfer.setDragImage(img, 0, 0);
                                    e.currentTarget.parentElement.parentElement.style.transform = `translateY(${e.clientY - dragY}px)`;
                                }} onDragEnd={(e:React.DragEvent)=>{
                                    // get the element where the element is dropped
                                    let dropElement = document.elementFromPoint(e.clientX, e.clientY);
                                    let test = 0;

                                    e.currentTarget.parentElement.parentElement.style.transform = `translateY(0px)`;
                                    e.currentTarget.parentElement.parentElement.style.zIndex = "0";
                                    e.currentTarget.parentElement.parentElement.style.opacity = "1";

                                    if(dropElement === null){
                                        return;
                                    }

                                    while (!dropElement.classList?.contains("carrack-tracker-content-item") || test > 10) {
                                        dropElement = dropElement.parentElement;
                                        if(dropElement === null){
                                            return;
                                        }
                                        test += 1;
                                    }

                                    const newPositionY = e.clientY - e.currentTarget.getBoundingClientRect().top;

                                    const oldPositionY = e.currentTarget.getBoundingClientRect().top

                                    if(newPositionY < -20){
                                        let parent = e.currentTarget.parentElement;

                                        while(!parent.classList.contains("carrack-tracker-content-item")){
                                            parent = parent.parentElement;
                                        }

                                        if(dropElement !== null){
                                            const mainParent = parent.parentElement;

                                            if(mainParent !== null){
                                                parent.remove();
                                                mainParent.insertBefore(parent, dropElement);

                                                const newOrder: any[] = [];

                                                order.items.forEach((item:any, key:any) => {

                                                    if(item !== dropElement.id && item !== parent.id){
                                                        newOrder.push(item);
                                                    } else if(item === parent.id) {
                                                        newOrder.push(dropElement.id);
                                                    } else if(item === dropElement.id) {
                                                        newOrder.push(parent.id);
                                                    }
                                                });

                                                order.items = newOrder;
                                                temp.set("carrack-order", order)

                                                reloadContent(inv);
                                            }
                                        }
                                    } else if(newPositionY > 50){
                                        let parent = e.currentTarget.parentElement;

                                        while(!parent.classList.contains("carrack-tracker-content-item")){
                                            parent = parent.parentElement;
                                        }

                                        const bottomBrother = dropElement;

                                        if(bottomBrother !== null){
                                            const mainParent = parent.parentElement;

                                            if(mainParent !== null){
                                                parent.remove();
                                                mainParent.insertBefore(parent, bottomBrother.nextElementSibling);

                                                const newOrder: any[] = [];

                                                order.items.forEach((item:any, key:any) => {

                                                    if(item !== dropElement.id && item !== parent.id){
                                                        newOrder.push(item);
                                                    } else if(item === parent.id) {
                                                        newOrder.push(dropElement.id);
                                                    } else if(item === dropElement.id) {
                                                        newOrder.push(parent.id);
                                                    }
                                                });

                                                order.items = newOrder;
                                                temp.set("carrack-order", order)

                                                reloadContent(inv);
                                            }
                                        }
                                    }

                                }} draggable={true}>&#9776;</span>
                            </div>
                        </div>
                    );
                    }
            });
            
            // Set the content state with the JSX elements
            setContent(contents);
        }

        reloadContent(inv);

    }, []); // The empty array ensures the effect only runs on mount
    

    return (
        <div className="carrack-tracker-content">
            <div className='carrack-tracker-content-items'>
                {content}
            </div>
        </div>
    );
};

function array_move(arr: Array<any>, old_index: number, new_index: number): Array<any> {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}


export default CarrackTrackerContent;
