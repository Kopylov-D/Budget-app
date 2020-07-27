import React, { useState } from 'react';
import classes from './FieldItem.module.css';
import Input from '../../UI/Input/Input';
import { createControl, validate } from '../../../form/formFramework';

const FieldItem = (props) => {
  const [control, setControl] = useState(
    createControl(
      { noErrorMessage: true },
      { required: true, isNumber: true, notNull: true }
    )
  );

  const onKeyEnter = (event) => {
    if (event.key !== 'Enter') {
      return;
    } else {
      const value = event.target.value;
      setControl({
        ...control,
        value,
        valid: validate(value, control.validation),
      });
      event.target.value = '';
    }
  };

  // sumInputArr(arr) {
  //   return arr.reduce((sum, current) => {
  //     if (current.id === this.state.currentMonthId) {
  //       return sum + current.price;
  //     } else {
  //       return null;
  //     }
  //   }, 0);
  // }

  // let sum = props.data.reduce((sum, cur) => {
  //   return sum + cur.amount;
  // }, 0);

  return (
    <div className={classes.FieldItem}>
      <div
        className={classes.FieldItemName}
        onClick={() => props.onNameCategoryClick(props.id)}
      >
        {props.nameCategory}
      </div>
      <form
        onSubmit={(event) => {
          props.onSubmit(event, props.id, control.valid, control.value);
        }}
      >
        <Input
          id={props.id}
          label={control.label}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          noErrorMessage={control.noErrorMessage}
          onKeyPress={onKeyEnter}
          onClick={() => props.onClick(props.id)}
        />
      </form>
      <div>{props.currentInput}</div>
      <div className={classes.sum}>Сумма</div>&nbsp;
      <div>{props.sumCurrent}</div>
    </div>
  );
};

export default FieldItem;
