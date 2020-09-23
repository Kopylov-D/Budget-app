import React from 'react';

import classes from './Input.module.css';

function isInvalid({valid, touched, shouldValidate, noErrorMessage}) {
  return !valid && shouldValidate && touched && !noErrorMessage;
}

const Input = props => {
  const inputType = props.type || 'text';
  const cls = [classes.Input, classes[props.style]];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        ref={props.refInput}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        onKeyPress={props.onKeyPress}
      />

      {isInvalid(props) ? <span>{props.errorMessage || 'Неверное значение'}</span> : null}
    </div>
  );
};

export default Input;
