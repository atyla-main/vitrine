import { generatePdfConstants } from '../actions/generate-pdf';

export function generatePdf(state = {}, action) {
  switch (action.type) {
    case generatePdfConstants.GENERATE_REQUEST:
      return { ...state, fetchingPdf: true };
    case generatePdfConstants.GENERATE_SUCCESS:
      return { ...state, fetchingPdf: false, pdfFetch: true, pdf: action.pdf };
    case generatePdfConstants.GENERATE_FAILURE:
      return {
        ...state,
        fetchingPdf: false,
        pdfFetch: false,
        pdfFetchError: true
      };
    default:
      return state;
  }
}
