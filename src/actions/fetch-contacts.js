import { requestService } from '../services/request';

export const fetchContactsConstants = {
  FETCH_REQUEST: 'FETCH_CONTACTS_REQUEST',
  FETCH_SUCCESS: 'FETCH_CONTACTS_SUCCESS',
  FETCH_FAILURE: 'FETCH_CONTACTS_FAILURE'
};

export const fetchContactsActions = {
  fetch
};

function request() {
  return { type: fetchContactsConstants.FETCH_REQUEST };
}

function success(contacts) {
  return { type: fetchContactsConstants.FETCH_SUCCESS, contacts };
}

function failure(error) {
  return { type: fetchContactsConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/contacts?${params}`, null).then(
      contacts => {
        dispatch(success(contacts));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
