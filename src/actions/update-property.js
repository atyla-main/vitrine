import { requestService } from '../services/request';

export const updatePropertyConstants = {
  UPDATE_REQUEST: 'UPDATE_PROPERTIES_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_PROPERTIES_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_PROPERTIES_FAILURE'
};

export const updatePropertyActions = {
  update
};

function request(property) {
  return { type: updatePropertyConstants.UPDATE_REQUEST, property };
}

function success(property) {
  return { type: updatePropertyConstants.UPDATE_SUCCESS, property };
}

function failure(error) {
  return { type: updatePropertyConstants.UPDATE_FAILURE, error };
}

function update(body, id) {
  return dispatch => {
    dispatch(request());

    requestService.request('PUT', `api/properties/${id}`, body).then(
      properties => {
        dispatch(success(properties));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
