import React from 'react';
import { connect } from 'react-redux';

import classes from './Info.module.css';

function Info(props) {
  return (
    <div className={classes.info}>
      {props.isAuthenticated ? null : <h2>Необходимо выполнить вход!</h2>}
      <h3>Данные для демонстрационного входа</h3>
      <div>
        <b>Логин: </b>qw@qw.ru
      </div>
      <div>
        <b>Пароль: </b>123456
      </div>
      <br />
      <div>Также доступна регистрация пользователя с помощью почты и пароля</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Info);
