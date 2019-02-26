import {
  PERMISSION_REQUEST_LIST,
  PERMISSION_LIST_SUCCESS,
  PERMISSION_LIST_ERROR
} from 'utils/constants'; // eslint-disable-line

function permissionListRequest() {
  return {
    type: PERMISSION_REQUEST_LIST,
    isFetching: true
  };
}

function permissionListSuccess(permissionList) {
  return {
    type: PERMISSION_LIST_SUCCESS,
    isFetching: false,
    permissionList
  };
}

function permissionListError(errorMessage) {
  return {
    type: PERMISSION_LIST_ERROR,
    isFetching: false,
    errorMessage
  };
}

export default function getPermissionsList() {
  return (dispatch) => {
    dispatch(permissionListRequest());
    return new Promise((resolve, reject) => {
      try {
        // TODO: encrypt user
        const userListPermissions =
          localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).listadoFuncionalidad;
        dispatch(permissionListSuccess(userListPermissions));
        resolve();
      } catch (error) {
        dispatch(permissionListError(error));
        reject(error);
      }
    });
  };
}
