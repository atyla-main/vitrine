import { fetchMediatorsConstants } from '../actions/fetch-mediators';

export function fetchMediators(state = {}, action) {
  switch (action.type) {
    case fetchMediatorsConstants.FETCH_REQUEST:
      return { ...state, fetchingMediators: true };
    case fetchMediatorsConstants.FETCH_SUCCESS:
      return { ...state, mediatorsFetch: true, mediators: action.mediators };
    case fetchMediatorsConstants.FETCH_FAILURE:
      return { ...state, mediatorsFetchError: true };
    default:
      return state;
  }
}
