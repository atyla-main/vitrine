import { requestService } from '../services/request';

export const fetchSettingConstants = {
  FETCH_REQUEST: 'FETCH_SETTING_REQUEST',
  FETCH_SUCCESS: 'FETCH_SETTING_SUCCESS',
  FETCH_FAILURE: 'FETCH_SETTING_FAILURE'
};

export const fetchSettingActions = {
  fetch
};

function request() {
  return { type: fetchSettingConstants.FETCH_REQUEST };
}

function success(setting) {
  return { type: fetchSettingConstants.FETCH_SUCCESS, setting };
}

function failure(error) {
  return { type: fetchSettingConstants.FETCH_FAILURE, error };
}

function fetch(id) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/settings/${id}`, null).then(
      setting => {
        dispatch(success(setting));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
