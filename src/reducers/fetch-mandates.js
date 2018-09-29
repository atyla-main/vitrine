import { fetchMandatesConstants } from '../actions/fetch-mandates';

export function fetchMandates(state = {}, action) {
  switch (action.type) {
    case fetchMandatesConstants.FETCH_REQUEST:
      return { ...state, fetchingMandates: true };
    case fetchMandatesConstants.FETCH_SUCCESS:
      return {
        ...state,
        mandatesFetch: true,
        fetchingMandates: false,
        mandates: action.mandates
      };
    case fetchMandatesConstants.FETCH_FAILURE:
      return { ...state, mandatesFetchError: true };
    default:
      return state;
  }
}
