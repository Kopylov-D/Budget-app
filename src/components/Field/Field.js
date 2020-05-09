import React from 'react';
import classes from './Field.module.css';
import FieldItem from './FieldItem/FieldItem';

const Field = (props) => {
    return (
        <div className={classes.Field}>
            {/* <h2>Введите расходы</h2> */}
            {props.input.map((input, index) => {
                // const currentMonthId = props.currentMonthId;
                // if (currentMonthId === input.monthId) {
                    
                        // let sumCurrent = input.data.reduce((sum, current) => {
                        //     if (current.id === props.currentMonthId) {
                        //         return sum + current.price;
                        //     } else {
                        //         return null;
                        //     }
                        // }, 0);
                    
                    return (
                        <FieldItem
                            key={index}
                            id={input.id}
                            nameCategory={input.nameCategory}
                            sumCurrent={input.sumCurrent[props.currentMonthId]}
                            currentInput={input.currentInput}
                            onChange={props.onChange}
                            onInputClick={props.onInputClick}
                            onNameCategoryClick={props.onNameCategoryClick}
                            onSubmit={props.onSubmit}
                        />
                    )
                    
                // } else {
                //     return null
                // }

                   
                
            })}
        </div>
    );
};

export default Field;
