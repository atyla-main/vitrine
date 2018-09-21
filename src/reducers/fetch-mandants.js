import { fetchMandantsConstants } from '../actions/fetch-mandants';

export function fetchMandants(state = {}, action) {
  switch (action.type) {
    case fetchMandantsConstants.FETCH_REQUEST:
      return { ...state, fetchingMandants: true };
    case fetchMandantsConstants.FETCH_SUCCESS:
      return { ...state, mandantsFetch: true, mandants: action.mandants };
    case fetchMandantsConstants.FETCH_FAILURE:
      return { ...state, mandantsFetchError: true };
    default:
      return state;
  }
}
