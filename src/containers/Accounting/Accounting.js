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
    openView: false,
    loading: true,
    modal: {
      isOpen: false,
      title: 'Введите имя категории',
      nameCategory: '',
      style: 'modal',
      currentCategoryId: null,
    },
    expensesSum: 0,
    sumCash: 0,

    categories: [],
    data: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/2020.json');
      const resData = response.data;

      const categories = [];
      const data = [];

      if (resData.categories) {
        Object.keys(resData.categories).forEach((key) => {
          categories.push({
            id: key,
            monthId: resData.categories[key].monthId,
            isExpenses: resData.categories[key].isExpenses,
            nameCategory: resData.categories[key].nameCategory,
            sumCurrent: resData.categories[key].sumCurrent
              ? resData.categories[key].sumCurrent
              : {},
          });
        });
      }

      if (resData.data) {
        Object.keys(resData.data).forEach((key) => {
          data.push({
            id: key,
            amount: resData.data[key].amount,
            categoryId: resData.data[key].categoryId,
            date: resData.data[key].date,
            monthId: resData.data[key].monthId,
          });
        });
      }

      this.setState({
        categories,
        data,
        currentMonthId: resData.currentMonthId,
        isExpenses: resData.isExpenses,
        loading: false,
      });
    } catch (e) {
      console.error(e);
    }
  }

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
      date: new Date().toLocaleDateString(),
      amount,
      categoryId: id,
      monthId,
    };

    try {
      const response = await axios.post('/2020/data.json', newData);
      newData.id = response.data.name;
      data.push(newData);
      this.setState({
        data,
      });
    } catch (e) {
      console.error(e);
    }

    categories.map((c) => {
      if (c.id === id) {
        c.sumCurrent[monthId]
          ? (c.sumCurrent[monthId] += amount)
          : (c.sumCurrent[monthId] = amount);
      }
    });

    const cat = categories.find((c) => c.id === id);

    try {
      await axios.patch(`/2020/categories/${id}.json`, cat);
      this.setState({
        categories,
      });
      return;
    } catch (e) {
      console.error(e);
    }
  };

  refreshView = (categoryId) => {
    this.setState({
      activeCategory: categoryId,
      openView: true,
    });
  };

  onMonthClickHandler = (monthId) => {
    axios.patch('/2020.json', { currentMonthId: monthId });
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

  onOkModalClick = async () => {
    const modal = { ...this.state.modal };
    const categories = [...this.state.categories];

    const categoryId = modal.currentCategoryId;
    const nameCategory = modal.nameCategory;

    if (modal.nameCategory) {
      categories.map((c) => {
        if (c.id === categoryId) {
          c.nameCategory = nameCategory;
          try {
            axios.patch(`/2020/categories/${categoryId}.json`, c).then((response) => {
              console.log(response.data);
              this.setState({
                categories,
              });
              return;
            });
          } catch (e) {
            console.error(e);
          }
        }
      });
    }

    modal.isOpen = false;
    modal.nameCategory = '';

    this.setState({
      modal,
    });
  };

  onCancelModalClick = () => {
    this.setState((state) => (state.modal.isOpen = false));
  };

  onDeleteModalClickHandler = async () => {
    const modal = { ...this.state.modal };
    let categories = [...this.state.categories];
    let data = [...this.state.data];

    const categoryId = modal.currentCategoryId;

    categories = categories.filter((c) => c.id !== categoryId);
    try {
      await axios.delete(`/2020/categories/${categoryId}.json`);
      this.setState({ categories });
    } catch (e) {
      console.error(e);
    }

    try {
      data.forEach((d) => {
        if (d.categoryId === categoryId) {
          axios.delete(`/2020/data/${d.id}.json`).then(() => {
            data = data.filter((d) => d.categoryId !== categoryId);
            this.setState({ data });
          });
        }
      });
    } catch (e) {
      console.error(e);
    }

    this.onCancelModalClick();
  };

  onDeleteButtonClickHandler = async (id, categoryId) => {
    const categories = [...this.state.categories];
    let data = [...this.state.data];

    const current = data.find((d) => d.id === id);
    const removeSum = current.amount;
    const monthId = current.monthId;
    categories.map((c) => {
      if (c.id === categoryId) {
        c.sumCurrent[monthId] -= removeSum;
        try {
          axios.patch(`/2020/categories/${categoryId}.json`, c).then(() => {
            this.setState({
              categories,
            });
            return;
          });
        } catch (e) {
          console.error(e);
        }
      }
    });

    data = data.filter((d) => d.id !== id);

    try {
      await axios.delete(`/2020/data/${id}.json`);
      this.setState({ data });
    } catch (e) {
      console.error(e);
    }
  };

  onTestButtonClickHandler = async () => {
    try {
      const response = await axios.get(
        '/2020/data.json?orderBy="$key"&equalTo="-MDFvqywIGLkRlwZ-nx3"'
      );

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
      monthId: this.state.currentMonthId,
      isExpenses: this.state.isExpenses,
      nameCategory: 'Новая категория',
      sumCurrent: {},
    };

    try {
      const response = await axios.post('/2020/categories.json', newCategory);
      newCategory.id = response.data.name;
      categories.push(newCategory);
      this.setState({
        categories,
      });
    } catch (e) {
      console.error(e);
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
            </div>
            <Button type="primary" onClick={() => this.renderInput()}>
              Добавить
            </Button>
            <Button type="success" onClick={this.onTestButtonClickHandler}>
              Синхронизация
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
