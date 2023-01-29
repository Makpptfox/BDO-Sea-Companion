import React from "react";

import dataDict from "@src/typings/data";

import "./BarterLeftItem.scss";
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BarterLeftItem: React.FC<Props> = (_props: Props) => {

    const [icon, setIcon] = React.useState<string>(require('@assets/images/items/empty.png'));
    const [name, setName] = React.useState<string>("");
    const [tier, setTier] = React.useState<number>(1);

    subEventHelper.getInstance().registerCallback("barterItemSelect",(icon, tier, name) => {

        try{
            setIcon(require('@assets/images/items/'+icon));
        } catch (e) {
            setIcon(require('@assets/images/items/empty.png'));
        }
        
        setName(name);
        setTier(tier);
    }, 'BarterLeftItem')

    return(
        <div className={`app-barter-left-content-zone-item zone-item-tier-${tier}`}>

            <div className="app-barter-left-content-zone-item-icon">
                <img src={icon} />
            </div>

            <div className="app-barter-left-content-zone-item-name">
                <p>{name}</p>
            </div>

            <div className="app-barter-left-content-zone-item-tier">
                <p>Tier {tier}</p>
            </div>
        </div>

    )

}

export default BarterLeftItem;