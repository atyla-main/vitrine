import { generateSignConstants } from '../actions/generate-sign';

export function generateSign(state = {}, action) {
  switch (action.type) {
    case generateSignConstants.GENERATE_REQUEST:
      return { ...state, fetchingSign: true };
    case generateSignConstants.GENERATE_SUCCESS:
      return {
        ...state,
        fetchingSign: false,
        signFetch: true,
        sign: action.sign
      };
    case generateSignConstants.GENERATE_FAILURE:
      return {
        ...state,
        fetchingSign: false,
        signFetch: false,
        signFetchError: true
      };
    default:
      return state;
  }
}
