import React from 'react';
import classes from './Input.module.css';
import InputItem from './InputItem/InputItem';

const Input = (props) => {
    return (
        <div className={classes.Input}>
            {/* <h2>Введите расходы</h2> */}
            {props.input.map((input, index) => {
                return (
                    <InputItem
                        key={index}
                        id={input.id}
                        nameCategory={input.nameCategory}
                        sumCurrent={input.sumCurrent}
                        currentInput={input.currentInput}
                        onInputEnter={props.onInputEnter}
                        onNameCategoryClick={props.onNameCategoryClick}

                    />
                );
            })}
        </div>
    );
};

export default Input;
