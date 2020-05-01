import React, { Component } from 'react';
import classes from './Expenses.module.css';
import Field from '../../components/Field/Field';
import Input from '../../UI/Input/Input';
import View from '../../components/View/View';
import Button from '../../UI/Button/Button';

class Expenses extends Component {
    state = {
        activeInput: 0,
        test: null,
        sum: 5000,
        sumCash: 8000,
        input: [
            {
                id: 1,
                nameCategory: 'Продукты',
                sumCurrent: 250,
                currenInput: null,
                currenInputId: null,
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
                currenInputId: null,
                prevInput: [
                    { date: '12/01/2021', price: 12, id: 1 },
                    { date: '23/01/2021', price: 16, id: 2 },
                    { date: '25/01/2021', price: 25, id: 3 },
                ],
            },
        ],
    };

    onChangeHandler = (event, id) => {
        const input = [...this.state.input];
        const newprevInput = input[id - 1];
        const t = newprevInput;
        console.log(newprevInput);

        // const currenInputId = prevInput.length;
        // const newPrevInput = {
        //     date: new Date(),
        //     price: event.target.value,
        //     id: currenInputId,
        // };
        // prevInput.push(newPrevInput);
        // console.log(prevInput);

        // input.currenInput = event.target.value;
        // input.sumCurrent += +event.target.value

        this.setState({
            input: input,
        });
        // console.log(this.state);
    };

    refreshView = (inputId) => {
        console.log('Аргумент функции: ', inputId - 1);

        this.setState({
            activeInput: inputId - 1,
        });
    };

    onNameCategoryClickHandler = (inputId) => {
        const newName = prompt('Введите название категории');
        if (newName) {
            const input = [...this.state.input];
            const newInputItem = { ...input[inputId - 1] };
            newInputItem.nameCategory = newName;

            input[inputId - 1] = newInputItem;

            this.setState({
                input,
            });
            console.log(input);
        }
    };

    onTestButtonClickHandler = (id) => {
        console.log(this.state);
        console.log(id);
    };

    renderInput() {
        const input = [...this.state.input];
        const newInputItem = { ...input[0] };
        const id = input.length + 1;
        newInputItem.id = id;
        newInputItem.nameCategory = 'Новая категория';
        newInputItem.sumCurrent = null;
        newInputItem.prevInput = []
        input.push(newInputItem);

        this.setState({
            input: input,
        });

        console.log(newInputItem);
    }

    render() {
        return (
            <div className={classes.Expenses}>
                <div className={classes.workArea}>
                    <Field
                        input={this.state.input}
                        activeInput={this.state.activeInput}
                        onChange={this.onChangeHandler}
                        onInputClick={this.refreshView}
                        onNameCategoryClick={this.onNameCategoryClickHandler}
                    />
                    <View
                        input={
                            this.state.input[this.state.activeInput].prevInput
                        }
                        onNameCategoryClick={this.onNameCategoryClickHandler}
                    />
                    <Button
                        type="success"
                        onClick={this.onTestButtonClickHandler}
                    >
                        ВЫВЕСТИ КОНСОЛЬ
                    </Button>
                </div>
                <Button type="primary" onClick={() => this.renderInput()}>
                    Добавить
                </Button>
            </div>
        );
    }
}

export default Expenses;
