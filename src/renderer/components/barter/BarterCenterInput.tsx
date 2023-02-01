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
    
    const value = isNaN(props.value) ? 0 : props.value;

    return(
        <span className="input-center-item" >
            {
                props.showInputEle ? (
                    <input
                        type="number"
                        className="input-number-barter"
                        defaultValue={value}
                        onChange={props.handleChange}
                        onKeyDown={(e) => {

                            switch (e.key) {
                                case 'Enter':
                                    props.handleBlur();
                                    break;
                                case 'Escape':
                                    props.handleBlur();
                                    break;
                                default:
                                    break;
                            }

                        }}
                        onKeyDownCapture={(e) => {
                            switch (e.key) {
                                
                                case 'ArrowUp':{
                                    e.preventDefault();
                                    
                                    const from = e.target as HTMLInputElement;
                                    const parent = from.parentElement.parentElement as HTMLElement;

                                    let keyToFocusTR = -1
                                    let keyToFocusTD = -1;

                                    parent.classList.add('old-focus');

                                    // Get the key of the element to focus
                                    Object.keys(parent.parentElement.parentElement.children).forEach((value, key) => {
                                        // Check if the element is empty; if it is, skip it
                                        if(parent.parentElement.parentElement.children[key].children.length === 0) return;

                                        // Check if the element is the one to focus
                                        if([...parent.parentElement.parentElement.children[key].children].filter((child, index) => {

                                            if(child.classList.contains('old-focus')){

                                                child.classList.remove('old-focus');

                                                keyToFocusTR = key;
                                                keyToFocusTD = index;
                                                return true;
                                            }
                                            return false;
                                        })) {
                                            return;
                                        }
                                    })

                                    // Check if the next element is the last one or not
                                    if(keyToFocusTR-1 <= -1) return;

                                    // Get the next element to focus with array method
                                    const nextIndex = parent.parentElement.parentElement.children[keyToFocusTR-1].children[keyToFocusTD].children[0].children[0] as HTMLSpanElement;

                                    if(nextIndex.parentElement.parentElement.style.display === 'none') return;
                                    
                                    // Blur the current element and focus the next one
                                    from.blur();
                                    nextIndex.click();
                                    break;
                                }
                                case 'ArrowDown':{
                                    e.preventDefault();
                                    
                                    const from = e.target as HTMLInputElement;
                                    const parent = from.parentElement.parentElement as HTMLElement;

                                    let keyToFocusTR = -1
                                    let keyToFocusTD = -1;

                                    parent.classList.add('old-focus');

                                    // Get the key of the element to focus
                                    Object.keys(parent.parentElement.parentElement.children).forEach((value, key) => {
                                        // Check if the element is empty; if it is, skip it
                                        if(parent.parentElement.parentElement.children[key].children.length === 0) return;

                                        // Check if the element is the one to focus
                                        if([...parent.parentElement.parentElement.children[key].children].filter((child, index) => {

                                            if(child.classList.contains('old-focus')){

                                                child.classList.remove('old-focus');
                                                keyToFocusTR = key;
                                                keyToFocusTD = index;
                                                return true;
                                            }
                                            return false;
                                        })) {
                                            return;
                                        }
                                    })

                                    // Check if the next element is the last one or not
                                    if(keyToFocusTR === -1 || keyToFocusTR+1 >= parent.parentElement.parentElement.children.length) return;

                                    // Get the next element to focus
                                    const nextIndex = parent.parentElement.parentElement.children[keyToFocusTR+1].children[keyToFocusTD].children[0].children[0] as HTMLSpanElement;
                                    
                                    if(nextIndex.parentElement.parentElement.style.display === 'none') return;
                                    // Blur the current element and focus the next one
                                    from.blur();
                                    nextIndex.click();
                                    break;
                                }
                                case 'ArrowLeft':{
                                    e.preventDefault();
                                    const from = e.target as HTMLInputElement;
                                    const parent = from.parentElement as HTMLElement;
                                    
                                    parent.classList.add('old-focus');

                                    // Get the key of the element to focus
                                    Object.keys(parent.parentElement.parentElement.children).forEach((value, key) => {
                                        // Check if the element is empty; if it is, skip it
                                        if(parent.parentElement.parentElement.children[key].children.length === 0) return;

                                        const child = parent.parentElement.parentElement.children[key].children[0] as HTMLElement;

                                        // Check if the element is the one to focus
                                        if(child.classList.contains('old-focus')){

                                            child.classList.remove('old-focus');

                                            // Check if the next element is the last one or not
                                            if(!parent.parentElement.parentElement.children[key - 1]) return;

                                            // Get the next element to focus
                                            let prev = parent.parentElement.parentElement.children[key - 1].children[0] as HTMLElement;

                                            if(!prev) return;

                                            if(prev.parentElement !== undefined && prev.parentElement.style.display === 'none'){
                                                if(!parent.parentElement.parentElement.children[key - 2]) return;
                                                prev = parent.parentElement.parentElement.children[key - 2].children[0] as HTMLElement;
                                                if(!prev) return;
                                                if(prev.parentElement && prev.parentElement.style.display === 'none'){
                                                    return;
                                                }
                                            }
                                            if(prev){
                                                const input = prev.children[0] as HTMLSpanElement;

                                                // Blur the current element and focus the next one
                                                input.click();
                                                from.blur();
                                            }
                                        }
                                    })
                                    break;
                                }
                                case 'ArrowRight':{
                                    e.preventDefault();
                                    
                                    const from = e.target as HTMLInputElement;
                                    const parent = from.parentElement as HTMLElement;
                                    
                                    parent.classList.add('old-focus');

                                    // Get the key of the element to focus
                                    Object.keys(parent.parentElement.parentElement.children).forEach((value, key) => {
                                        // Check if the element is empty; if it is, skip it
                                        if(parent.parentElement.parentElement.children[key].children.length === 0) return;

                                        const child = parent.parentElement.parentElement.children[key].children[0] as HTMLElement;

                                        // Check if the element is the one to focus
                                        if(child.classList.contains('old-focus')){
                                            child.classList.remove('old-focus');

                                            // Check if the next element is the last one or not
                                            if(!parent.parentElement.parentElement.children[key + 1]) return;

                                            // Get the next element to focus
                                            let prev = parent.parentElement.parentElement.children[key + 1].children[0] as HTMLElement;
                                            
                                            if(prev.parentElement && prev.parentElement.style.display === 'none'){
                                                if(!parent.parentElement.parentElement.children[key + 2]) return;
                                                prev = parent.parentElement.parentElement.children[key + 2].children[0] as HTMLElement;
                                                if(prev.parentElement && prev.parentElement.style.display === 'none'){
                                                    return;
                                                }
                                            }
                                            if(prev){
                                                const input = prev.children[0] as HTMLSpanElement;

                                                // Blur the current element and focus the next one
                                                input.click();
                                                from.blur();
                                            }
                                        }
                                    })
                                    break;
                                }
                                default:
                                    break;
                            }
                        }}
                        onBlur={props.handleBlur}
                        autoFocus
                        onFocus={(e) => {
                            e.target.select();
                        }}
                    />
                ) : (
                <span
                    onClick={props.handleDoubleClick}
                    className="table-edit"
                >
                    {value}
                </span>
                )
            }
        </span>
    )
}

export default ElementMaker;