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
import { createMandate } from './create-mandate';
import { generatePdf } from './generate-pdf';

export default combineReducers({
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
  generatePdf
});
