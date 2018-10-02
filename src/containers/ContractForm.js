import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMandateActions } from '../actions/create-mandate';
import { createPropertyActions } from '../actions/create-property';
import { updateMandateActions } from '../actions/update-mandate';
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
import { submit } from 'redux-form';
import ArrowLeft from '../img/atyla-design-v1/arrow_left.png';
import NextArrow from '../img/atyla-design-v1/next_arrow.png';

class ContractForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 0,
      pageIndex: 0,
      pageChanged: false,
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

  componentDidUpdate(prevProps, prevState) {
    const {
      mandate,
      updateMandate,
      createProperty,
      updateProperty,
      dispatch
    } = this.props;

    if (
      createProperty.property &&
      prevProps.createProperty.creatingProperty === true &&
      createProperty.propertyCreate === true &&
      createProperty.creatingProperty === false
    ) {
      dispatch(
        updateMandateActions.update(
          {
            data: {
              attributes: {},
              relationships: {
                property: {
                  data: {
                    id: createProperty.property.data.id,
                    type: 'properties'
                  }
                }
              }
            }
          },
          mandate.mandate.data.id
        )
      );
    }

    if (this.state.pageChanged === true) {
      if (
        updateMandate.mandate &&
        prevProps.updateMandate.updatingMandate === true &&
        updateMandate.mandateUpdate === true &&
        updateMandate.updatingMandate === false
      ) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (this.state.pageIndex > 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (prevState.pageIndex > 0 && this.state.pageIndex === 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      }
      if (
        createProperty.property &&
        prevProps.createProperty.creatingProperty === true &&
        createProperty.propertyCreate === true &&
        createProperty.creatingProperty === false
      ) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (this.state.pageIndex > 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (prevState.pageIndex > 0 && this.state.pageIndex === 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      }

      if (
        updateProperty.property &&
        prevProps.updateProperty.updatingProperty === true &&
        updateProperty.propertyUpdate === true &&
        updateProperty.updatingProperty === false
      ) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (this.state.pageIndex > 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      } else if (prevState.pageIndex > 0 && this.state.pageIndex === 0) {
        this.setState({ pageNumber: this.state.pageIndex });
      }

      this.setState({ pageChanged: false });
    }
  }

  changePage(index) {
    const { dispatch } = this.props;
    const { formNames, pageNumber } = this.state;

    this.setState({ pageChanged: true });

    let formName = formNames[pageNumber];
    dispatch(submit(formName));
    this.setState({ pageIndex: index });
  }

  render() {
    const { pageNumber, formNames } = this.state;

    return (
      <div className={'contract-tab'}>
        <div className={'contractForm-header'}>
          <button
            className={'contractForm-backButton'}
            onClick={e => {
              window.location.href = '/dashboard/contracts';
            }}
          >
            <img src={ArrowLeft} alt="" height={10} width={10} /> Accueil
          </button>
          <MandateFormSubmit text={'Submit'} formName={formNames[pageNumber]} />
        </div>
        <div className={'contractForm-steppers'}>
          <Steppers
            pageNumber={pageNumber}
            formName={formNames[pageNumber]}
            onPageChange={this.changePage}
            currentPage={pageNumber}
          />
        </div>
        {pageNumber === 0 && (
          <MandantNew
            pageNumber={pageNumber}
            onNext={() => this.changePage(pageNumber + 1)}
          />
        )}
        {pageNumber === 1 && (
          <Property
            pageNumber={pageNumber}
            onNext={() => this.changePage(pageNumber + 1)}
            onPrev={() => this.changePage(pageNumber - 1)}
          />
        )}
        {pageNumber === 2 && (
          <Finance
            pageNumber={pageNumber}
            onNext={() => this.changePage(pageNumber + 1)}
            onPrev={() => this.changePage(pageNumber - 1)}
          />
        )}
        {pageNumber === 3 && (
          <Clause
            pageNumber={pageNumber}
            onNext={() => this.changePage(pageNumber + 1)}
            onPrev={() => this.changePage(pageNumber - 1)}
          />
        )}
        {pageNumber === 4 && (
          <Summary
            pageNumber={pageNumber}
            onPrev={() => this.changePage(pageNumber - 1)}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    createMandate,
    loadContracts,
    updateMandate,
    createProperty,
    updateProperty
  } = state;

  return {
    mandate: createMandate,
    mandateLoaded: loadContracts,
    updateMandate,
    createProperty,
    updateProperty
  };
}

export default connect(mapStateToProps)(ContractForm);
