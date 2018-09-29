import { loadMandatesConstants } from '../actions/load-mandates';

export function loadMandates(
  state = { contacts: [], data: [], allSuccess: false },
  action
) {
  switch (action.type) {
    case loadMandatesConstants.LOAD_MANDATES:
      return {
        ...state,
        data: action.mandates
      };
    case loadMandatesConstants.LOAD_SEVERAL_MANDATES_REQUEST:
      return { ...state, loadingRequest: true };
    case loadMandatesConstants.LOAD_SEVERAL_MANDATES_SUCCESS:
      return {
        ...state,
        loadedRequest: true,
        loadingRequest: false,
        allSuccess: action.allSuccess,
        contacts: [...state.contacts, action.mandate],
        data: [...state.data, action.mandate]
      };
    case loadMandatesConstants.LOAD_SEVERAL_MANDATES_FAILURE:
      return { ...state, loadingFailed: true };
    default:
      return state;
  }
}
