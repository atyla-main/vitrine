import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import SummaryForm from '../../redux-forms/contract-summary/summary-form';
import SummaryCollapse from '../../summary-collapse/summary-collapse';
import { generatePdfActions } from '../../../actions/generate-pdf';
import { generateSignActions } from '../../../actions/generate-sign';
import { submit } from 'redux-form';
import SimpleDialogue from '../../dialogue-box/sign-dialogue';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSubmit: false,
      generate: false,
      sign: false,
      open: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      mandate,
      updateMandate,
      generatePdf,
      generateSign
    } = this.props;

    if (
      updateMandate.mandate &&
      prevProps.updateMandate.updatingMandate === true &&
      updateMandate.mandateUpdate === true &&
      updateMandate.updatingMandate === false
    ) {
      if (this.state.generate === true) {
        dispatch(generatePdfActions.fetch(updateMandate.mandate.data.id));
        this.setState({ generate: false });
      }

      if (this.state.sign === true) {
        dispatch(generateSignActions.fetch(updateMandate.mandate.data.id));
        this.setState({ sign: false });
      }
    }

    if (
      generatePdf.pdf &&
      prevProps.generatePdf.fetchingPdf === true &&
      generatePdf.pdfFetch === true &&
      generatePdf.fetchingPdf === false
    ) {
      this.inputElement.click();
    }

    if (
      generateSign.sign &&
      prevProps.generateSign.fetchingSign === true &&
      generateSign.signFetch === true &&
      generateSign.fetchingSign === false
    ) {
      this.setState({ open: true });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit(values) {
    const { dispatch, mandate } = this.props;
    let attributes = values;

    let body = {
      data: {
        attributes: attributes
      }
    };

    dispatch(updateMandateActions.update(body, mandate.mandate.data.id));
    this.setState({ firstSubmit: true });
  }

  render() {
    const {
      dispatch,
      mandate,
      property,
      generatePdf,
      generateSign
    } = this.props;

    return (
      <div className={'finConditionsForm-container mod-summary'}>
        <div className={'summary-content'}>
          <SummaryForm form={'testForm'} onSubmit={this.handleSubmit} />
          <SummaryCollapse title={'Mandant'} />
          <SummaryCollapse title={'Bien'} />
          <SummaryCollapse title={'Conditions financières'} />
          <SummaryCollapse title={'Clauses'} />
        </div>
        {generatePdf.pdf &&
          generatePdf.pdfFetch === true && (
            <a
              ref={input => (this.inputElement = input)}
              href={generatePdf.pdf.data.attributes.pdfUrl}
              target={'_blank'}
              rel={'noopener noreferrer'}
            />
          )}
        <div className={'summary-buttons'}>
          <button
            onClick={e => {
              e.preventDefault();
              dispatch(submit('testForm'));
              this.setState({ generate: true });
            }}
            className={'summary-button'}
          >
            Télécharger le contrat
          </button>
          {(generatePdf.fetchingPdf === true ||
            generateSign.fetchingSign === true) && (
            <div className={'overlay'}>
              <div className={'loader'} />
            </div>
          )}
          <button
            onClick={e => {
              e.preventDefault();
              dispatch(submit('testForm'));
              this.setState({ sign: true });
            }}
            className={'summary-button'}
          >
            Signature numérique
          </button>
          <SimpleDialogue
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { createMandate, updateMandate, generatePdf, generateSign } = state;

  return {
    mandate: createMandate,
    updateMandate,
    generatePdf,
    generateSign
  };
}

export default connect(mapStateToProps)(Summary);
