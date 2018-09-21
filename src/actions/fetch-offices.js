import { requestService } from '../services/request';

export const fetchOfficesConstants = {
  FETCH_REQUEST: 'FETCH_OFFICES_REQUEST',
  FETCH_SUCCESS: 'FETCH_OFFICES_SUCCESS',
  FETCH_FAILURE: 'FETCH_OFFICES_FAILURE'
};

export const fetchOfficesActions = {
  fetch
};

function request() {
  return { type: fetchOfficesConstants.FETCH_REQUEST };
}

function success(offices) {
  return { type: fetchOfficesConstants.FETCH_SUCCESS, offices };
}

function failure(error) {
  return { type: fetchOfficesConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/offices?${params}`, null).then(
      offices => {
        dispatch(success(offices));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
