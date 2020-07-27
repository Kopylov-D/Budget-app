import React, { Component } from 'react';

import axios from '../../axios/axios-expenses';

import classes from './Accounting.module.css';

import Field from '../../components/Field/Field';
import View from '../../components/View/View';
import Month from '../../components/Navigation/Month/navMonth';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Loader from '../../components/UI/Loader/Loader';

class Accounting extends Component {
  state = {
    currentMonthId: 1,
    isExpenses: true,
    activeCategory: 0,
    openView: true,
    loading: false,
    modal: {
      isOpen: false,
      title: 'Введите имя категории',
      nameCategory: '',
      style: 'modal',
      currentCategoryId: null,
    },
    expensesSum: 0,
    sumCash: 0,

    categories: [
      {
        id: 1,
        monthId: 1,
        isExpenses: true,
        nameCategory: 'Новая категория расходов',
        sumCurrent: {},
      },
      {
        id: 3,
        monthId: 1,
        isExpenses: true,
        nameCategory: 'Новая категория расходов',
        sumCurrent: {},
      },
      {
        id: 2,
        monthId: 1,
        isExpenses: false,
        nameCategory: 'Новая категория доходов',
        sumCurrent: {},
      },
    ],
    data: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/2020/categories.json');
      const data = response.data;

      console.log(data)

      const categories = []

      Object.keys(data).forEach(key => {
        categories.push({
          id: key,
          monthId: data[key].monthId,
          isExpenses: data[key].isExpenses,
          nameCategory: data[key].nameCategory,
          sumCurrent: {}

        })

      })
      console.log(categories)

      this.setState({
        categories
      })


      // this.setState(state);
      // this.setState({ loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  // componentDidUpdate() {
  //   if (this.props.match.path === '/income' && this.state.expenses === true) {
  //     this.setState({
  //       expenses: false,
  //       openView: false,
  //     });
  //     console.log('/income', this.state);
  //   } else if (this.props.match.path === '/' && this.state.expenses === false) {
  //     this.setState({
  //       expenses: true,
  //       openView: false,
  //     });
  //     console.log('/', this.state);
  //   }
  // }

  sync = () => {
    try {
      axios.patch('/state.json', this.state);
      console.log('sync');
    } catch (error) {
      console.log(error);
    }
  };

  onChangeHandler = (event, id) => {};

  onSubmitHandler = async (event, id, valid, value) => {
    event.preventDefault();

    if (!valid) {
      return;
    }

    const categories = [...this.state.categories];
    const data = [...this.state.data];

    const monthId = this.state.currentMonthId;
    const amount = +value;

    const newData = {
      // id: Math.random(),
      date: new Date().toLocaleDateString(),
      amount,
      categoryId: id,
      monthId,
    };

    try {
      const response = await axios.post('/2020/data.json', newData);
      data.push(response.data);
    } catch (e) {
      console.log(e);
    }

    // data.push(newData);

    try {
      const response = await axios.get(`/2020/categories/${id}.json`);
      console.log(response.data)
    } catch (e) {
      console.log(e);
    }

    categories.map((c) => {
      if (c.id === id) {
        c.sumCurrent[monthId]
          ? (c.sumCurrent[monthId] += amount)
          : (c.sumCurrent[monthId] = amount);
        return;
      }
    });

    this.setState({
      categories,
      data,
    });
  };

  refreshView = (categoryId) => {
    this.setState({
      activeCategory: categoryId,
      openView: true,
    });

    console.log(this.state.categories)
  };

  onMonthClickHandler = (monthId) => {
    this.setState({
      currentMonthId: monthId,
      openView: false,
    });
  };

  onNameCategoryClickHandler = (categoryId) => {
    const modal = { ...this.state.modal };
    modal.isOpen = true;
    modal.currentCategoryId = categoryId;

    this.setState({
      modal,
    });
  };

  onChangeModal = (event) => {
    const modal = { ...this.state.modal };
    const newName = event.target.value;

    modal.nameCategory = newName;

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
    const categories = [...this.state.categories];

    const categoryId = modal.currentCategoryId;
    const nameCategory = modal.nameCategory;

    if (modal.nameCategory) {
      categories.map((c) => {
        if (c.id === categoryId) {
          c.nameCategory = nameCategory;
        }
      });
    }

    modal.isOpen = false;
    modal.nameCategory = '';

    this.setState({
      categories,
      modal,
    });
  };

  onCancelModalClick = () => {
    this.setState((state) => (state.modal.isOpen = false));
  };

  onDeleteModalClickHandler = () => {
    const modal = { ...this.state.modal };
    let categories = [...this.state.categories];
    let data = [...this.state.data];

    const categoryId = modal.currentCategoryId;

    const delData = []

    data.forEach(d => {
      if (d.categoryId === categoryId) {
        delData.push(d)
      }
    })

    console.log(delData)

    categories = categories.filter((c) => c.id === categoryId);
    data = data.filter((d) => d.categoryId === categoryId);

    this.setState({
      categories,
      data,
    });

    this.onCancelModalClick();
  };

  onDeleteButtonClickHandler = (id, categoryId) => {
    const categories = [...this.state.categories];
    let data = [...this.state.data];

    const current = data.find((d) => d.id === id);
    const removeSum = current.amount;
    const monthId = current.monthId;
    categories.map((c) => {
      if (c.id === categoryId) {
        c.sumCurrent[monthId] -= removeSum;
      }
    });

    data = data.filter((d) => d.id !== id);

    this.setState({
      categories,
      data,
    });
  };

  onTestButtonClickHandler = async () => {
    try {
      const response = await axios.get('/2020/data.json?orderBy="$key"&equalTo="-MDFvqywIGLkRlwZ-nx3"');

      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
    // try {
    //   const response = await axios.put('/2020.json', this.state);

    //   console.log(response);
    // } catch (e) {
    //   console.error(e);
    // }

    // this.sync();
    // console.log(this.props.match.path);
  };

  async renderInput() {
    const categories = [...this.state.categories];
    const newCategory = {
      // id: Math.random(),
      monthId: this.state.currentMonthId,
      isExpenses: this.state.isExpenses,
      nameCategory: 'Новая категория',
      sumCurrent: {},
    };

    try {
      const response = await axios.post('/2020/categories.json', newCategory);
      categories.push(response.data);
      console.log(response.data)
      this.setState({
        categories,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.accounting}>
        <nav className={classes.toggle}>
          <div
            style={this.state.isExpenses ? { background: 'red' } : null}
            onClick={() => this.setState({ isExpenses: true, openView: false })}
          >
            Расходы
          </div>
          <div
            style={this.state.isExpenses ? null : { background: 'red' }}
            onClick={() => this.setState({ isExpenses: false, openView: false })}
          >
            Доходы
          </div>
        </nav>

        <Month
          onClick={this.onMonthClickHandler}
          currentMonthId={this.state.currentMonthId}
        />
        {this.state.loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className={classes.workArea}>
              <Field
                isExpenses={this.state.isExpenses}
                categories={this.state.categories}
                data={this.state.data}
                currentMonthId={this.state.currentMonthId}
                onChange={this.onChangeHandler}
                onSubmit={this.onSubmitHandler}
                onClick={this.refreshView}
                onNameCategoryClick={this.onNameCategoryClickHandler}
              />
              <View
                isExpenses={this.state.isExpenses}
                activeCategory={this.state.activeCategory}
                currentMonthId={this.state.currentMonthId}
                openView={this.state.openView}
                data={this.state.data}
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

export default Accounting;
