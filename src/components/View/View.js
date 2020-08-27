import React from 'react';

import ViewItem from './ViewItem/ViewItem';

import classes from './View.module.css';

const View = props => {
  return (
    <ul className={classes.View}>
      {props.data && props.openView
        ? props.data
            .map(data => {
              if (
                data &&
                props.currentMonthId === data.monthId &&
                props.activeCategory === data.categoryId
              ) {
                return (
                  <div>
                    <ViewItem
                      key={data.id}
                      id={data.id}
                      activeCategory={props.activeCategory}
                      date={data.date}
                      amount={data.amount}
                      disabled={props.disabled}
                      onDeleteButtonClick={props.onDeleteButtonClick}
                    />
                  </div>
                );
              } else {
                return null;
              }
            })
            .reverse()
        : null}
    </ul>
  );
};

export default View;
