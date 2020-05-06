import React from 'react';
import classes from './FieldItem.module.css';
import Input from '../../../UI/Input/Input';


const FieldItem = (props) => {
    return (
        <div className={classes.FieldItem}>
            <div
                className={classes.FieldItemName}
                onClick={() => props.onNameCategoryClick(props.id)}
            >
                {props.nameCategory}
            </div>
            <Input
                id={props.id}
                onChange={props.onChange}
                onSubmit={props.onSubmit}
                onInputClick={props.onInputClick}
            />
            <div>{props.currentInput}</div>
            <div className={classes.sum}>Сумма</div>&nbsp;
            <div>{props.sumCurrent}</div>
        </div>
    );
};

export default FieldItem;
