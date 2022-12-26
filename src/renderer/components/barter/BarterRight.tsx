// TODO : Add the thresold warning for the barter tier button
import React from 'react';

import './BarterRight.scss';

type Props = {
    onClick: (tier: number, hide:boolean) => void;
};


let doOnce = (setTier1Warning: (value: boolean) => void, setTier2Warning: (value: boolean) => void, setTier3Warning: (value: boolean) => void, setTier4Warning: (value: boolean) => void, setTier5Warning: (value: boolean) => void) => {
    doOnce = ()=>{return null}


    const parent = document.getElementsByTagName('tbody')[0].children

    let setWarning = setTier1Warning;

    for (let i = 0; i < parent.length; i++) {
        const targets = parent[i].children

        if(parent[i].classList.contains('tier-1')) {
            setWarning = setTier1Warning;
        } else if (parent[i].classList.contains('tier-2')) {
            setWarning = setTier2Warning;
        } else if (parent[i].classList.contains('tier-3')) {
            setWarning = setTier3Warning;
        } else if (parent[i].classList.contains('tier-4')) {
            setWarning = setTier4Warning;
        } else if (parent[i].classList.contains('tier-5')) {
            setWarning = setTier5Warning;
        }
        for (let i = 0; i < targets.length; i++) {


            const target = targets[i] as HTMLTableCellElement;
            if (target.classList.contains('warning-thresold')) {
                setWarning(true)
            }
        }
    }

}

const BarterRight:React.FC<Props> = (props: Props) => {

    const { onClick } = props;

    const [All, setAll] = React.useState(true);
    const [Tier1, setTier1] = React.useState(true);
    const [Tier2, setTier2] = React.useState(true);
    const [Tier3, setTier3] = React.useState(true);
    const [Tier4, setTier4] = React.useState(true);
    const [Tier5, setTier5] = React.useState(true);

    const [tier1Warning, setTier1Warning] = React.useState(false);
    const [tier2Warning, setTier2Warning] = React.useState(false);
    const [tier3Warning, setTier3Warning] = React.useState(false);
    const [tier4Warning, setTier4Warning] = React.useState(false);
    const [tier5Warning, setTier5Warning] = React.useState(false);
    
    let tier1Table:boolean[] = []
    let tier2Table:boolean[] = []
    let tier3Table:boolean[] = []
    let tier4Table:boolean[] = []
    let tier5Table:boolean[] = []


    setTimeout(() => {
        doOnce(setTier1Warning, setTier2Warning, setTier3Warning, setTier4Warning, setTier5Warning);
    }, 150);

    // Check change of in class of the element with MutationObserver and set the state accordingly
    const observer = new MutationObserver(async (mutations) => {

        let continueLoop = true;

        await mutations.forEach((mutation) => {

            if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'class' || mutation.attributeName === 'style') {
                    const parent = mutation.target.parentElement.parentElement as HTMLTableElement;

                    if(!parent.classList.contains('table-body')){
                        continueLoop = false;
                    } else {
                        tier1Table = []
                        tier2Table = []
                        tier3Table = []
                        tier4Table = []
                        tier5Table = []
                        for (let i = 0; i < parent.children.length; i++) {
                            const targets = parent.children[i] as HTMLTableRowElement;
                            for (let i = 0; i < targets.children.length; i++) {
                    
                    
                                const target = targets.children[i] as HTMLTableCellElement;
                                if (target.classList.contains('warning-thresold')) {


                                    if(target.style.display !== 'none') {

                                        if(targets.classList.contains('tier-1')) {
                                            tier1Table.push(true)
                                        } else if (targets.classList.contains('tier-2')) {
                                            tier2Table.push(true)
                                        } else if (targets.classList.contains('tier-3')) {
                                            tier3Table.push(true)
                                        } else if (targets.classList.contains('tier-4')) {
                                            tier4Table.push(true)
                                        } else if (targets.classList.contains('tier-5')) {
                                            tier5Table.push(true)
                                        }
                                    }
                                }
                            }
                        }
                        if (tier1Table.length > 0) {
                            if(tier1Table.includes(true)) {
                                setTier1Warning(true)
                            }
                        } else {
                            setTier1Warning(false)
                        }
                        if (tier2Table.length > 0) {
                            if(tier2Table.includes(true)) {
                                setTier2Warning(true)
                            }
                        } else {
                            setTier2Warning(false)
                        }
                        if (tier3Table.length > 0) {
                            if(tier3Table.includes(true)) {
                                setTier3Warning(true)
                            }
                        } else {
                            setTier3Warning(false)
                        }
                        if (tier4Table.length > 0) {
                            if(tier4Table.includes(true)) {
                                setTier4Warning(true)
                            }
                        } else {
                            setTier4Warning(false)
                        }
                        if (tier5Table.length > 0) {
                            if(tier5Table.includes(true)) {
                                setTier5Warning(true)
                            }
                        } else {
                            setTier5Warning(false)
                        }
                    }
                }
            }
        });

    });

    // Launch the observer script on the body once before observing it
    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
    });


    return (
        <div className="barter-right">
            <div className="barter-right__buttons">
                <button className={`barter-right__button all ${All? 'active':'not-active'}`} onClick={() => {
                    setAll(!All);
                    if (All) {
                        setTier1(false);
                        setTier2(false);
                        setTier3(false);
                        setTier4(false);
                        setTier5(false);

                        onClick(1, false);
                        onClick(2, false);
                        onClick(3, false);
                        onClick(4, false);
                        onClick(5, false);
                    } else {
                        setTier1(true);
                        setTier2(true);
                        setTier3(true);
                        setTier4(true);
                        setTier5(true);

                        onClick(1, true);
                        onClick(2, true);
                        onClick(3, true);
                        onClick(4, true);
                        onClick(5, true);
                    }

                    
                }}>All</button>
                <button className={`barter-right__button ${Tier1 ? 'active' : 'not-active'} ${tier1Warning? 'warn' : ''}`} onClick={() => {
                    setTier1(!Tier1);
                    onClick(1, !Tier1);

                    setAll((!Tier1 && Tier2 && Tier3 && Tier4 && Tier5));
                }}>Tier 1</button>
                <button className={`barter-right__button ${Tier2 ? 'active' : 'not-active'} ${tier2Warning? 'warn' : ''}`} onClick={() => {
                    setTier2(!Tier2);
                    onClick(2, !Tier2);
                    setAll((Tier1 && !Tier2 && Tier3 && Tier4 && Tier5));
                }}>Tier 2</button>
                <button className={`barter-right__button ${Tier3 ? 'active' : 'not-active'} ${tier3Warning? 'warn' : ''}`} onClick={() => {
                    setTier3(!Tier3);
                    onClick(3, !Tier3);
                    setAll((Tier1 && Tier2 && !Tier3 && Tier4 && Tier5));
                }}>Tier 3</button>
                <button className={`barter-right__button ${Tier4 ? 'active' : 'not-active'} ${tier4Warning? 'warn' : ''}`} onClick={() => {
                    setTier4(!Tier4);
                    onClick(4, !Tier4);
                    setAll((Tier1 && Tier2 && Tier3 && !Tier4 && Tier5));
                }}>Tier 4</button>
                <button className={`barter-right__button ${Tier5 ? 'active' : 'not-active'} ${tier5Warning? 'warn' : ''}`} onClick={() => {
                    setTier5(!Tier5);
                    onClick(5, !Tier5);
                    setAll((Tier1 && Tier2 && Tier3 && Tier4 && !Tier5));
                }}>Tier 5</button>
            </div>
        </div>
    );
};

export default BarterRight;