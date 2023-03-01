import React from "react";

import dataDict from "@src/typings/data";

import "./BarterLeftSearch.scss";
import win_ from "@src/typings/win";
import subEventHelper from "@common/subEvent";

type Props = {
    data: dataDict;
    search: string;
};

const win: win_ = window;

const BarterLeftSearch: React.FC<Props> = (props: Props) => {

    const searchIco = require("../../../../assets/icons/search.svg");

    return (
        <div id="app-barter-left-content-zone-search">
            <input
                type="text"
                placeholder={props.data.lang.barter[0].left[0].searchPlaceholder[0]}
                defaultValue={props.search}
                onChange={(e) => {

                    subEventHelper.getInstance().callEvent("search-barter", e.target.value);


                    if(e.target.value !== "" || e.target.value.trim() !== ""){
                        const img = win.document.getElementById("app-barter-left-content-zone-search")?.children[1] as HTMLImageElement;

                        img.style.display = "none";
                    } else {
                        const img = win.document.getElementById("app-barter-left-content-zone-search")?.children[1] as HTMLImageElement;

                        img.style.display = "inherit";
                    }
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <img src={searchIco} />
        </div>
    );
};


export default BarterLeftSearch;
