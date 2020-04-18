import React from 'react';
import classes from './ViewItem.module.css';

const ViewItem = (props) => {
    // console.log('ViewItem', props.date);

    return (
        <li
            className={classes.ViewItem}
            
        >
            {props.input.date} - {props.input.price}
        </li>
    );
};

export default ViewItem;
