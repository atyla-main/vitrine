import { requestService } from '../services/request';

export const fetchPropertiesConstants = {
  FETCH_REQUEST: 'FETCH_PROPERTIES_REQUEST',
  FETCH_SUCCESS: 'FETCH_PROPERTIES_SUCCESS',
  FETCH_FAILURE: 'FETCH_PROPERTIES_FAILURE'
};

export const fetchPropertiesActions = {
  fetch
};

function request() {
  return { type: fetchPropertiesConstants.FETCH_REQUEST };
}

function success(properties) {
  return { type: fetchPropertiesConstants.FETCH_SUCCESS, properties };
}

function failure(error) {
  return { type: fetchPropertiesConstants.FETCH_FAILURE, error };
}

function fetch(params) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/properties?${params}`, null).then(
      properties => {
        dispatch(success(properties));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
