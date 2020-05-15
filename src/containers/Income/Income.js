import React, { Component } from 'react';
import Expenses from '../Expenses/Expenses';

export default class Income extends Component {
  state = {
    expenses: false,
  };

  componentDidMount() {
    //   this.setState({
    //       expenses: false
    //   })
    //   console.log('income');
      console.log(this.state);
      
  }
  
  render() {
    return <Expenses expenses={this.state.expenses} />;
  }
}


