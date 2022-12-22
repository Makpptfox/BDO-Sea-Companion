// TODO : Add the thresold warning for the barter tier button
import React from 'react';

import './BarterRight.scss';

type Props = {
    onClick: (tier: number, hide:boolean) => void;
};


const BarterRight:React.FC<Props> = (props: Props) => {

    const { onClick } = props;

    const [All, setAll] = React.useState(true);
    const [Tier1, setTier1] = React.useState(true);
    const [Tier2, setTier2] = React.useState(true);
    const [Tier3, setTier3] = React.useState(true);
    const [Tier4, setTier4] = React.useState(true);
    const [Tier5, setTier5] = React.useState(true);


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
                <button className={`barter-right__button ${Tier1 ? 'active' : 'not-active'}`} onClick={() => {
                    setTier1(!Tier1);
                    onClick(1, !Tier1);

                    setAll((!Tier1 && Tier2 && Tier3 && Tier4 && Tier5));
                }}>Tier 1</button>
                <button className={`barter-right__button ${Tier2 ? 'active' : 'not-active'}`} onClick={() => {
                    setTier2(!Tier2);
                    onClick(2, !Tier2);
                    setAll((Tier1 && !Tier2 && Tier3 && Tier4 && Tier5));
                }}>Tier 2</button>
                <button className={`barter-right__button ${Tier3 ? 'active' : 'not-active'}`} onClick={() => {
                    setTier3(!Tier3);
                    onClick(3, !Tier3);
                    setAll((Tier1 && Tier2 && !Tier3 && Tier4 && Tier5));
                }}>Tier 3</button>
                <button className={`barter-right__button ${Tier4 ? 'active' : 'not-active'}`} onClick={() => {
                    setTier4(!Tier4);
                    onClick(4, !Tier4);
                    setAll((Tier1 && Tier2 && Tier3 && !Tier4 && Tier5));
                }}>Tier 4</button>
                <button className={`barter-right__button ${Tier5 ? 'active' : 'not-active'}`} onClick={() => {
                    setTier5(!Tier5);
                    onClick(5, !Tier5);
                    setAll((Tier1 && Tier2 && Tier3 && Tier4 && !Tier5));
                }}>Tier 5</button>
            </div>
        </div>
    );
};

export default BarterRight;