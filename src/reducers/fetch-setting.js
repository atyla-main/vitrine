import { fetchSettingConstants } from '../actions/fetch-setting';

export function fetchSetting(state = {}, action) {
  switch (action.type) {
    case fetchSettingConstants.FETCH_REQUEST:
      return { ...state, fetchingSetting: true };
    case fetchSettingConstants.FETCH_SUCCESS:
      return { ...state, settingFetch: true, setting: action.setting };
    case fetchSettingConstants.FETCH_FAILURE:
      return { ...state, settingFetchError: true };
    default:
      return state;
  }
}
