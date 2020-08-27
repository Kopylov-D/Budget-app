import React from 'react';

import Button from '../../UI/Button/Button';

import classes from './ViewItem.module.css';

const ViewItem = ({id, date, activeCategory, amount, disabled, onDeleteButtonClick}) => {
  return (
    <div>
      <div className={classes.ViewItem}>
        <li>{`${date} - ${amount}`}</li>
        <Button
          type="delete"
          disabled={disabled}
          onClick={() => onDeleteButtonClick(id, activeCategory)}
        >
          &times;
        </Button>
      </div>
    </div>
  );
};

export default ViewItem;
