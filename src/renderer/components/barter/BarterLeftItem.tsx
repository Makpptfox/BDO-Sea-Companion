import React, { useEffect } from "react";

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
    
    
    useEffect(()=>{

        subEventHelper.getInstance().registerCallback("barterItemSelect",(icon, tier, name) => {
            
            const nameP = document.querySelector('.app-barter-left-content-zone-item-name p') as HTMLParagraphElement;
            nameP.style.fontSize = '16px';
            
            const oldContent = nameP.innerText;
            nameP.innerText = name;
            if(nameP.offsetHeight > 22 && nameP.offsetHeight < 39) {
                nameP.style.fontSize = '12px';
            } else if(nameP.offsetHeight >= 39 && nameP.offsetHeight < 52) {
                nameP.style.fontSize = '11px';
            } else {
                nameP.style.fontSize = '16px';
            }

            nameP.innerText = oldContent;

            document.getElementsByClassName('app-barter-left-content-zone-item')[0].setAttribute('style', 'opacity: 1;');
            try{
                setIcon(require('@assets/images/items/'+icon));
            } catch (e) {
                setIcon(require('@assets/images/items/empty.png'));
            }

            setName(name);
            setTier(tier);
            

        }, 'BarterLeftItem')
        return(
            ()=>{
                subEventHelper.getInstance().unregisterAllCallbacks("barterItemSelect");
            }
        )
    }, [])

    return(
        <div className={`app-barter-left-content-zone-item zone-item-tier-${tier}`} style={{opacity: '0'}}>


            <div className="app-barter-left-content-zone-item-tier">
                <p>Tier {tier}</p>
            </div>
            <div className="app-barter-left-content-zone-item-icon">
                <img src={icon}  draggable={false}/>
            </div>

            <div className="app-barter-left-content-zone-item-name">
                <p>{name}</p>
            </div>
        </div>

    )

}

export default BarterLeftItem;