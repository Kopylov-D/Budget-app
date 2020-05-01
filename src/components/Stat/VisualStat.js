import React from 'react';
import classes from './VisualStat.module.css';

const VisualStat = (props) => {
    const WastedMoney = (props.sum / props.sumCash) * 100;
    const AllMoney = 100 - WastedMoney;
    return (
        <div className={classes.stat}>
            <div
                style={{
                    background: 'red',
                    width:  WastedMoney ,
                }}
            ></div>
            <div
                style={{
                    background: 'green',
                    width: AllMoney,
                }}
            ></div>
        </div>
    );
};

export default VisualStat;
