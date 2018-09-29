import { loadContractsConstants } from '../actions/load-contracts';

export function loadContracts(state = {}, action) {
  switch (action.type) {
    case loadContractsConstants.LOAD_CONTRACTS:
      return {
        ...state,
        data: action.contracts
      };
    default:
      return state;
  }
}
