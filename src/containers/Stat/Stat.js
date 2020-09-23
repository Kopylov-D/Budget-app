import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';

import CategoryList from '../../components/CategoryList/CategoryList';
import Chart from '../../components/UI/Chart/Chart';
import Loader from '../../components/UI/Loader/Loader';

import {fetchData} from '../../store/actions/stat';

import classes from './Stat.module.css';

export const Stat = props => {
  useEffect(() => {
    props.fetchData();
  }, []);

  return (
    <div className={classes.stat}>
      {props.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Chart proportion={props.proportion} />

          <div className={classes.main}>
            <div>
              <h3>Расходы</h3>
              <CategoryList categories={props.categories} isExpenses={true} />
            </div>
            <div>
              <h3>Доходы</h3>
              <CategoryList categories={props.categories} isExpenses={false} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.stat.categories,
  data: state.stat.data,
  loading: state.stat.loading,
  proportion: state.stat.proportion,
  state: state,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
