import React from 'react';
import classes from './navMonth.module.css';
import MonthItem from './MonthItem/MonthItem';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const Month = (props) => {
  const renderMonth = () => {
    return months.map((month, index) => {
      return (
        <div key={index}>
          <MonthItem
            onClick={props.onClick}
            id={index}
            month={month}
            currentMonthId={props.currentMonthId}
          />
        </div>
      );
    });
  };

  return <div className={classes.Month}>{renderMonth()}</div>;
};

export default Month;
