import { fetchMandateListConstants } from '../actions/fetch-mandate-list';

export function fetchMandateList(state = {}, action) {
  switch (action.type) {
    case fetchMandateListConstants.FETCH_REQUEST:
      return { ...state, fetchingMandateList: true };
    case fetchMandateListConstants.FETCH_SUCCESS:
      return {
        ...state,
        mandateListFetch: true,
        fetchingMandateList: false,
        mandateList: action.mandateList
      };
    case fetchMandateListConstants.FETCH_FAILURE:
      return { ...state, mandateListFetchError: true };
    default:
      return state;
  }
}
