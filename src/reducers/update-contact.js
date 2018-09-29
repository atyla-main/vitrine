import { updateContactConstants } from '../actions/update-contacts';

export function updateContact(state = {}, action) {
  switch (action.type) {
    case updateContactConstants.UPDATE_REQUEST:
      return { ...state, updatingContact: true };
    case updateContactConstants.UPDATE_SUCCESS:
      return {
        ...state,
        contactUpdate: true,
        updatingContact: false,
        contact: action.contact
      };
    case updateContactConstants.UPDATE_FAILURE:
      return { ...state, contactUpdateError: true, updatingContact: false };
    default:
      return state;
  }
}
