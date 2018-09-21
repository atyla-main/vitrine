import { requestService } from '../services/request';

export const fetchNotariesConstants = {
  FETCH_REQUEST: 'FETCH_NOTARIES_REQUEST',
  FETCH_SUCCESS: 'FETCH_NOTARIES_SUCCESS',
  FETCH_FAILURE: 'FETCH_NOTARIES_FAILURE'
};

export const fetchNotariesActions = {
  fetch
};

function request() {
  return { type: fetchNotariesConstants.FETCH_REQUEST };
}

function success(notaries) {
  return { type: fetchNotariesConstants.FETCH_SUCCESS, notaries };
}

function failure(error) {
  return { type: fetchNotariesConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/contacts?${params}`, null).then(
      notaries => {
        dispatch(success(notaries));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
