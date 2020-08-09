import axios from '../../axios/axios-expenses';
import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_ERROR,
  ADD_INPUT_SET_STATE,
  DELETE_CATEGORY_SET_STATE,
  SET_MONTH_ID,
  ON_MODAL_INPUT,
  SET_DATA,
  SET_CATEGORIES,
  SUBMIT_INPUT_SET_DATA
} from './actionTypes';

export function fetchData() {
  return async (dispatch) => {
    dispatch(fetchDataStart());
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

      const currentMonthId = resData.currentMonthId;
      const isExpenses = resData.isExpenses;

      dispatch(fetchDataSuccess(categories, data, currentMonthId, isExpenses));
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

export function fetchDataSuccess(categories, data, currentMonthId, isExpenses) {
  return {
    type: FETCH_DATA_SUCCESS,
    categories,
    data,
    currentMonthId,
    isExpenses,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error,
  };
}

export function submitInput(id, value) {
  return async (dispatch, setState) => {
    const state = setState()

    const categories = state.accounting.categories
    const monthId = state.accounting.currentMonthId;
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
      dispatch(submitInputSetData(newData))
    } catch (e) {
      dispatch(fetchError(e))
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
      dispatch(setCategories(categories))
      return;
    } catch (e) {
      dispatch(fetchError(e))
    }
  }
}

export function submitInputSetData(newData) {
  return {
    type: SUBMIT_INPUT_SET_DATA,
    newData
  }
}

export function addInput() {
  return async (dispatch, getState) => {
    const state = getState();

    const newCategory = {
      monthId: state.accounting.currentMonthId,
      isExpenses: state.accounting.isExpenses,
      nameCategory: 'Новая категория',
      sumCurrent: {},
    };

    try {
      const response = await axios.post('/2020/categories.json', newCategory);
      newCategory.id = response.data.name;
      dispatch(addInputSetState(newCategory));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
}

export function addInputSetState(newCategory) {
  return {
    type: ADD_INPUT_SET_STATE,
    newCategory,
  };
}

export function deleteCategory(categoryId) {
  return async (dispatch, setState) => {
    const state = setState();
    let categories = state.accounting.categories;
    let data = state.accounting.data;

    categories = categories.filter((c) => c.id !== categoryId);
    try {
      await axios.delete(`/2020/categories/${categoryId}.json`);
      dispatch(setCategories(categories));
    } catch (e) {
      console.error(e);
    }

    try {
      data.forEach((d) => {
        if (d.categoryId === categoryId) {
          axios.delete(`/2020/data/${d.id}.json`).then(() => {
            data = data.filter((d) => d.categoryId !== categoryId);
            dispatch(setData(data));
          });
        }
      });
    } catch (e) {
      fetchError(e);
    }
  };
}

export function deleteItem(id, categoryId) {
  return async (dispatch, setState) => {
    const state = setState();
    const categories = [...state.accounting.categories];
    let data = [...state.accounting.data];

    const currentDataItem = data.find((d) => d.id === id);
    const removeSum = currentDataItem.amount;
    const monthId = currentDataItem.monthId;
    categories.map((c) => {
      if (c.id === categoryId) {
        c.sumCurrent[monthId] -= removeSum;
        try {
          axios.patch(`/2020/categories/${categoryId}.json`, c).then(() => {
            dispatch(setCategories(categories));
            return;
          });
        } catch (e) {
          dispatch(fetchError(e));
        }
      }
    });

    data = data.filter((d) => d.id !== id);

    try {
      await axios.delete(`/2020/data/${id}.json`);
      dispatch(setData(data));
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
}

export function deleteCategorySetState(item) {
  return {
    type: DELETE_CATEGORY_SET_STATE,
    item,
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    data,
  };
}

export function setMonthId(monthId) {
  return async (dispatch) => {
    await axios.patch('/2020.json', { currentMonthId: monthId });

    dispatch({
      type: SET_MONTH_ID,
      monthId,
    });
  };
}

export function setNewName(categoryId) {
  return async (dispatch, setState) => {
    const state = setState();
    const nameCategory = state.accounting.newNameCategory;
    const categories = state.accounting.categories;
    if (nameCategory) {
      categories.map((c) => {
        if (c.id === categoryId) {
          c.nameCategory = nameCategory;
          try {
            axios.patch(`/2020/categories/${categoryId}.json`, c).then(() => {
              dispatch(setCategories(categories))
              return;
            });
          } catch (e) {
            dispatch(fetchError(e));
          }
        }
      });
    }
  };
}

export function onModalInput(newName) {
  return {
    type: ON_MODAL_INPUT,
    newName,
  };
}
