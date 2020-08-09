import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_ERROR,
  ADD_INPUT_SET_STATE,
  SET_MONTH_ID,
  ON_MODAL_INPUT,
  SET_CATEGORIES,
  SET_DATA,
  SUBMIT_INPUT_SET_DATA
} from '../actions/actionTypes';

const initialState = {
  currentMonthId: 1,
  isExpenses: true,
  newNameCategory: '',
  // expensesSum: 0,
  // sumCash: 0,
  categories: [],
  data: [],
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.categories,
        data: action.data,
        currentMonthId: action.currentMonthId,
        isExpenses: action.isExpenses,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_INPUT_SET_STATE:
      return {
        ...state,
        categories: [...state.categories, action.newCategory],
      };
    case SUBMIT_INPUT_SET_DATA:
      return {
        ...state,
        data: [...state.data, action.newData],
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case SET_MONTH_ID:
      return {
        ...state,
        currentMonthId: action.monthId,
      };
    case ON_MODAL_INPUT:
      return {
        ...state,
        newNameCategory: action.newName,
      };
    default:
      return state;
  }
};
