import React from 'react';

const MonthItem = (props) => {
  const styles = {
    padding: '5px',
  };

  if (props.id === props.currentMonthId) {
    styles.background = 'red';
  }

  return (
    <div style={styles} onClick={() => props.onClick(props.id)}>
      {props.month}
    </div>
  );
};

export default MonthItem;
