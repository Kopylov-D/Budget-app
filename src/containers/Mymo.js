import React, { Component } from 'react';
import classes from './Mymo.module.css';
import Input from '../components/Input/Input';
import Menu from '../components/Menu/Menu';
import View from '../components/View/View';

class Mymo extends Component {
    state = {
        activeInput: 0,
        input: [
            {
                id: 1,
                nameCategory: 'Продукты',
                sumCurrent: 250,
                currenInput: null,
                prevInput: [
                    { date: '12/01/2020', price: 120, id: 1 },
                    { date: '23/01/2020', price: 1658, id: 2 },
                    { date: '25/01/2020', price: 2510, id: 3 },
                ],
            },
            {
                id: 2,
                nameCategory: 'Одежда',
                sumCurrent: 900,
                currenInput: null,
                prevInput: [
                    { date: '12/01/2021', price: 12, id: 1 },
                    { date: '23/01/2021', price: 16, id: 2 },
                    { date: '25/01/2021', price: 25, id: 3 },
                ],
            },
        ],
    };

    handleInput = () => {
        console.log(1);
    };

    onNameCategoryClickHandler = (inputId) => {
        console.log('Аргумент функции: ', inputId - 1);

        this.setState({
            activeInput: inputId - 1,
        });
    };

    render() {
        return (
            <div className={classes.Mymo}>
                <Menu />
                <Input
                    input={this.state.input}
                    activeInput={this.state.activeInput}
                    onInputEnter={this.handleInput}
                    onNameCategoryClick={this.onNameCategoryClickHandler}
                />
                <View
                    input={this.state.input[this.state.activeInput].prevInput}
                    onNameCategoryClick={this.onNameCategoryClickHandler}
                />
            </div>
        );
    }
}

export default Mymo;
