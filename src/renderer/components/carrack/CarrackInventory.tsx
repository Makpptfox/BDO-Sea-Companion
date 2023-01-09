
import React from "react";

import dataDict from "@src/typings/data";
import CarrackInventoryItem from "./CarrackInventoryItem";

import "./CarrackInventory.scss"

type Props = {
    data: dataDict;
}

const CarrackInventory = (props: Props) => {

    const content: Array<JSX.Element> = [];

    Object.keys(props.data.carrack.items[0]).forEach((key) => {
        content.push(<CarrackInventoryItem key={key} data={props.data} index={key} />);
    });

    return (
        <div className="carrack-inventory">
            <div className="carrack-inventory-center">
                {content}
            </div>
        </div>
    );
};

export default CarrackInventory;