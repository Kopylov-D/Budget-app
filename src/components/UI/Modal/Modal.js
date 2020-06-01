import React from 'react';
import classes from './Modal.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Backdrop from '../BackDrop/BackDrop';

const Modal = (props) => {
  // renderInputs = () => {};

  // renderButtons = () => {};

  // inputRef.current.focus()

  const cls = [classes.Modal];

  if (!props.modal.isOpen) {
    cls.push(classes.close);
  }

  const Esc = (event) => {
    if (event.key === 'Escape') {
      console.log('event');
    }

    console.log('event');
  };

  return (
    // inputRef.current.focus()

    <React.Fragment>
      <div className={cls.join(' ')} onKeyPress={Esc}>
        <label>{props.modal.title}</label>
        <form
          onSubmit={(event) => {
            props.onSubmitModal(event);
          }}
        >
          <Input
            type={props.modal.inputType}
            style={props.modal.style}
            onChange={props.onChangeModal}
            value={props.modal.inputValue}
          />
        </form>

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
      {props.modal.isOpen ? (
        <Backdrop onClick={props.onCancelModalClick} />
      ) : null}
    </React.Fragment>
  );
};

export default Modal;
