import React from 'react';

const MonthItem = ({ id, currentMonthId, onClick, month }) => {
  const styles = {
    padding: '3px',
    borderRadius: '1px',
  };

  if (id === currentMonthId) {
    styles.background = 'rgba(240, 87, 108, 1)';
  }

  return (
    <div style={styles} onClick={() => onClick(id)}>
      {month}
    </div>
  );
};

export default MonthItem;
