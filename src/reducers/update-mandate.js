import { updateMandateConstants } from '../actions/update-mandate';

export function updateMandate(state = {}, action) {
  switch (action.type) {
    case updateMandateConstants.UPDATE_REQUEST:
      return { ...state, updatingMandate: true };
    case updateMandateConstants.UPDATE_SUCCESS:
      return {
        ...state,
        mandateUpdate: true,
        updatingMandate: false,
        mandate: action.mandate
      };
    case updateMandateConstants.UPDATE_FAILURE:
      return { ...state, mandateUpdateError: true, updatingMandate: false };
    default:
      return state;
  }
}
