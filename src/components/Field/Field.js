import React from 'react';
import classes from './Field.module.css';
import FieldItem from './FieldItem/FieldItem';

const Field = (props) => {
  return (
    <div className={classes.Field}>
      {props.input.map((input, index) => {
        if (props.flag === input.expenses) {
          return (
            <FieldItem
              key={index}
              id={input.id}
              nameCategory={input.nameCategory}
              sumCurrent={input.sumCurrent[props.currentMonthId]}
              currentInput={input.currentInput}
              onChange={props.onChange}
              onClick={props.onClick}
              onNameCategoryClick={props.onNameCategoryClick}
              onSubmit={props.onSubmit}
            />
          );
        } else return null
      })}
    </div>
  );
};

export default Field;
