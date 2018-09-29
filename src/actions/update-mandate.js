import { requestService } from '../services/request';
import moment from 'moment';

export const updateMandateConstants = {
  UPDATE_REQUEST: 'UPDATE_MANDATES_REQUEST',
  UPDATE_SUCCESS: 'UPDATE_MANDATES_SUCCESS',
  UPDATE_FAILURE: 'UPDATE_MANDATES_FAILURE'
};

export const updateMandateActions = {
  update
};

function request(mandate) {
  return { type: updateMandateConstants.UPDATE_REQUEST, mandate };
}

function success(mandate) {
  return { type: updateMandateConstants.UPDATE_SUCCESS, mandate };
}

function failure(error) {
  return { type: updateMandateConstants.UPDATE_FAILURE, error };
}

function update(body, id) {
  return dispatch => {
    dispatch(request());

    requestService.request('PUT', `api/mandates/${id}`, body).then(
      mandates => {
        if (mandates.data.attributes['signature-date'] != null) {
          mandates.data.attributes['signature-date'] = moment(
            mandates.data.attributes['signature-date']
          ).format('MM/DD/YYYY');
        }
        dispatch(success(mandates));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
