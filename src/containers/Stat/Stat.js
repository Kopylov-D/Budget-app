import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import classes from './Stat.module.css';
import CategoryList from '../../components/CategoryList/CategoryList';

import {fetchData} from '../../store/actions/stat';

export const Stat = props => {
  useEffect(() => {
    props.fetchData();
  }, []);

  console.log(props.categories);

  return (
    <div className={classes.stat}>
      <nav className={classes.head}>
        <div>2020</div>
        <div className={classes.menu}>
          <div>Анализ</div>
          <div>Категории</div>
          <div>Общее</div>
          <div>Диаграмма</div>
        </div>
      </nav>
      <div className={classes.main}>
        <div>
          <h5>Расходы</h5>
          <CategoryList categories={props.categories} isExpenses={true} />
        </div>
        <div>
          <h5>Доходы</h5>
          <CategoryList categories={props.categories} isExpenses={false} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.stat.categories,
  data: state.stat.data,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
