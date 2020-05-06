import React from 'react';
import classes from './View.module.css';
import ViewItem from './ViewItem/ViewItem';

const View = (props) => {
    return (
        <ul className={classes.View}>
            {props.data.map((data, index) => {
                // console.log('mapInput ', input);

                return (
                    <ViewItem
                        key={index}
                        id={index}
                        inputId={props.inputId}
                        data={data}
                        onDeleteButtonClick={props.onDeleteButtonClick}
                    />
                );
            })}
        </ul>
    );
};

export default View;
