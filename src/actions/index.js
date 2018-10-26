import { normalize } from 'normalizr';
import * as api from '../api';
import { getIsFetching } from '../reducers';
import * as schema from './schema';

export const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

export const requestTodos = filter => ({
  type: 'REQUEST_TODOS',
  filter,
});

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(
    response => {
      console.log(
        'normalized response: ',
        normalize(response, schema.arrayOfTods)
      );
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong',
      });
    }
  );
};

export const addTodo = text => dispatch => {
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response,
    });
  });
};

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
