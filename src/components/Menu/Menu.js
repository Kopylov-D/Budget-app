import React from 'react';
import classes from './Menu.module.css';

const Menu = (props) => (
    <nav>
        <div className={classes.Menu}>Расходы</div>
        <div className={classes.Menu}>Доходы</div>
        <div className={classes.Menu}>Инвестиции</div>
    </nav>
);

export default Menu;
