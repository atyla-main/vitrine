import { requestService } from '../services/request';

export const loadContractsConstants = {
  LOAD_CONTRACTS: 'LOAD_CONTRACTS'
};

export const loadContractsActions = {
  load
};

function loaded(contracts) {
  return { type: loadContractsConstants.LOAD_CONTRACTS, contracts };
}

function load(contracts) {
  return dispatch => {
    dispatch(loaded(contracts));
  };
}
