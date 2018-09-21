import { requestService } from '../services/request';

export const createNegociatorConstants = {
  CREATE_REQUEST: 'CREATE_NEGOCIATORS_REQUEST',
  CREATE_SUCCESS: 'CREATE_NEGOCIATORS_SUCCESS',
  CREATE_FAILURE: 'CREATE_NEGOCIATORS_FAILURE'
};

export const createNegociatorActions = {
  create
};

function request(office) {
  return { type: createNegociatorConstants.CREATE_REQUEST, office };
}

function success(office) {
  return { type: createNegociatorConstants.CREATE_SUCCESS, office };
}

function failure(error) {
  return { type: createNegociatorConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/negociators', body).then(
      offices => {
        dispatch(success(offices));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
