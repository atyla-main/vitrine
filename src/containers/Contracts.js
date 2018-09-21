import React, { Component } from 'react';
import Auth from '../services/Auth';
import { connect } from 'react-redux';
import { fetchNegociatorsActions } from '../actions/fetch-negociators';
import { fetchMandantsActions } from '../actions/fetch-mandants';
import { fetchNotariesActions } from '../actions/fetch-notaries';
import { fetchMediatorsActions } from '../actions/fetch-mediators';
import { fetchPropertiesActions } from '../actions/fetch-properties';
import { fetchOfficesActions } from '../actions/fetch-offices';
import Relations from './contract-pages/relations';
import References from './contract-pages/references';
import { createMandateActions } from '../actions/create-mandate';
import { updateContactActions } from '../actions/update-contacts';
import { generatePdfActions } from '../actions/generate-pdf';
import Annex from './contract-pages/annex';

class Contracts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parameters: {
        wording: '',
        internalReference: '',
        mandateNumber: '',
        signatureDate: 0,
        saleAmount: '',
        remunerationType: 'Forfaitaire',
        percentage: 0,
        lumpSum: '',
        inChargeOfRemuneration: '',
        escrowAccount: '',
        delegationOfPower: {
          totale: false,
          proposer: false,
          visiter: false,
          publicite: false,
          custom: false
        },
        documentsRequired: {
          surfaceCarrez: false,
          dossierTechnique: false,
          carnetEntretien: false,
          organisationImmeuble: false
        },
        mandateAdvertising: '',
        penaltyClauseDuration: 0,
        specialClause: '',
        documentsRequiredPerson: '',
        partsFilingDeadline: 0,
        mandateReference: '',
        officeId: '',
        negociatorId: '',
        propertyId: '',
        mandantId: '',
        notaryId: '',
        mediatorId: '',
        negociatorOnContract: false
      },
      step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckAnnex = this.handleCheckAnnex.bind(this);
    this.handleCheckProvide = this.handleCheckProvide.bind(this);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    let userId = Auth.getId();

    dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
    dispatch(fetchNegociatorsActions.fetch(`userId=${userId}`));
    dispatch(fetchMandantsActions.fetch(`userId=${userId}&status=mandant`));
    dispatch(fetchNotariesActions.fetch(`userId=${userId}&status=notaire`));
    dispatch(fetchMediatorsActions.fetch(`userId=${userId}&status=mediateur`));
    dispatch(fetchPropertiesActions.fetch(`userId=${userId}`));
    dispatch(fetchOfficesActions.fetch(`userId=${userId}`));
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { parameters } = this.state;

    this.setState({
      parameters: {
        ...parameters,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, mandate } = this.props;
    const { parameters } = this.state;
    let attributes = parameters;

    attributes.saleAmount = {
      amount: parameters.saleAmount,
      currency: 'EUR'
    };

    attributes.lumpSum = {
      amount: parameters.lumpSum,
      currency: 'EUR'
    };

    let body = {
      data: {
        attributes: attributes,
        relationships: {
          user: { data: { id: Auth.getId(), type: 'users' } },
          office: {
            data: { id: this.state.parameters.officeId, type: 'offices' }
          },
          negociator: {
            data: {
              id: this.state.parameters.negociatorId,
              type: 'negociators'
            }
          },
          property: {
            data: { id: this.state.parameters.propertyId, type: 'properties' }
          }
        }
      }
    };

    dispatch(createMandateActions.create(body));
    this.setState({ step: this.state.step === 3 ? 3 : this.state.step + 1 });
    if (this.state.step === 3 && mandate && mandate.mandate) {
      dispatch(generatePdfActions.fetch(mandate.mandate.data.id));
    }
  }

  componentDidUpdate() {
    const { dispatch, mandate } = this.props;

    if (mandate && mandate.mandateCreate === true) {
      let body = {
        data: {
          relationships: {
            mandate: { data: { id: mandate.mandate.data.id, type: 'mandates' } }
          }
        }
      };

      if (this.state.parameters.mandantId) {
        dispatch(
          updateContactActions.update(body, this.state.parameters.mandantId)
        );
      }
      if (this.state.parameters.notaryId) {
        dispatch(
          updateContactActions.update(body, this.state.parameters.notaryId)
        );
      }
      if (this.state.parameters.mediatorId) {
        dispatch(
          updateContactActions.update(body, this.state.parameters.mediatorId)
        );
      }
    }
  }

  handleCheckAnnex(event) {
    const { name, value } = event.target;
    const { parameters } = this.state;
    let newDelegation = this.state.parameters.delegationOfPower;
    let newVal = false;

    if (value == 'false' || value == false) {
      newVal = true;
    }
    newDelegation[name] = newVal;

    this.setState({
      parameters: {
        ...parameters,
        delegationOfPower: newDelegation
      }
    });
  }

  handleCheckProvide(event) {
    const { name, value } = event.target;
    const { parameters } = this.state;
    let newDelegation = this.state.parameters.documentsRequired;
    let newVal = false;

    if (value == 'false' || value == false) {
      newVal = true;
    }
    newDelegation[name] = newVal;

    this.setState({
      parameters: {
        ...parameters,
        documentsRequired: newDelegation
      }
    });
  }

  handleCheckBox(event) {
    const { name, value } = event.target;
    const { parameters } = this.state;
    let newVal = false;

    if (value == 'false' || value == false) {
      newVal = true;
    }
    this.setState({
      parameters: {
        ...parameters,
        [name]: newVal
      }
    });
  }

  render() {
    const { pdf } = this.props;

    if (pdf.pdfFetch == true) {
      return (
        <div>
          <a href={pdf.pdf.data.attributes.pdfUrl}>Télécharger le contrat</a>
        </div>
      );
    } else if (pdf.fetchingPdf == true) {
      return <div>Loading.... le pdf se génére</div>;
    } else {
      return (
        <div className={'contract-tab'}>
          <p>Contract</p>
          {this.state.step == 1 && (
            <Relations
              onChange={this.handleChange}
              onChangeCheck={this.handleCheckBox}
              onSubmit={this.handleSubmit}
              parameters={this.state.parameters}
            />
          )}
          {this.state.step == 2 && (
            <References
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              parameters={this.state.parameters}
            />
          )}
          {this.state.step == 3 && (
            <Annex
              handleCheckAnnex={this.handleCheckAnnex}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              parameters={this.state.parameters}
              handleCheckProvide={this.handleCheckProvide}
            />
          )}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const {
    fetchNegociators,
    fetchOffices,
    fetchMediators,
    fetchNotaries,
    fetchProperties,
    fetchMandants,
    createMandate,
    generatePdf
  } = state;

  return {
    offices: fetchOffices,
    negociators: fetchNegociators,
    notaries: fetchNotaries,
    mandants: fetchMandants,
    properties: fetchProperties,
    mediators: fetchMediators,
    mandate: createMandate,
    pdf: generatePdf
  };
}

export default connect(mapStateToProps)(Contracts);
