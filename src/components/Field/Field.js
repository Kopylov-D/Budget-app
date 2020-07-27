import React from 'react';
import classes from './Field.module.css';
import FieldItem from './FieldItem/FieldItem';

const Field = (props) => {
  return (
    <div className={classes.Field}>
      {props.categories.map((category) => {
        if (
          props.isExpenses === category.isExpenses
        ) {
          return (
            <FieldItem
              key={'key' + category.id}
              id={category.id}
              // data={props.data.filter(
              //   (d) => d.categoryId === category.id && d.monthId === category.monthId
              // )}
              nameCategory={category.nameCategory}
              sumCurrent={category.sumCurrent[props.currentMonthId]}
              currentInput={category.currentInput}
              onChange={props.onChange}
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
