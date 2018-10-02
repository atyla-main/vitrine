import { requestService } from '../services/request';

export const loadMandatesConstants = {
  LOAD_MANDATES: 'LOAD_MANDATES',
  LOAD_SEVERAL_MANDATES_SUCCESS: 'LOAD_SEVERAL_MANDATES_SUCCESS',
  LOAD_SEVERAL_MANDATES_REQUEST: 'LOAD_SEVERAL_MANDATES_REQUEST',
  LOAD_SEVERAL_MANDATES_FAILURE: 'LOAD_SEVERAL_MANDATES_FAILURE'
};

export const loadMandatesActions = {
  load,
  loadFromId
};

function loaded(mandates) {
  return { type: loadMandatesConstants.LOAD_MANDATES, mandates };
}

function load(mandates) {
  return dispatch => {
    dispatch(loaded(mandates));
  };
}

function loadSeveralRequest() {
  return { type: loadMandatesConstants.LOAD_SEVERAL_MANDATES_REQUEST };
}

function loadSeveralSuccess(mandate, index, mandantslength) {
  if (index == mandantslength) {
    return {
      type: loadMandatesConstants.LOAD_SEVERAL_MANDATES_SUCCESS,
      mandate,
      allSuccess: true
    };
  } else {
    return {
      allSuccess: false,
      type: loadMandatesConstants.LOAD_SEVERAL_MANDATES_SUCCESS,
      mandate
    };
  }
}

function loadSeveralFailure() {
  return { type: loadMandatesConstants.LOAD_SEVERAL_MANDATES_FAILURE };
}

function loadFromId(mandants) {
  return dispatch => {
    mandants.forEach((mandant, index) => {
      dispatch(loadSeveralRequest());
      requestService.request('GET', `api/contacts/${mandant.id}`, null).then(
        payload => {
          dispatch(loadSeveralSuccess(payload, mandants.length, index + 1));
        },
        error => {
          dispatch(loadSeveralFailure());
        }
      );
    });
  };
}
