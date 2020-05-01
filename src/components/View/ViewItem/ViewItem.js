import React from 'react';
import classes from './ViewItem.module.css';

const ViewItem = (props) => {
    // console.log('ViewItem', props.date);

    return (
        <li className={classes.ViewItem}>
            {props.input
                ? `${props.input.id} - ${props.input.date} - ${props.input.price}`
                : null}
        </li>
    );
};

export default ViewItem;
