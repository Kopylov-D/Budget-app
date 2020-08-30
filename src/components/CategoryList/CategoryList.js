import React from 'react';
import classes from './CategoryList.module.css';

const sum = (arr, isExpenses) => {
  return arr.reduce((acc, cur) => {
    if (isExpenses === cur.isExpenses) {
      return acc + cur.totalAmount;
    } else {
      return acc;
    }
  }, 0);
};

export default function CategoryList({categories, isExpenses}) {
  console.log(sum(categories));

  return (
    <div className={classes.categoryList}>
      <div>Total {sum(categories, isExpenses)}</div>
      <br />
      <ul>
        {categories
          .sort((a, b) => b.totalAmount - a.totalAmount)
          .map(c => {
            if (c.isExpenses === isExpenses) {
              return (
                <li key={c.id}>
                  <div>{c.nameCategory}</div>
                  <span>{c.totalAmount}</span>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
