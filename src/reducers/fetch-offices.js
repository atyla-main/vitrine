import { fetchOfficesConstants } from '../actions/fetch-offices';

export function fetchOffices(state = {}, action) {
  switch (action.type) {
    case fetchOfficesConstants.FETCH_REQUEST:
      return { ...state, fetchingOffices: true };
    case fetchOfficesConstants.FETCH_SUCCESS:
      return { ...state, officesFetch: true, offices: action.offices };
    case fetchOfficesConstants.FETCH_FAILURE:
      return { ...state, officesFetchError: true };
    default:
      return state;
  }
}
