import { requestService } from '../services/request';

export const createSettingConstants = {
  CREATE_REQUEST: 'CREATE_SETTINGS_REQUEST',
  CREATE_SUCCESS: 'CREATE_SETTINGS_SUCCESS',
  CREATE_FAILURE: 'CREATE_SETTINGS_FAILURE'
};

export const createSettingActions = {
  create
};

function request(setting) {
  return { type: createSettingConstants.CREATE_REQUEST, setting };
}

function success(setting) {
  return { type: createSettingConstants.CREATE_SUCCESS, setting };
}

function failure(error) {
  return { type: createSettingConstants.CREATE_FAILURE, error };
}

function create(body) {
  return dispatch => {
    dispatch(request());

    requestService.request('POST', 'api/settings', body).then(
      settings => {
        dispatch(success(settings));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
