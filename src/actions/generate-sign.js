import { requestService } from '../services/request';

export const generateSignConstants = {
  GENERATE_REQUEST: 'GENERATE_SIGN_REQUEST',
  GENERATE_SUCCESS: 'GENERATE_SIGN_SUCCESS',
  GENERATE_FAILURE: 'GENERATE_SIGN_FAILURE'
};

export const generateSignActions = {
  fetch
};

function request() {
  return { type: generateSignConstants.GENERATE_REQUEST };
}

function success(sign) {
  return { type: generateSignConstants.GENERATE_SUCCESS, sign };
}

function failure(error) {
  return { type: generateSignConstants.GENERATE_FAILURE, error };
}

function fetch(id) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/sign-generations/${id}`, null).then(
      sign => {
        dispatch(success(sign));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
