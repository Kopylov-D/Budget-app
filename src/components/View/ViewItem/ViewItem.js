import React from 'react';

import classes from './ViewItem.module.css';
import Button from '../../UI/Button/Button';

const ViewItem = ({ id, date, activeCategory, amount, onDeleteButtonClick }) => {
  return (
    <div className={classes.ViewItem}>
      <li>{`${date} - ${amount} руб.`}</li>
      <Button type="delete" onClick={() => onDeleteButtonClick(id, activeCategory)}>
        &times;
      </Button>
    </div>
  );
};

export default ViewItem;
