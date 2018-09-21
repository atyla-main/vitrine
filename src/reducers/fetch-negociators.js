import { fetchNegociatorsConstants } from '../actions/fetch-negociators';

export function fetchNegociators(state = {}, action) {
  switch (action.type) {
    case fetchNegociatorsConstants.FETCH_REQUEST:
      return { ...state, fetchingNegociators: true };
    case fetchNegociatorsConstants.FETCH_SUCCESS:
      return {
        ...state,
        negociatorsFetch: true,
        negociators: action.negociators
      };
    case fetchNegociatorsConstants.FETCH_FAILURE:
      return { ...state, negociatorsFetchError: true };
    default:
      return state;
  }
}
