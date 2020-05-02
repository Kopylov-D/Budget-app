import React from 'react';
import classes from './View.module.css';
import ViewItem from './ViewItem/ViewItem';

const View = (props) => {
    return (
        <ul className={classes.View}>
            {props.input.map((input, index) => {
                // console.log('mapInput ', input);

                return (
                    <ViewItem
                        key={index}
                        input={input}
                        onDeleteButtonClick={props.onDeleteButtonClick}
                    />
                );
            })}
        </ul>
    );
};

export default View;
