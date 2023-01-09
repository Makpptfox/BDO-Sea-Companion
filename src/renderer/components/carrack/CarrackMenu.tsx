
import React, { useEffect } from "react";

import dataDict from "@src/typings/data";

import "./CarrackMenu.scss"

type Props = {
    data: dataDict;
    state: string;
    setState: (state: string) => void;
}

const CarrackMenu = (props: Props) => {
    
        const [content, setContent] = React.useState<JSX.Element>(<div><p>loading...</p></div> as JSX.Element);

        const [item, setItem] = React.useState(<div><p>nothing...</p></div>);

        useEffect(() => {
            console.log("CarrackMenu: ", props.state)
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