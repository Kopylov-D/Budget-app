import React, { useState } from 'react';
import classes from './FieldItem.module.css';
import Input from '../../UI/Input/Input';
import { createControl, validate } from '../../../form/formFramework';

const FieldItem = (props) => {
  const [control, setControl] = useState(
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

  const [value, setValue] = useState('');

  const onKeyEnter = (event) => {
    if (event.key !== 'Enter') {
      console.log(value);
      console.log(control);
      setControl({touched: true});

      
    } else {
      setControl({touched: true});
    }
  };

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
          props.onSubmit(event, props.id, control.valid);
        }}
      >
        <Input
          id={props.id}
          // key={controlName + index}
          //   style={this.state.style}
          // type={control.type}
          label={control.label}
          // value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => setValue(event.target.value)}
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
