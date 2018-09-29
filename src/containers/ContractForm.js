import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMandateActions } from '../actions/create-mandate';
import { createPropertyActions } from '../actions/create-property';
import Auth from '../services/Auth';
import MandantNew from '../components/contract-form/mandant/mandant-new';
import Steppers from '../components/steppers/steppers';
import Property from '../components/contract-form/property/property';
import Finance from '../components/contract-form/finance/finance';
import Clause from '../components/contract-form/clause/clause';
import Summary from '../components/contract-form/summary/summary';
import { history } from '../helpers/history';
import { reduxForm, destroy } from 'redux-form';
import MandateFormSubmit from '../components/redux-forms/submit-forms/mandate-form-submit';

class ContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      formNames: [
        'initialForm',
        'propertyForm',
        'testForm',
        'testForm',
        'testForm'
      ]
    };

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const { dispatch, mandateLoaded } = this.props;
    let userId = Auth.getId();
    let body = {
      data: {
        attributes: { status: 'pending' },
        relationships: {
          user: { data: { id: userId, type: 'users' } }
        }
      }
    };

    if (mandateLoaded.data) {
      dispatch(createMandateActions.upload(mandateLoaded));
      if (mandateLoaded.data.relationships.property) {
        dispatch(
          createPropertyActions.upload(
            mandateLoaded.data.relationships.property.data.id
          )
        );
      }
    } else {
      dispatch(createMandateActions.create(body));
    }
  }

  changePage(index) {
    this.setState({ pageNumber: index });
  }

  render() {
    const { pageNumber, formNames } = this.state;

    return (
      <div>
        <button
          onClick={e => {
            window.location.href = '/dashboard/contracts';
          }}
        >
          Retour accueil
        </button>
        <MandateFormSubmit formName={formNames[pageNumber]} />
        <Steppers pageNumber={pageNumber} onPageChange={this.changePage} />
        {pageNumber === 0 && <MandantNew pageNumber={pageNumber} />}
        {pageNumber === 1 && <Property pageNumber={pageNumber} />}
        {pageNumber === 2 && <Finance pageNumber={pageNumber} />}
        {pageNumber === 3 && <Clause pageNumber={pageNumber} />}
        {pageNumber === 4 && <Summary pageNumber={pageNumber} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { createMandate, loadContracts } = state;

  return {
    mandate: createMandate,
    mandateLoaded: loadContracts
  };
}

export default connect(mapStateToProps)(ContractForm);
