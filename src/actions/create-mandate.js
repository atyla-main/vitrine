import { requestService } from '../services/request';

export const createMandateConstants = {
  CREATE_REQUEST: 'CREATE_MANDATES_REQUEST',
  CREATE_SUCCESS: 'CREATE_MANDATES_SUCCESS',
  CREATE_FAILURE: 'CREATE_MANDATES_FAILURE'
};

export const createMandateActions = {
  create
};

function request(mandate) {
  return { type: createMandateConstants.CREATE_REQUEST, mandate };
}

function success(mandate) {
  return { type: createMandateConstants.CREATE_SUCCESS, mandate };
}

function failure(error) {
  return { type: createMandateConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/mandates', body).then(
      mandates => {
        dispatch(success(mandates));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
