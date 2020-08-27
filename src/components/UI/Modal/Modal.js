import React, {Fragment, useRef, useEffect} from 'react';

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
  const refInput = useRef(null);

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <Fragment>
      <div className={classes.Modal}>
        <label>{modal.title}</label>
        <form
          onSubmit={event => {
            onSubmitModal(event);
          }}
        >
          <Input
            refInput={refInput}
            type={modal.inputType}
            style={modal.style}
            onChange={onChangeModal}
          />
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
  );
};

export default Modal;
