import { requestService } from '../services/request';

export const updateSettingConstants = {
  UPDATE_REQUEST: 'UPDATE_SETTINGS_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_SETTINGS_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_SETTINGS_FAILURE'
};

export const updateSettingActions = {
  update
};

function request(setting) {
  return { type: updateSettingConstants.UPDATE_REQUEST, setting };
}

function success(setting) {
  return { type: updateSettingConstants.UPDATE_SUCCESS, setting };
}

function failure(error) {
  return { type: updateSettingConstants.UPDATE_FAILURE, error };
}

function update(body, id) {
  return dispatch => {
    dispatch(request());

    requestService.request('PUT', `api/settings/${id}`, body).then(
      settings => {
        dispatch(success(settings));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
