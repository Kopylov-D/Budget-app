import {FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_ERROR} from './actionTypes';
import axios from '../../axios/axios-stat';

const findSum = arr => {
  const proportion = {
    expenses: 0,
    income: 0,
  };
  arr.forEach(item => {
    if (item.isExpenses) {
      proportion.expenses += item.totalAmount;
    } else {
      proportion.income += item.totalAmount;
    }
  });
  return proportion;
};

export function fetchData() {
  return async dispatch => {
    dispatch(fetchDataStart());
    try {
      const response = await axios.get('/2020.json');
      const resData = response.data;

      const categories = [];
      const data = [];

      if (resData.categories) {
        Object.keys(resData.categories).forEach(key => {
          categories.push({
            id: key,
            monthId: resData.categories[key].monthId,
            isExpenses: resData.categories[key].isExpenses,
            nameCategory: resData.categories[key].nameCategory,
            sumCurrent: resData.categories[key].sumCurrent
              ? resData.categories[key].sumCurrent
              : {},
            totalAmount: resData.categories[key].totalAmount,
          });
        });
      }
      if (resData.data) {
        Object.keys(resData.data).forEach(key => {
          data.push({
            id: key,
            amount: resData.data[key].amount,
            categoryId: resData.data[key].categoryId,
            date: resData.data[key].date,
            monthId: resData.data[key].monthId,
          });
        });
      }

      const currentMonthId = resData.currentMonthId;
      const isExpenses = resData.isExpenses;
      const proportion = findSum(categories);

      dispatch(
        fetchDataSuccess(categories, data, currentMonthId, isExpenses, proportion)
      );
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
}

export function fetchDataStart() {
  return {
    type: FETCH_DATA_START,
  };
}

export function fetchDataSuccess(
  categories,
  data,
  currentMonthId,
  isExpenses,
  proportion
) {
  return {
    type: FETCH_DATA_SUCCESS,
    categories,
    data,
    currentMonthId,
    isExpenses,
    proportion,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error,
  };
}
