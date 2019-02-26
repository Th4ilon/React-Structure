import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from 'utils/constants';

import loginUser from 'services/login';

function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  };
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

export default function login(username = '', password = '') {
  return (dispatch) => {
    dispatch(requestLogin({ username, password }));
    return loginUser(username, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch(loginSuccess(data));
        }
      })
      .catch(error =>
        dispatch(loginError(error &&
        error.response &&
        error.response.data &&
        error.response.data.mensajeError)));
  };
}
