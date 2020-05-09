import React from 'react';
import classes from './Modal.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Backdrop from '../BackDrop/BackDrop';

const noop = () => {};

const Modal = (props) => {
    // renderInputs = () => {};

    // renderButtons = () => {};

    const cls = [classes.Modal];

    if (!props.modal.isOpen) {
        cls.push(classes.close);
    }

    return (
        <React.Fragment>
            <div className={cls.join(' ')}>
                <label>{props.modal.title}</label>
                <Input
                    type={props.modal.inputType}
                    style={props.modal.style}
                    onChange={props.onChangeModal}
                    onInputClick={noop}
                    onSubmit={props.onSubmitModal}
                    value={props.modal.inputValue}
                />
                <div className={classes.buttons}>
                    <Button type="success" onClick={props.onOkModalClick}>
                        Ок
                    </Button>
                    <Button type="primary" onClick={props.onCancelModalClick}>
                        Отмена
                    </Button>
                    <Button type="primary" onClick={props.onDeleteModalClick}>
                        Удалить категорию
                    </Button>
                </div>
            </div>
            {props.modal.isOpen ? <Backdrop onClick={props.onCancelModalClick}/> : null}
        </React.Fragment>
    );
};

export default Modal;
