import { requestService } from '../services/request';

export const createContactConstants = {
  CREATE_REQUEST: 'CREATE_CONTACTS_REQUEST',
  CREATE_SUCCESS: 'CREATE_CONTACTS_SUCCESS',
  CREATE_FAILURE: 'CREATE_CONTACTS_FAILURE'
};

export const createContactActions = {
  create
};

function request(contact) {
  return { type: createContactConstants.CREATE_REQUEST, contact };
}

function success(contact) {
  return { type: createContactConstants.CREATE_SUCCESS, contact };
}

function failure(error) {
  return { type: createContactConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/contacts', body).then(
      contacts => {
        dispatch(success(contacts));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
