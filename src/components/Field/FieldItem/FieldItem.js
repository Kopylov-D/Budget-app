import React, {useState} from 'react';

import Input from '../../UI/Input/Input';
import {createControl, validate} from '../../../utils/formUtils';

import classes from './FieldItem.module.css';

const FieldItem = props => {
  const [control, setControl] = useState(
    createControl({noErrorMessage: true}, {required: true, isNumber: true, notNull: true})
  );

  const onKeyEnter = event => {
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

  return (
    <div className={classes.FieldItem}>
      <div
        className={classes.FieldItemName}
        onClick={() => props.onNameCategoryClick(props.id)}
      >
        {props.nameCategory}
      </div>
      <form
        onSubmit={event => {
          props.onSubmit(event, props.id, control.valid, control.value);
        }}
      >
        <Input
          id={props.id}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          noErrorMessage={control.noErrorMessage}
          onKeyPress={onKeyEnter}
          onClick={() => props.onClick(props.id)}
        />
      </form>
      <div>{props.currentInput}</div>&nbsp;
      <div>{props.sumCurrent ? props.sumCurrent : 0}</div>
    </div>
  );
};

export default FieldItem;
