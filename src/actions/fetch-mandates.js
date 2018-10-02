import { requestService } from '../services/request';

export const fetchMandatesConstants = {
  FETCH_REQUEST: 'FETCH_MANDATES_REQUEST',
  FETCH_SUCCESS: 'FETCH_MANDATES_SUCCESS',
  FETCH_FAILURE: 'FETCH_MANDATES_FAILURE'
};

export const fetchMandatesActions = {
  fetch
};

function request() {
  return { type: fetchMandatesConstants.FETCH_REQUEST };
}

function success(mandates) {
  return { type: fetchMandatesConstants.FETCH_SUCCESS, mandates };
}

function failure(error) {
  return { type: fetchMandatesConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/mandates?${params}`, null).then(
      mandates => {
        dispatch(success(mandates));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
