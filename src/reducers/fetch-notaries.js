import { fetchNotariesConstants } from '../actions/fetch-notaries';

export function fetchNotaries(state = {}, action) {
  switch (action.type) {
    case fetchNotariesConstants.FETCH_REQUEST:
      return { ...state, fetchingNotaries: true };
    case fetchNotariesConstants.FETCH_SUCCESS:
      return { ...state, notariesFetch: true, notaries: action.notaries };
    case fetchNotariesConstants.FETCH_FAILURE:
      return { ...state, notariesFetchError: true };
    default:
      return state;
  }
}
