import { requestService } from '../services/request';

export const fetchNegociatorsConstants = {
  FETCH_REQUEST: 'FETCH_NEGOCIATORS_REQUEST',
  FETCH_SUCCESS: 'FETCH_NEGOCIATORS_SUCCESS',
  FETCH_FAILURE: 'FETCH_NEGOCIATORS_FAILURE'
};

export const fetchNegociatorsActions = {
  fetch
};

function request() {
  return { type: fetchNegociatorsConstants.FETCH_REQUEST };
}

function success(negociators) {
  return { type: fetchNegociatorsConstants.FETCH_SUCCESS, negociators };
}

function failure(error) {
  return { type: fetchNegociatorsConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/negociators?${params}`, null).then(
      negociators => {
        dispatch(success(negociators));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
