import { fetchContactsConstants } from '../actions/fetch-contacts';

export function fetchContacts(state = {}, action) {
  switch (action.type) {
    case fetchContactsConstants.FETCH_REQUEST:
      return { ...state, fetchingContacts: true };
    case fetchContactsConstants.FETCH_SUCCESS:
      return { ...state, contactsFetch: true, contacts: action.contacts };
    case fetchContactsConstants.FETCH_FAILURE:
      return { ...state, contactsFetchError: true };
    default:
      return state;
  }
}
