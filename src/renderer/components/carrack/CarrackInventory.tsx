
import React, { useEffect } from "react";

import dataDict from "@src/typings/data";
import CarrackInventoryItem from "./CarrackInventoryItem";

import "./CarrackInventory.scss"
import tempHelper from "@common/temp";

type Props = {
    data: dataDict;
    boatType: string;
}

const CarrackInventory = (props: Props) => {

    const content: Array<JSX.Element> = [];

    Object.keys(props.data.carrack.items[0]).forEach((key) => {

        if(props.data.carrack.items[0][key][0].trackable !== undefined && props.data.carrack.items[0][key][0].trackable[0] === "1") return;

        if(key.includes('Galleass')){
            if(props.boatType.toLowerCase() === 'advance') return;
            if(props.boatType.toLowerCase() === 'balance') return;
        } else if(key.includes('Caravel')){
            if(props.boatType.toLowerCase() === 'volante') return;
            if(props.boatType.toLowerCase() === 'valor') return;
        }
        content.push(<CarrackInventoryItem key={key} data={props.data} index={key} />);
    });

    useEffect(() => {
        setTimeout(() => {
            document.querySelectorAll('.carrack-inventory-item-img p').forEach((p: HTMLParagraphElement) => {

                if(p.offsetHeight > 18) {
                    p.style.fontSize = '12px';
                } 
            });

            const hasFocusItem = tempHelper.getInstance().has('focusItem');

            if(hasFocusItem) {

                console.log('hasFocusItem')

                const focusItem = tempHelper.getInstance().get('focusItem');
                tempHelper.getInstance().delete('focusItem');

                console.log('focusItem: ' + focusItem)

                document.querySelectorAll('.carrack-inventory-item-img p').forEach((p: HTMLParagraphElement) => {

                    if(p.innerText.toLowerCase() === focusItem.toLowerCase()) {
                        const parent = p.parentElement.parentElement as HTMLDivElement;

                        const input = parent.querySelector('.carrack-inventory-item-qty p') as HTMLParagraphElement;

                        input.click();
                    }
                });

            }
        }, 10);
    }, []);

    return (
        <div className="carrack-inventory">
            <div className="carrack-inventory-center">
                {content}
            </div>
        </div>
    );
};

export default CarrackInventory;