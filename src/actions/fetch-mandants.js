import { requestService } from '../services/request';

export const fetchMandantsConstants = {
  FETCH_REQUEST: 'FETCH_MANDANTS_REQUEST',
  FETCH_SUCCESS: 'FETCH_MANDANTS_SUCCESS',
  FETCH_FAILURE: 'FETCH_MANDANTS_FAILURE'
};

export const fetchMandantsActions = {
  fetch
};

function request() {
  return { type: fetchMandantsConstants.FETCH_REQUEST };
}

function success(mandants) {
  return { type: fetchMandantsConstants.FETCH_SUCCESS, mandants };
}

function failure(error) {
  return { type: fetchMandantsConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/contacts?${params}`, null).then(
      mandants => {
        dispatch(success(mandants));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
