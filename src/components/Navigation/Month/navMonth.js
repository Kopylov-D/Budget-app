import React from 'react';

import MonthItem from './MonthItem/MonthItem';

import classes from './navMonth.module.css';

const months = [
  'ЯНВ',
  'ФЕВ',
  'МАРТ',
  'АПР',
  'МАЙ',
  'ИЮНЬ',
  'ИЮЛЬ',
  'АВГ',
  'СЕН',
  'ОКТ',
  'НБР',
  'ДЕК',
];

const Month = props => {
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
