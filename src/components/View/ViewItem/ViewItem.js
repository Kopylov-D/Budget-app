import React from 'react';
import classes from './ViewItem.module.css';
import Button from '../../../UI/Button/Button';

const ViewItem = (props) => {

    return (
        <div className={classes.ViewItem}>
            <li>
                {props.data
                    ? `${props.id + 1} -  ${props.data.date.toLocaleDateString()} - ${props.data.price}`
                    : null}
            </li>
            <Button type="delete" onClick={() => props.onDeleteButtonClick(props.id, props.inputId)}>
                х
            </Button>
        </div>
    );
};

export default ViewItem;
