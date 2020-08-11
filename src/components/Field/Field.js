import React from 'react';

import FieldItem from './FieldItem/FieldItem';

import classes from './Field.module.css';

const Field = (props) => {
  return (
    <div className={classes.Field}>
      {props.categories.map((category) => {
        if (props.isExpenses === category.isExpenses) {
          return (
            <FieldItem
              key={'key' + category.id}
              id={category.id}
              nameCategory={category.nameCategory}
              sumCurrent={category.sumCurrent[props.currentMonthId]}
              currentInput={category.currentInput}
              onClick={props.onClick}
              onNameCategoryClick={props.onNameCategoryClick}
              onSubmit={props.onSubmit}
            />
          );
        } else return null;
      })}
    </div>
  );
};

export default Field;
