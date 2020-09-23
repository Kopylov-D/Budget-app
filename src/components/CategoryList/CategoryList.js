import React from 'react';
import classes from './CategoryList.module.css';

export default function CategoryList({categories, isExpenses}) {
  return (
    <div className={classes.categoryList}>
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
