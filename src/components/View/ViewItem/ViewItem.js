import React from 'react';
import classes from './ViewItem.module.css';
import Button from '../../UI/Button/Button';

const ViewItem = (props) => {
  return (
    <div className={classes.ViewItem}>
      <li>{props.data ? `${props.data.date} - ${props.data.price} руб.` : null}</li>
      <Button
        type="delete"
        onClick={() => props.onDeleteButtonClick(props.id, props.inputId)}
      >
        х
      </Button>
    </div>
  );
};

export default ViewItem;
