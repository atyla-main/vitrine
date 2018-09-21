import { requestService } from '../services/request';

export const fetchMediatorsConstants = {
  FETCH_REQUEST: 'FETCH_MEDIATORS_REQUEST',
  FETCH_SUCCESS: 'FETCH_MEDIATORS_SUCCESS',
  FETCH_FAILURE: 'FETCH_MEDIATORS_FAILURE'
};

export const fetchMediatorsActions = {
  fetch
};

function request() {
  return { type: fetchMediatorsConstants.FETCH_REQUEST };
}

function success(mediators) {
  return { type: fetchMediatorsConstants.FETCH_SUCCESS, mediators };
}

function failure(error) {
  return { type: fetchMediatorsConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/contacts?${params}`, null).then(
      mediators => {
        dispatch(success(mediators));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
