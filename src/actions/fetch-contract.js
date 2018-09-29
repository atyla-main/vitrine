import { requestService } from '../services/request';

export const fetchContractConstants = {
  FETCH_REQUEST: 'FETCH_CONTRACT_REQUEST',
  FETCH_SUCCESS: 'FETCH_CONTRACT_SUCCESS',
  FETCH_FAILURE: 'FETCH_CONTRACT_FAILURE'
};

export const fetchContractActions = {
  fetch
};

function request() {
  return { type: fetchContractConstants.FETCH_REQUEST };
}

function success(contract) {
  return { type: fetchContractConstants.FETCH_SUCCESS, contract };
}

function failure(error) {
  return { type: fetchContractConstants.FETCH_FAILURE, error };
}

function fetch(id) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/mandates/${id}`, null).then(
      contract => {
        dispatch(success(contract));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
