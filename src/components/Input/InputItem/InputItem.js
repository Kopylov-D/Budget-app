import React from 'react';
import classes from './InputItem.module.css';

const InputItem = (props) => {
    
    return (
        <div className={classes.InputItem}>
            <div
                className={classes.InputItemName}
                onClick={() => props.onNameCategoryClick(props.id)}
            >
                {props.nameCategory}
            </div>
            <input type="text" onChange={() => props.onInputEnter()} />
            <div>{props.currentInput}</div>
            <div>Сумма</div>&nbsp;
            <div>{props.sumCurrent}</div>
        </div>
    );
};

export default InputItem;
