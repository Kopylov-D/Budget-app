import React from 'react';
import classes from './Layout.module.css';
import { NavLink } from 'react-router-dom';

class Layout extends React.Component {
    onClickHeader() {
        console.log('To main');
    }

    render() {
        return (
            <div className={classes.Layout}>
                <h1
                    href="yearstat"
                    onClick={() => {
                        this.onClickHeader();
                    }}
                >
                    Учетник финансов{' '}
                </h1>
                <NavLink to="/yearstat" activeStyle={{ color: 'red' }}>
                    Годовая статистика
                </NavLink>
                <NavLink to="/" exact activeStyle={{ color: 'red' }}>
                    Главная
                </NavLink>
                <main>{this.props.children}</main>
            </div>
        );
    }
}

export default Layout;
