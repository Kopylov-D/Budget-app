import React from 'react';

import classes from './Chart.module.css';

export default function Chart({proportion}) {
  let percent = 0;
  if (proportion) {
    percent = (proportion.expenses * 100) / proportion.income;
  }

  return (
    <div className={classes.chart}>
      <div className={classes.expenses} style={{width: percent + '%'}}>
        {proportion && proportion.expenses}
      </div>
      <div className={classes.income} style={{width: 100 - percent + '%'}}>
        {proportion && proportion.income}
      </div>
    </div>
  );
}
