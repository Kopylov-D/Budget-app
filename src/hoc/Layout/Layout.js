import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './Layout.module.css';

class Layout extends React.Component {
  render() {
    return (
      <div className={classes.Layout}>
        <header className={classes.header}>
          <nav>
            <h1>Budget App</h1>
            <NavLink to="/" exact activeClassName={classes.active}>
              <span className="material-icons">payments</span>Ф
            </NavLink>
            <NavLink to="/stat" activeClassName={classes.active}>
              <span className="material-icons">analytics С</span>
            </NavLink>
            <NavLink to="/info" activeClassName={classes.active}>
              <span className="material-icons">live_help</span> И
            </NavLink>
          </nav>

          <div>
            {this.props.isAuthenticated ? (
              <NavLink
                to="/logout"
                activeClassName={classes.active}
                className={classes.auth}
              >
                Выход
              </NavLink>
            ) : (
              <NavLink
                to="/auth"
                activeClassName={classes.active}
                className={classes.auth}
              >
                Вход
              </NavLink>
            )}
          </div>
        </header>

        <nav></nav>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
