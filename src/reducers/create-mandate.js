import { createMandateConstants } from '../actions/create-mandate';

export function createMandate(state = {}, action) {
  switch (action.type) {
    case createMandateConstants.CREATE_REQUEST:
      return { ...state, creatingMandate: true };
    case createMandateConstants.CREATE_SUCCESS:
      return { ...state, mandateCreate: true, mandate: action.mandate };
    case createMandateConstants.CREATE_FAILURE:
      return { ...state, mandateCreateError: true };
    default:
      return state;
  }
}
