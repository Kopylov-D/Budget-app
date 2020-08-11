import React from 'react';

import Button from '../../UI/Button/Button';

import classes from './ViewItem.module.css';

const ViewItem = ({ id, date, activeCategory, amount, onDeleteButtonClick }) => {
  return (
    <div>
      <div className={classes.ViewItem}>
        <li>{`${date} - ${amount}`}</li>
        <Button type="delete" onClick={() => onDeleteButtonClick(id, activeCategory)}>
          &times;
        </Button>
      </div>
    </div>
  );
};

export default ViewItem;
