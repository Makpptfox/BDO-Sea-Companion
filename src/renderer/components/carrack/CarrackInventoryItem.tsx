
import React, { useEffect } from 'react';

import dataDict from '@src/typings/data';
import subEventHelper from '@common/subEvent';

type Props = {
    data: dataDict;
    index: string;
}

const CarrackInventoryItem = (props: Props) => {

    const [content, setContent] = React.useState<JSX.Element>(<></>);

    useEffect(() => {
    const item_qty = props.data.save.inventory[0][props.index]? props.data.save.inventory[0][props.index][0] : 0;
    const item_img_src = props.data.carrack.items[0][props.index][0].image[0];
    const item_name = props.data.lang.carrack[0].items[0][props.index][0].name[0];

    import(`@assets/images/items/${item_img_src}`).then((img) => {

        const item_img = img['default'];
        
        const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
            
            const target = e.target;
    
            let qty = null;
    
            if (target instanceof HTMLDivElement) {
                qty = target.querySelector('p');
            } else {
                qty = target as HTMLParagraphElement;
            }
    
            if(qty instanceof HTMLInputElement) {
                return;
            }
    
            const input = document.createElement('input');
            input.type = 'number';
            input.value = qty?.innerText || '0';
            
            if (qty) {
    
                qty.replaceWith(input)
                input.focus();
                input.select();
            }
    
        }
    
        const blurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
            const target = e.target;
    
            let input = null;
    
            if (target instanceof HTMLDivElement) {
                input = target.querySelector('input');
            } else {
                input = target as HTMLInputElement;
            }
    
            const qty = document.createElement('p');
            qty.innerText = parseInt(input?.value).toString() === 'NaN' ? '0' : parseInt(input?.value).toString();
    
            if (input) {
                input.replaceWith(qty);
            }
        }
    
        const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
            
            // If key pressed is anyother than enter, escape or number keys, prevent the event
            const target = e.target as HTMLInputElement;
            let value = target.value;
            
            if (e.key === 'Enter') {
                target.blur();
            } else if (e.key === 'Escape') {
                target.value = item_qty.toString();
                target.blur();
            } else if (e.key.match(/^[0-9]+$/) || e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    
                if(e.key.match(/^[0-9]+$/)){
                    value = value + e.key;
                } else if (e.key === 'Backspace' || e.key === 'Delete') {
                    value = value.slice(0, -1);
                } else if (e.key === 'ArrowUp') {
                    value = (parseInt(value) + 1).toString();
                } else if (e.key === 'ArrowDown') {
                    value = (parseInt(value) - 1).toString();
                }
            }
    
            if(value === 'NaN' || value === '' || value.includes('-')){
                value = '0';
            }
    
            subEventHelper.getInstance().send('carrack-inventory-save-qty', props.index, parseInt(value))
            props.data.save.inventory[0] = props.data.save.inventory[0] || {};
            props.data.save.inventory[0][props.index] = props.data.save.inventory[0][props.index] || ["0"];
            props.data.save.inventory[0][props.index][0] = value;
            subEventHelper.getInstance().callEvent('update-carrack-need', props.data.save.inventory[0])
        }
    
        setContent(
            <div className="carrack-inventory-item">
                <div className="carrack-inventory-item-img">
                    <img src={item_img} alt={item_name + " image"} draggable={false}/>
                    <p>{item_name}</p>
                </div>
                <div className='carrack-inventory-item-qty' onClick={clickHandler} onBlur={blurHandler} onKeyDown={keyDownHandler} >
                    {/* Here, the qty need to be changed to an input when clicking on it */}
                    <p>{item_qty}</p>
                </div>
            </div>
        );
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        content
    );
};

export default CarrackInventoryItem;