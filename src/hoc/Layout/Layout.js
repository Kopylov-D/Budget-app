import React from 'react';
import classes from './Layout.module.css';
import { NavLink } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <div className={classes.Layout}>
        <nav className={classes.header}>
          <h1>UberDog App</h1>
          <div>Финансы</div>
          <div>Планирование</div>
          <div>Заметки</div>
          <div>LifeUp</div>
        </nav>
        <header>
          <h2>Финансы</h2>
          {this.props.isAuthenticated ? (
            <NavLink
              to="/logout"
              activeClassName={classes.active}
              className={classes.auth}
            >
              Выход
            </NavLink>
          ) : (
            <NavLink to="/auth" activeClassName={classes.active} className={classes.auth}>
              Вход
            </NavLink>
          )}
        </header>
        <nav>
          <NavLink to="/" exact activeClassName={classes.active}>
            Расход/доход
          </NavLink>
          <NavLink to="/invest" activeClassName={classes.active}>
            Инвестиции
          </NavLink>
          <NavLink
            to="/yearstat"
            activeClassName={classes.active}
            // activeStyle={{ color: 'red' }}
          >
            Годовая статистика
          </NavLink>
        </nav>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
