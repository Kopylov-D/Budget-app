import React, { Component } from 'react';
import classes from './Expenses.module.css';
import Field from '../../components/Field/Field';
import View from '../../components/View/View';
import Month from '../../components/Navigation/Month/navMonth';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios/axios-expenses';
import Loader from '../../components/UI/Loader/Loader';

class Expenses extends Component {
  state = {
    currentMonthId: 0,
    expenses: true,
    activeInput: 0,
    openView: false,
    loading: true,
    modal: {
      isOpen: false,
      title: 'Введите имя категории',
      inputValue: '',
      style: 'modal',
      currentCategoryId: null,
    },
    expensesSum: 0,
    sumCash: 0,
    input: [
      {
        id: 1,
        monthId: null,
        expenses: true,
        nameCategory: 'Новая категория расходов',
        sumCurrent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        data: [],
      },
      {
        id: 2,
        monthId: null,
        expenses: false,
        nameCategory: 'Новая категория доходов',
        sumCurrent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        data: [],
      },
    ],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/state.json');
      const state = response.data;
      this.setState(state);
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    if (this.props.match.path === '/income' && this.state.expenses === true) {
      this.setState({
        expenses: false,
        openView: false,
      });
      console.log('/income', this.state);
    } else if (this.props.match.path === '/' && this.state.expenses === false) {
      this.setState({
        expenses: true,
        openView: false,
      });
      console.log('/', this.state);
    }
    this.sync();
  }

  sumInputArr(arr) {
    return arr.reduce((sum, current) => {
      if (current.id === this.state.currentMonthId) {
        return sum + current.price;
      } else {
        return null;
      }
    }, 0);
  }

  sync = () => {
    try {
      axios.patch('/state.json', this.state);
      console.log('sync');
    } catch (error) {
      console.log(error);
    }
  };

  onChangeHandler = (event, id) => {};

  onSubmitHandler = (event, id, valid, value) => {
    event.preventDefault();

    if (!valid) {
      return;
    }
    // const number = +event.target.firstChild.lastChild.value;
    const number = +value;

    const ind = id - 1;
    const input = [...this.state.input];
    const elementData = { ...input[ind] };
    const newData = {
      date: new Date().toLocaleDateString(),
      price: number,
      // id: new Date().getMonth() + 1,
      id: this.state.currentMonthId,
    };
    const data = elementData.data;
    data.push(newData);

    let newSumCurrent = this.sumInputArr(data);

    const t = this.state.currentMonthId;
    elementData.sumCurrent.splice(t, 1, newSumCurrent);

    input[ind].sumCurrent = elementData.sumCurrent;

    this.setState({
      input,
    });
    this.sync();
  };

  refreshView = (inputId) => {
    this.setState({
      activeInput: inputId - 1,
      openView: true,
    });
  };

  onMonthClickHandler = (monthId) => {
    this.setState({
      currentMonthId: monthId,
      openView: false,
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
    console.log(event.target);

    this.setState({
      modal,
    });
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

  onDeleteModalClickHandler = () => {
    const modal = { ...this.state.modal };
    const input = [...this.state.input];

    const inputId = modal.currentCategoryId;

    const delCategory = input.findIndex((item) => item.id === inputId);
    input.splice(delCategory, 1);

    this.setState({
      input,
    });

    this.onCancelModalClick();
  };

  onDeleteButtonClickHandler = (id, inputId) => {
    const input = [...this.state.input];
    const elementData = { ...input[inputId] };
    const data = elementData.data;

    data.splice(id, 1);

    const newSumCurrent = this.sumInputArr(data);

    const t = this.state.currentMonthId;
    elementData.sumCurrent.splice(t, 1, newSumCurrent);
    input[inputId].sumCurrent = elementData.sumCurrent;

    this.setState({
      input,
    });
  };

  onTestButtonClickHandler = () => {
    this.sync();
    // console.log(this.props.match.path);
  };

  renderInput() {
    const input = [...this.state.input];
    const newInputItem = { ...input[0] };
    const monthId = this.state.currentMonthId;
    const id = input.length + 1;
    newInputItem.id = id;
    newInputItem.monthId = monthId;
    newInputItem.expenses = this.state.expenses;

    newInputItem.nameCategory = 'Новая категория';
    newInputItem.sumCurrent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    newInputItem.data = [];
    input.push(newInputItem);

    this.setState({
      input: input,
    });
  }

  render() {
    return (
      <div className={classes.Expenses}>
        <React.Fragment>
          <Month
            onClick={this.onMonthClickHandler}
            currentMonthId={this.state.currentMonthId}
          />
        </React.Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className={classes.workArea}>
              <Field
                flag={this.state.expenses}
                input={this.state.input}
                activeInput={this.state.activeInput}
                currentMonthId={this.state.currentMonthId}
                onChange={this.onChangeHandler}
                onSubmit={this.onSubmitHandler}
                onClick={this.refreshView}
                onNameCategoryClick={this.onNameCategoryClickHandler}
              />
              <View
                flag={this.state.expenses}
                input={this.state.input[this.state.activeInput]}
                inputId={this.state.activeInput}
                currentMonthId={this.state.currentMonthId}
                openView={this.state.openView}
                data={this.state.input[this.state.activeInput].data}
                onNameCategoryClick={this.onNameCategoryClickHandler}
                onDeleteButtonClick={this.onDeleteButtonClickHandler}
              />
              <Button type="success" onClick={this.onTestButtonClickHandler}>
                Синхронизация
              </Button>
            </div>
            <Button type="primary" onClick={() => this.renderInput()}>
              Добавить
            </Button>
          </React.Fragment>
        )}
        <Modal
          modal={this.state.modal}
          onOkModalClick={this.onOkModalClick}
          onCancelModalClick={this.onCancelModalClick}
          onDeleteModalClick={this.onDeleteModalClickHandler}
          onChangeModal={this.onChangeModal}
          onSubmitModal={this.onSubmitModal}
        />
      </div>
    );
  }
}

export default Expenses;
