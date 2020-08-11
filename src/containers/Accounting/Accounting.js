import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from '../../components/Field/Field';
import View from '../../components/View/View';
import Month from '../../components/Navigation/Month/navMonth';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Loader from '../../components/UI/Loader/Loader';
import {
  addInput,
  fetchData,
  submitInput,
  deleteCategory,
  deleteItem,
  setMonthId,
  onModalInput,
  setNewName,
  setSection,
} from '../../store/actions/accounting';

import classes from './Accounting.module.css';

class Accounting extends Component {
  state = {
    activeCategory: 0,
    openView: false,
    modal: {
      isOpen: false,
      title: 'Введите имя категории',
      style: 'modal',
    },
  };

  componentDidMount() {
    this.props.fetchData();
  }

  onSubmitHandler = (event, id, valid, value) => {
    event.preventDefault();

    if (!valid) {
      return;
    }

    this.props.submitInput(id, value);
  };

  refreshView = (categoryId) => {
    this.setState({
      activeCategory: categoryId,
      openView: true,
    });
  };

  onMonthClickHandler = (monthId) => {
    this.props.setMonthId(monthId);
    this.setState({ openView: false });
  };

  onNameCategoryClickHandler = (categoryId) => {
    const modal = { ...this.state.modal };
    modal.isOpen = true;

    this.setState({
      modal,
      activeCategory: categoryId,
    });
  };

  onChangeModal = (event) => {
    const newName = event.target.value;
    this.props.onModalInput(newName);
  };

  onSubmitModal = (event) => {
    event.preventDefault();
    this.onOkModalClickHandler();
  };

  onOkModalClickHandler = () => {
    const categoryId = this.state.activeCategory;
    this.props.setNewName(categoryId);

    this.setState((state) => (state.modal.isOpen = false));
  };

  onCancelModalClickHandler = () => {
    this.setState((state) => (state.modal.isOpen = false));
  };

  onDeleteModalClickHandler = () => {
    const categoryId = this.state.activeCategory;
    this.props.deleteCategory(categoryId);

    this.onCancelModalClickHandler();
  };

  onDeleteButtonClickHandler = (id, categoryId) => {
    this.props.deleteItem(id, categoryId);
  };

  toggleSection = () => {
    this.props.setSection();
    this.setState({ openView: false });
  };

  render() {
    return (
      <div className={classes.accounting}>
        <nav className={classes.toggle}>
          <div
            style={this.props.isExpenses ? { background: 'rgba(240, 87, 108, 1)' } : null}
            onClick={this.toggleSection}
          >
            Расходы
          </div>
          <div
            style={this.props.isExpenses ? null : { background: 'rgba(240, 87, 108, 1)' }}
            onClick={this.toggleSection}
          >
            Доходы
          </div>
        </nav>

        <Month
          onClick={this.onMonthClickHandler}
          currentMonthId={this.props.currentMonthId}
        />
        {this.props.loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className={classes.workArea}>
              <Field
                isExpenses={this.props.isExpenses}
                categories={this.props.categories}
                data={this.props.data}
                currentMonthId={this.props.currentMonthId}
                onSubmit={this.onSubmitHandler}
                onClick={this.refreshView}
                onNameCategoryClick={this.onNameCategoryClickHandler}
              />
              <View
                isExpenses={this.props.isExpenses}
                activeCategory={this.state.activeCategory}
                currentMonthId={this.props.currentMonthId}
                openView={this.state.openView}
                data={this.props.data}
                onNameCategoryClick={this.onNameCategoryClickHandler}
                onDeleteButtonClick={this.onDeleteButtonClickHandler}
              />
            </div>
            <Button type="primary" onClick={this.props.addInput}>
              Добавить
            </Button>
          </React.Fragment>
        )}

        <Modal
          modal={this.state.modal}
          onOkModalClick={this.onOkModalClickHandler}
          onCancelModalClick={this.onCancelModalClickHandler}
          onDeleteModalClick={this.onDeleteModalClickHandler}
          onChangeModal={this.onChangeModal}
          onSubmitModal={this.onSubmitModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentMonthId: state.accounting.currentMonthId,
    isExpenses: state.accounting.isExpenses,
    newNameCategory: state.accounting.newNameCategory,
    loading: state.accounting.loading,
    categories: state.accounting.categories,
    data: state.accounting.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
  addInput: () => dispatch(addInput()),
  deleteCategory: (activeCategory) => dispatch(deleteCategory(activeCategory)),
  deleteItem: (id, categoryId) => dispatch(deleteItem(id, categoryId)),
  setMonthId: (monthId) => dispatch(setMonthId(monthId)),
  onModalInput: (newName) => dispatch(onModalInput(newName)),
  setNewName: (categoryId) => dispatch(setNewName(categoryId)),
  submitInput: (id, value) => dispatch(submitInput(id, value)),
  setSection: () => dispatch(setSection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Accounting);
