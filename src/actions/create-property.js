import { requestService } from '../services/request';

export const createPropertyConstants = {
  CREATE_REQUEST: 'CREATE_PROPERTIES_REQUEST',
  CREATE_SUCCESS: 'CREATE_PROPERTIES_SUCCESS',
  CREATE_FAILURE: 'CREATE_PROPERTIES_FAILURE'
};

export const createPropertyActions = {
  create
};

function request(property) {
  return { type: createPropertyConstants.CREATE_REQUEST, property };
}

function success(property) {
  return { type: createPropertyConstants.CREATE_SUCCESS, property };
}

function failure(error) {
  return { type: createPropertyConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/properties', body).then(
      propertys => {
        dispatch(success(propertys));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
