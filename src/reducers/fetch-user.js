import { fetchUserConstants } from '../actions/fetch-user';

export function fetchUser(state = {}, action) {
  switch (action.type) {
    case fetchUserConstants.FETCH_REQUEST:
      return { ...state, fetchingUser: true };
    case fetchUserConstants.FETCH_SUCCESS:
      return {
        ...state,
        fetchingUser: false,
        userFetch: true,
        user: action.user
      };
    case fetchUserConstants.FETCH_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        userFetch: false,
        userFetchError: true
      };
    default:
      return state;
  }
}
