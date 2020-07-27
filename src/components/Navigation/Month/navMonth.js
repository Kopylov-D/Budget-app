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
  const renderMonths = () => {
    return months.map((month, index) => {
      return (
        <div key={'m' + index}>
          <MonthItem
            onClick={props.onClick}
            id={index + 1}
            month={month}
            currentMonthId={props.currentMonthId}
          />
        </div>
      );
    });
  };

  return <div className={classes.Month}>{renderMonths()}</div>;
};

export default Month;
