import React from 'react';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || 'text';
  const cls = [classes.Input, classes[props.style]];
  const htmlFor = `${inputType}-${Math.random()}`;

  // let inputRef = React.createRef()
  // console.log(inputRef);


  


  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        onClick={props.onClick}
        // ref={props.inputRef}
      />

      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Неверное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
