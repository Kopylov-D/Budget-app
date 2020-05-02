import React, { Component } from 'react';
import classes from './Expenses.module.css';
import Field from '../../components/Field/Field';
import View from '../../components/View/View';
import Button from '../../UI/Button/Button';

class Expenses extends Component {
    state = {
        activeInput: 0,
        test: null,
        expensesSum: 5000,
        sumCash: 8000,
        input: [
            {
                id: 1,
                nameCategory: 'Продукты',
                sumCurrent: 10,
                currenInput: null,
                currenInputId: null,
                data: [
                    // { date: '12/01/2020', price: 5, id: 1 },
                    // { date: '23/01/2020', price: 2, id: 2 },
                    // { date: '25/01/2020', price: 3, id: 3 },
                ],
            },
            {
                id: 2,
                nameCategory: 'Одежда',
                sumCurrent: null,
                currenInput: null,
                currenInputId: null,
                data: [
                    { date: '12/01/2021', price: 12, id: 1 },
                    { date: '23/01/2021', price: 16, id: 2 },
                    { date: '25/01/2021', price: 25, id: 3 },
                ],
            },
        ],
    };

    onChangeHandler = (event, id) => {
        const input = [...this.state.input];
        // const elementData = { ...input[id - 1] };

        input.currenInput = event.target.value;
        input.sumCurrent += +event.target.value;

        this.setState({
            input: input,
        });
        // console.log(this.state);
    };

    onSubmitHandler = (event, id) => {
        let number = +event.target.firstChild.value;

        const ind = id - 1;
        const input = [...this.state.input];
        const elementData = { ...input[ind] };
        const newDataId = elementData.data.length + 1;

        const newData = {
            date: 'date',
            price: number,
            id: newDataId,
        };
        const data = elementData.data;
        data.push(newData);

        //сумма

        let sumCurrent = data.reduce(function (sum, current) {
            return sum + current.price;
        }, 0);

        elementData.sumCurrent = sumCurrent;
        input[ind].sumCurrent = sumCurrent;

        this.setState({
            input,
        });

        event.target.firstChild.value = '';

        event.preventDefault();
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

    onDeleteButtonClickHandler = (id) => {
        console.log('Close', id);

        const ind = id - 1;
        const input = [...this.state.input];
        const elementData = { ...input[ind] };

        console.log(elementData.data);
        console.log(elementData);

        elementData.data.splice(ind, 1);
        input[ind].data = elementData

        this.setState({
            input,
        });
        console.log(elementData.data);
        // elementData.data.splice(id, 1);
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
        newInputItem.data = [];
        input.push(newInputItem);

        this.setState({
            input: input,
        });
    }

    render() {
        return (
            <div className={classes.Expenses}>
                <div className={classes.workArea}>
                    <Field
                        input={this.state.input}
                        activeInput={this.state.activeInput}
                        onChange={this.onChangeHandler}
                        onSubmit={this.onSubmitHandler}
                        onInputClick={this.refreshView}
                        onNameCategoryClick={this.onNameCategoryClickHandler}
                    />
                    <View
                        input={this.state.input[this.state.activeInput].data}
                        onNameCategoryClick={this.onNameCategoryClickHandler}
                        onDeleteButtonClick={this.onDeleteButtonClickHandler}
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
