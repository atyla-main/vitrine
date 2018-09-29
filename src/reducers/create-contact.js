import { createContactConstants } from '../actions/create-contact';

export function createContact(state = {}, action) {
  switch (action.type) {
    case createContactConstants.CREATE_REQUEST:
      return { ...state, creatingContact: true };
    case createContactConstants.CREATE_SUCCESS:
      return {
        ...state,
        contactCreate: true,
        creatingContact: false,
        contact: action.contact
      };
    case createContactConstants.CREATE_FAILURE:
      return { ...state, contactCreateError: true, creatingContact: false };
    default:
      return state;
  }
}
