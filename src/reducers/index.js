import { combineReducers } from 'redux';
import { fetchUser } from './fetch-user';
import { fetchSetting } from './fetch-setting';
import { fetchContacts } from './fetch-contacts';
import { fetchProperties } from './fetch-properties';
import { fetchOffices } from './fetch-offices';
import { fetchNegociators } from './fetch-negociators';
import { fetchMandants } from './fetch-mandants';
import { fetchNotaries } from './fetch-notaries';
import { fetchMediators } from './fetch-mediators';
import { fetchMandates } from './fetch-mandates';
import { createMandate } from './create-mandate';
import { createContact } from './create-contact';
import { generatePdf } from './generate-pdf';
import { reducer as formReducer } from 'redux-form';
import { updateMandate } from './update-mandate';
import { updateContact } from './update-contact';
import { loadMandates } from './load-mandates';
import { loadContracts } from './load-contracts';
import { updateProperty } from './update-property';
import { createProperty } from './create-property';
import { fetchContract } from './fetch-contract';

export default combineReducers({
  form: formReducer,
  fetchUser,
  fetchSetting,
  fetchContacts,
  fetchProperties,
  fetchOffices,
  fetchNegociators,
  fetchMediators,
  fetchNotaries,
  fetchMandants,
  createMandate,
  generatePdf,
  createContact,
  fetchMandates,
  updateMandate,
  loadMandants: loadMandates,
  updateContact,
  updateProperty,
  createProperty,
  loadContracts,
  fetchContract
});
