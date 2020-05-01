import React from 'react';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <input
                type="text"
                id={htmlFor}
                onChange={(event) => props.onChange(event, props.id)}
                onClick={() => props.onInputClick(props.id)}
            />

            {isInvalid(props)? (
                <span>{props.errorMessage || 'Неверное значение'}</span>
            ) : null}
        </div>
    );
};

export default Input;
