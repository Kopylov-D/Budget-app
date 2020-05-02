import React from 'react';
import classes from './ViewItem.module.css';
import Button from '../../../UI/Button/Button';

const ViewItem = (props) => {
    // console.log('ViewItem', props.date);
    const style = {
        padding: '2px 4px',
        color: 'red',
    };
    return (
        <div className={classes.ViewItem}>
            <li>
                {props.input
                    ? `${props.input.id} - ${props.input.date} - ${props.input.price}`
                    : null}
            </li>
            <Button type="delete" onClick={() => props.onDeleteButtonClick(props.input.id)}>
                х
            </Button>
        </div>
    );
};

export default ViewItem;
