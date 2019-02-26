import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import Raven from 'raven-js';

import auth from 'scenes/Login/state/reducers'; // eslint-disable-line
import permissionList from 'scenes/Dashboard/state/reducers'; // eslint-disable-line

/* This is a reducer. In a future, we'll move this function. */
const loadedForm = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD':
      return {
        data: action.data
      };
    default:
      return state;
  }
};
/*
const loadFormItems = (state = {}, action) => {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return {
        data: action.data
      };
    default:
      return state;
  }
};
*/
const logger = store => next => (action) => {
  console.log('Dispatching', action); // eslint-disable-line no-console
  const result = next(action);
  console.log('Next state', store.getState()); // eslint-disable-line no-console
  return result;
};

const crashReporter = store => next => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err); // eslint-disable-line no-console
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });
    throw err;
  }
};

const store = createStore(
  combineReducers({
    loadedForm,
    // loadFormItems,
    form: formReducer,
    auth,
    permissionList
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunkMiddleware, logger, crashReporter)
);

export default store;
