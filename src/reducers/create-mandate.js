import { createMandateConstants } from '../actions/create-mandate';

export function createMandate(state = {}, action) {
  switch (action.type) {
    case createMandateConstants.CREATE_REQUEST:
      return { ...state, creatingMandate: true };
    case createMandateConstants.CREATE_SUCCESS:
      return {
        ...state,
        mandateCreate: true,
        creatingMandate: false,
        mandate: action.mandate
      };
    case createMandateConstants.CREATE_FAILURE:
      return { ...state, mandateCreateError: true };
    case createMandateConstants.UPLOAD_CREATED_MANDATE:
      return {
        ...state,
        mandateCreate: true,
        creatingMandate: false,
        mandate: action.mandate
      };
    default:
      return state;
  }
}
