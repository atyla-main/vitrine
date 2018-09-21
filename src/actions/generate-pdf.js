import { requestService } from '../services/request';

export const generatePdfConstants = {
  GENERATE_REQUEST: 'GENERATE_PDF_REQUEST',
  GENERATE_SUCCESS: 'GENERATE_PDF_SUCCESS',
  GENERATE_FAILURE: 'GENERATE_PDF_FAILURE'
};

export const generatePdfActions = {
  fetch
};

function request() {
  return { type: generatePdfConstants.GENERATE_REQUEST };
}

function success(pdf) {
  return { type: generatePdfConstants.GENERATE_SUCCESS, pdf };
}

function failure(error) {
  return { type: generatePdfConstants.GENERATE_FAILURE, error };
}

function fetch(id) {
  return dispatch => {
    dispatch(request());

    requestService.request('GET', `api/pdf-generations/${id}`, null).then(
      pdf => {
        dispatch(success(pdf));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
}
