import { requestService } from '../services/request';

export const createOfficeConstants = {
  CREATE_REQUEST: 'CREATE_OFFICES_REQUEST',
  CREATE_SUCCESS: 'CREATE_OFFICES_SUCCESS',
  CREATE_FAILURE: 'CREATE_OFFICES_FAILURE'
};

export const createOfficeActions = {
  create
};

function request(office) {
  return { type: createOfficeConstants.CREATE_REQUEST, office };
}

function success(office) {
  return { type: createOfficeConstants.CREATE_SUCCESS, office };
}

function failure(error) {
  return { type: createOfficeConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/offices', body).then(
      offices => {
        dispatch(success(offices));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
