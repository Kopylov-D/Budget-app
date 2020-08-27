import React, {Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Backdrop from '../BackDrop/BackDrop';

import classes from './Modal.module.css';

const Modal = ({
  modal,
  onSubmitModal,
  onChangeModal,
  onOkModalClick,
  onCancelModalClick,
  onDeleteModalClick,
  onKeyPress,
}) => {
  return (
    // <CSSTransition
    //   in={modal.isOpen}
    //   timeout={200}
    //   classNames={{
    //     enter: classes['m-enter'],
    //     enterActive: classes['m-enter-active'],
    //     exitActive: classes['m-exit-active'],
    //   }}
    //   unmountOnExit
    // >
      <Fragment>
        <div className={classes.Modal}>
          <label>{modal.title}</label>
          <form
            onSubmit={event => {
              onSubmitModal(event);
            }}
          >
            <Input type={modal.inputType} style={modal.style} onChange={onChangeModal} />
          </form>
          <div className={classes.buttons}>
            <Button type="success" onClick={onOkModalClick}>
              Ок
            </Button>
            <Button type="primary" onClick={onCancelModalClick}>
              Отмена
            </Button>
            <Button type="error" onClick={onDeleteModalClick}>
              Удалить категорию
            </Button>
          </div>
        </div>
        <Backdrop onClick={onCancelModalClick} onKeyPress={onKeyPress} /> 
      </Fragment>
    // </CSSTransition>
  );
};

export default Modal;
