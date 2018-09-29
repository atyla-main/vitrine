import { fetchContractConstants } from '../actions/fetch-contract';

export function fetchContract(state = {}, action) {
  switch (action.type) {
    case fetchContractConstants.FETCH_REQUEST:
      return { ...state, fetchingContract: true, contractFetch: false };
    case fetchContractConstants.FETCH_SUCCESS:
      return {
        ...state,
        fetchingContract: false,
        contractFetch: true,
        contract: action.contract
      };
    case fetchContractConstants.FETCH_FAILURE:
      return { ...state, contractFetchError: true };
    default:
      return state;
  }
}
