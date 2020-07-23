import React from 'react';
import classes from './Invest.module.css';
import FieldItem from '../../components/Field/FieldItem/FieldItem';
import { connect } from 'react-redux';

function Invest(props) {
  return (
    <div className={classes.invest}>
      <div>{props.counter}</div>
    </div>
  );

}

const mapStateToProps = (state) => ({
    counter: state.counter

})


export default connect(mapStateToProps)(Invest) 