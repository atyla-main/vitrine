import { updatePropertyConstants } from '../actions/update-property';

export function updateProperty(state = {}, action) {
  switch (action.type) {
    case updatePropertyConstants.UPDATE_REQUEST:
      return { ...state, updatingProperty: true };
    case updatePropertyConstants.UPDATE_SUCCESS:
      return {
        ...state,
        propertyUpdate: true,
        updatingProperty: false,
        property: action.property
      };
    case updatePropertyConstants.UPDATE_FAILURE:
      return { ...state, propertyUpdateError: true, updatingProperty: false };
    default:
      return state;
  }
}
