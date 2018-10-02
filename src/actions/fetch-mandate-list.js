import { requestService } from '../services/request';
import moment from 'moment';

export const fetchMandateListConstants = {
  FETCH_REQUEST: 'FETCH_MANDATE_LIST_REQUEST',
  FETCH_SUCCESS: 'FETCH_MANDATE_LIST_SUCCESS',
  FETCH_FAILURE: 'FETCH_MANDATE_LIST_FAILURE'
};

export const fetchMandateListActions = {
  fetch
};

function request() {
  return { type: fetchMandateListConstants.FETCH_REQUEST };
}

function success(mandateList) {
  return { type: fetchMandateListConstants.FETCH_SUCCESS, mandateList };
}

function failure(error) {
  return { type: fetchMandateListConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/contract-list${params}`, null).then(
      mandateList => {
        dispatch(success(mandateList));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
