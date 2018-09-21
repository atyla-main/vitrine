import { requestService } from '../services/request';

export const fetchUserConstants = {
  FETCH_REQUEST: 'FETCH_USER_REQUEST',
  FETCH_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_FAILURE: 'FETCH_USER_FAILURE'
};

export const fetchUserActions = {
  fetch
};

function request() {
  return { type: fetchUserConstants.FETCH_REQUEST };
}

function success(user) {
  return { type: fetchUserConstants.FETCH_SUCCESS, user };
}

function failure(error) {
  return { type: fetchUserConstants.FETCH_FAILURE, error };
}

function fetch(id) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/users/${id}`, null).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
