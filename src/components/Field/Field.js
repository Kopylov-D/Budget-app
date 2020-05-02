import React from 'react';
import classes from './Field.module.css';
import FieldItem from './FieldItem/FieldItem';

const Field = (props) => {
    return (
        <div className={classes.Field}>
            {/* <h2>Введите расходы</h2> */}
            {props.input.map((input, index) => {
                return (
                    <FieldItem
                        key={index}
                        id={input.id}
                        nameCategory={input.nameCategory}
                        sumCurrent={input.sumCurrent}
                        currentInput={input.currentInput}
                        onChange={props.onChange}
                        onInputClick={props.onInputClick}
                        onNameCategoryClick={props.onNameCategoryClick}
                        onSubmit={props.onSubmit}
                    />
                );
            })}
        </div>
    );
};

export default Field;
