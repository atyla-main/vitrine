import { createPropertyConstants } from '../actions/create-property';

export function createProperty(state = {}, action) {
  switch (action.type) {
    case createPropertyConstants.CREATE_REQUEST:
      return { ...state, creatingProperty: true };
    case createPropertyConstants.CREATE_SUCCESS:
      return {
        ...state,
        propertyCreate: true,
        creatingProperty: false,
        property: action.property
      };
    case createPropertyConstants.CREATE_FAILURE:
      return { ...state, propertyCreateError: true };
    default:
      return state;
  }
}
