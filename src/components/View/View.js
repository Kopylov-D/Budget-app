import React from 'react';
import classes from './View.module.css';
import ViewItem from './ViewItem/ViewItem';

const View = (props) => {
  return (
    <ul className={classes.View}>
      {props.data
        ? props.data.map(data => {
            // if (data && props.openView && props.currentMonthId === data.id && props.flag === props.input.expenses) {
            if (
              data &&
              props.openView &&
              props.currentMonthId === data.monthId &&
              props.activeCategory === data.categoryId
            ) {
              return (
                <ViewItem
                  key={data.id}
                  id={data.id}
                  activeCategory={props.activeCategory}
                  date={data.date}
                  amount={data.amount}
                  onDeleteButtonClick={props.onDeleteButtonClick}
                />
              );
            } else {
              return null;
            }
          })
        : null}
    </ul>
  );
};

export default View;
