import React from 'react';
import classes from './Modal.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Backdrop from '../BackDrop/BackDrop';
import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {
  const cls = [classes.Modal];

  // if (!props.modal.isOpen) {
  //   cls.push(classes.close);
  // }

  return (
    <CSSTransition
      in={props.modal.isOpen}
      timeout={{
        enter: 200,
        exit: 200,
      }}
      classNames="m"
      mountOnEnter
      unmountOnExit
    >
      <React.Fragment>
        <div className={cls.join(' ')}>
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
              // value={props.modal.inputValue}
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
        <Backdrop
          onClick={props.onCancelModalClick}
          onKeyPress={props.onKeyPress}
        />
      </React.Fragment>
    </CSSTransition>
  );
};

export default Modal;
