import subEventHelper from "@common/subEvent";
import dataDict from "@src/typings/data";
import React, { useEffect } from "react";
import CarrackInventory from "./CarrackInventory";
import CarrackMenu from "./CarrackMenu";
import CarrackNeed from "./CarrackNeed";

import "./CarrackTracker.scss"
import CarrackTrackerContent from "./CarrackTrackerContent";


type Props = {
    data: dataDict;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boatType: any;
}

const CarrackTracker = (props: Props) => {

    const [state, setState] = React.useState("inventory");
    const [content, setContent] = React.useState<JSX.Element>(<div><p>loading...</p></div> as JSX.Element);

    const boatType = props.boatType;

    const inventory = props.data.save.inventory[0];



    useEffect(() => {
        switch(state) {
            case "inventory":
                setContent(
                    <div className="carrack">
                        <div className="carrack-left">
                            <CarrackMenu data={props.data} state="inventory" setState={setState} boatType={props.boatType} />
                        </div>
                        <div className="carrack-center">
                            <CarrackInventory data={props.data} />
                        </div>
                        <div className="carrack-right">
                            <CarrackNeed data={props.data} boatType={boatType} />
                        </div>
                    </div>
                )
                break;
            case "tracker":
                setContent(
                    <div className="carrack">
                        <div className="carrack-left">
                            <CarrackMenu data={props.data} state="tracker" setState={setState} boatType={props.boatType} />
                        </div>
                        <div className="carrack-center">
                            <CarrackTrackerContent data={props.data} boatType={boatType} />
                        </div>
                        <div className="carrack-right">
                            <CarrackNeed data={props.data} boatType={boatType} />
                        </div>
                    </div>
                )
                break;
            default:
                setContent(
                    <div>
                        <p>loading...</p>
                    </div>
                )
                break;
        }
        
        subEventHelper.getInstance().callEvent('update-carrack-need', inventory)
    }, [state])

    return (
        <div className="app-carrack-tracker">
            {content}
        </div>
    );
};

export default CarrackTracker;