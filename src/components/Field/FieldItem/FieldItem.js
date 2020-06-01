import React, { useState } from 'react';
import classes from './FieldItem.module.css';
import Input from '../../UI/Input/Input';
import { createControl } from '../../../form/formFramework';

const FieldItem = (props) => {
  const { control } = useState(
    createControl(
      {
        errorMessage: 'Неверный ввод',
      },
      { required: true }
    )
    // style: 'auth',
    // isFormValid: false,
    // value: '',
    // type: 'email',
    // label: 'Email',
    // errorMessage: 'Введите корректный email',
    // valid: false,
    // touched: false,
    // validation: {
    //   required: true,
    //   email: true,
    // },
  );

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
          props.onSubmit(event, props.id);
        }}
      >
        <Input
          id={props.id}
        //   key={controlName + index}
        //   style={this.state.style}
          type={control.type}
          label={control.label}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => props.onChange(event, props.id)}
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
