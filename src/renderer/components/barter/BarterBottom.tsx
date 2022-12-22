import React from "react";

import dataDict from "@src/typings/data";

import "./BarterBottom.scss";
import BarterBottomLeft from "./BarterBottomLeft";
import BarterBottomRight from "./BarterBottomRight";

type Props = {
    data: dataDict;
}

const BarterBottom: React.FC<Props> = (props: Props) => {

    return(
        <div className="app-barter-bottom">
            <div className="app-barter-bottom-content">
                <div className="app-barter-bottom-left-content">

                    <BarterBottomLeft data={props.data} />

                </div>
                <div></div>
                <BarterBottomRight data={props.data} />
            </div>
        </div>
    )
}

export default BarterBottom;