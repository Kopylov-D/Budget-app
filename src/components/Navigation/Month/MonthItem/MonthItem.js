import React from 'react';

const MonthItem = ({id, currentMonthId, onClick, month}) => {
  const styles = {
    padding: '3px',
    borderRadius: '1px',
  };

  if (id === currentMonthId) {
    styles.background = '#ffaaa5';
  }

  return (
    <div style={styles} onClick={() => onClick(id)}>
      {month}
    </div>
  );
};

export default MonthItem;
