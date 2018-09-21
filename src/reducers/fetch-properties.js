import { fetchPropertiesConstants } from '../actions/fetch-properties';

export function fetchProperties(state = {}, action) {
  switch (action.type) {
    case fetchPropertiesConstants.FETCH_REQUEST:
      return { ...state, fetchingProperties: true };
    case fetchPropertiesConstants.FETCH_SUCCESS:
      return { ...state, propertiesFetch: true, properties: action.properties };
    case fetchPropertiesConstants.FETCH_FAILURE:
      return { ...state, propertiesFetchError: true };
    default:
      return state;
  }
}
