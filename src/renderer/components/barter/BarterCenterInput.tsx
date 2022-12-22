// ElementMaker.js

import React from "react";

type Props = {
    showInputEle: boolean;
    // data: dataDict;
    value: number;
    // setValue: (value: number) => void;
    handleChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event?: React.FocusEvent<HTMLInputElement>) => void;
    handleDoubleClick: (event?: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    limit: number;
}

const ElementMaker: React.FC<Props> = (props: Props) => {
    
    return(
        <span>
            {
                props.showInputEle ? (
                <input
                    type="number"
                    className="input-number-barter"
                    defaultValue={props.value}
                    onChange={props.handleChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.handleBlur();
                        }
                        if (e.key === 'Escape') {
                            props.handleBlur();
                        }
                    }}
                    onBlur={props.handleBlur}
                    autoFocus
                ></input>
                ) : (
                <span
                    onDoubleClick={props.handleDoubleClick}
                    className="table-edit"
                >
                    {props.value}
                </span>
                )
            }
        </span>
    )
}

export default ElementMaker;