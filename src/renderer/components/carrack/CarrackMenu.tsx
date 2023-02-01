
import React, { useEffect } from "react";

import dataDict from "@src/typings/data";

import "./CarrackMenu.scss"
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
    state: string;
    boatType: string;
    setState: (state: string) => void;
}

const CarrackMenu = (props: Props) => {
    
        const [imageCarrack] = React.useState<string>(require('@assets/images/carrack/'+props.data.carrack.boat[0][props.boatType][0].image[0]));
        const [content, setContent] = React.useState<JSX.Element>(<div><p>loading...</p></div> as JSX.Element);

        useEffect(() => {

            const item = (
                <div className={`carrack-menu-item ${props.boatType}`} onClick={()=>{
                    subEventHelper.getInstance().callEvent('returnCarrackType');
                }}>
                    <img src={imageCarrack} alt="carrack" />
                    <p>{props.boatType}</p>
                </div>
            )

            setContent(
                <div className="carrack-menu">
                    <div className="carrack-menu-header">
                        <div className={`carrack-menu-button ${props.state === "inventory"? "select":""}`} onClick={() => props.setState("inventory")}>
                            <p>{props.data.lang.carrack[0].menu[0].inventory[0]}</p>
                        </div>
                        <div className={`carrack-menu-button ${props.state === "tracker"? "select":""}`} onClick={() => props.setState("tracker")}>
                            <p>{props.data.lang.carrack[0].menu[0].tracker[0]}</p>
                        </div>
                    </div>
                    <div className="carrack-menu-footer">
                        {item}
                    </div>
                </div>
            );
        }, [props.state]);
    
        return (
            content
        );
    };

export default CarrackMenu;