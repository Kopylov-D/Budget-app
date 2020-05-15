import React from 'react';
import classes from './View.module.css';
import ViewItem from './ViewItem/ViewItem';

const View = (props) => {
  return (
    <ul className={classes.View}>
      {props.data
        ? props.data.map((data, index) => {
            if (data && props.openView && props.currentMonthId === data.id && props.flag === props.input.expenses) {
              return (
                <ViewItem
                  key={index}
                  id={index}
                  inputId={props.inputId}
                  data={data}
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
