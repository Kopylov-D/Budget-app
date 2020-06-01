import React, { Component } from 'react';
// import Expenses from '../Expenses/Expenses';
import { Redirect } from 'react-router-dom';

export default class Income extends Component {
  state = {
    expenses: false,
  };

  // render() {
  //   return <Expenses expenses={this.state.expenses} />;
  // }

  render() {
    return <Redirect to={'/expenses'} expenses={this.state.expenses}/>;
  }
}
