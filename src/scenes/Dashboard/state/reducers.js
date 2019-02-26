import {
  PERMISSION_REQUEST_LIST,
  PERMISSION_LIST_SUCCESS,
  PERMISSION_LIST_ERROR
} from 'utils/constants'; // eslint-disable-line

export default function permissionList(state = {
  isFetching: false,
  permissionList: []
}, action) {
  switch (action.type) {
    case PERMISSION_REQUEST_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        permissionList: []
      });
    case PERMISSION_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        permissionList: action.permissionList
      });
    case PERMISSION_LIST_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.errorMessage,
        permissionList: []
      });
    default:
      return state;
  }
}
