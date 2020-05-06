import React, { Component } from 'react';
import classes from './Expenses.module.css';
import Field from '../../components/Field/Field';
import View from '../../components/View/View';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

class Expenses extends Component {
    state = {
        activeInput: 0,
        modal: {
            isOpen: false,
            title: 'Введите имя категории',
            inputValue: '',
            style: 'modal',
            currentCategoryId: null,
        },
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

    refreshSum(arr) {
        let newArr = arr.reduce(function (sum, current) {
            let p = current.price;
            return sum + p;
        }, 0);
        return newArr;
    }

    onChangeHandler = (event, id) => {};

    onSubmitHandler = (event, id) => {
        let number = +event.target.firstChild.value;

        const ind = id - 1;
        const input = [...this.state.input];
        const elementData = { ...input[ind] };
        const newDataId = elementData.data.length + 1;

        const newData = {
            date: new Date(),
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
        const modal = { ...this.state.modal };
        modal.isOpen = true;
        modal.currentCategoryId = inputId;

        this.setState({
            modal,
        });
    };

    onChangeModal = (event) => {
        const modal = { ...this.state.modal };
        const newName = event.target.value;

        modal.inputValue = newName;

        this.setState({
            modal,
        });

        console.log(this.state.modal);
    };

    onSubmitModal = (event) => {
        this.onOkModalClick();
        event.preventDefault();
    };

    onOkModalClick = () => {
        const modal = { ...this.state.modal };
        const inputId = modal.currentCategoryId;

        const input = [...this.state.input];
        const newInputItem = { ...input[inputId - 1] };

        if (modal.inputValue) {
            newInputItem.nameCategory = modal.inputValue;

            input[inputId - 1] = newInputItem;
        }

        modal.isOpen = false;
        modal.inputValue = '';

        console.log();

        this.setState({
            input,
            modal,
        });
    };

    onCancelModalClick = () => {
        console.log('Modal cancel');
        const modal = { ...this.state.modal };
        modal.isOpen = false;

        this.setState({
            modal,
        });
    };

    onDeleteButtonClickHandler = (id, inputId) => {
        const input = [...this.state.input];
        const elementData = { ...input[inputId] };
        const data = elementData.data;

        data.splice(id, 1);

        let sumCurrent = data.reduce(function (sum, current) {
            return sum + current.price;
        }, 0);

        elementData.sumCurrent = sumCurrent;
        input[inputId].sumCurrent = sumCurrent;

        this.setState({
            input,
        });
    };

    onTestButtonClickHandler = (id) => {
        console.log(this.state);
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
                        inputId={this.state.activeInput}
                        data={this.state.input[this.state.activeInput].data}
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
                <Modal
                    modal={this.state.modal}
                    onOkModalClick={this.onOkModalClick}
                    onCancelModalClick={this.onCancelModalClick}
                    onChangeModal={this.onChangeModal}
                    onSubmitModal={this.onSubmitModal}
                />
            </div>
        );
    }
}

export default Expenses;
