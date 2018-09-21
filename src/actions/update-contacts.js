import { requestService } from '../services/request';

export const updateContactConstants = {
  UPDATE_REQUEST: 'UPDATE_CONTACTS_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_CONTACTS_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_CONTACTS_FAILURE'
};

export const updateContactActions = {
  update
};

function request(contact) {
  return { type: updateContactConstants.UPDATE_REQUEST, contact };
}

function success(contact) {
  return { type: updateContactConstants.UPDATE_SUCCESS, contact };
}

function failure(error) {
  return { type: updateContactConstants.UPDATE_FAILURE, error };
}

function update(body, id) {
  return dispatch => {
    dispatch(request());

    requestService.request('PUT', `api/contacts/${id}`, body).then(
      contacts => {
        dispatch(success(contacts));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
