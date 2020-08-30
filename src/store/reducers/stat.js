import {FETCH_DATA_START, FETCH_DATA_SUCCESS, FETCH_ERROR} from '../actions/actionTypes';

const initialState = {
  loading: false,
  categories: [],
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        data: action.data,
        isExpenses: action.isExpenses,

      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
