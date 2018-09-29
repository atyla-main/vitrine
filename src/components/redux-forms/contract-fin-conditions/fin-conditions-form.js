import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        className={inputClassName}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class FinConditionsForm extends Component {
  constructor(props) {
    super(props);

    this.transformKey = this.transformKey.bind(this);
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  componentDidMount() {
    const { mandate } = this.props;

    if (mandate.mandate) {
      this.props.initialize(this.transformKey(mandate.mandate.data.attributes));
    }
  }

  render() {
    const {
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      reset,
      remunerationTypeValue
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Vente</h2>
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name="saleAmount.amount"
              component={renderField}
              placeholder="Prix de vente"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div>
            <span>Séquestre</span>
            <label>
              <Field
                name="escrowAccount"
                component="input"
                type="radio"
                value="Notaire"
              />{' '}
              Notaire
            </label>
            <label>
              <Field
                name="escrowAccount"
                component="input"
                type="radio"
                value="Autre"
              />{' '}
              Autre
            </label>
          </div>
          <div>
            <h2>Rémunération mandataire</h2>
          </div>
          <div>
            <div className={'contractForm-inputField'}>
              <Field
                name={
                  remunerationTypeValue === 'pourcentage'
                    ? 'percentage'
                    : 'lumpSum.amount'
                }
                component={renderField}
                placeholder={
                  remunerationTypeValue === 'pourcentage'
                    ? 'Pourcentage'
                    : 'Montant rémunération'
                }
                type="text"
                inputClassName={'contractForm-inputLine'}
              />
            </div>
            <div className={'contractForm-inputField'}>
              <Field
                component="select"
                name="remunerationType"
                className={'contractForm-inputLine'}
              >
                <option value="forfaitaire">€</option>
                <option value="pourcentage">%</option>
              </Field>
            </div>
          </div>
          <div>
            <span>A la charge de</span>
            <label>
              <Field
                name="inChargeOfRemuneration"
                component="input"
                type="radio"
                value="Notaire"
              />{' '}
              Acquéreur
            </label>
            <label>
              <Field
                name="inChargeOfRemuneration"
                component="input"
                type="radio"
                value="Autre"
              />{' '}
              Vendeur
            </label>
          </div>
        </form>
      </div>
    );
  }
}

FinConditionsForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(FinConditionsForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  const { updateMandate, createMandate } = state;

  let mandate = createMandate;
  if (updateMandate && updateMandate.mandateUpdate === true) {
    mandate = updateMandate;
  }
  return {
    remunerationTypeValue: selector(
      initialProps.form,
      state,
      'remunerationType'
    ),
    mandate: mandate
  };
}

export default connect(mapStateToProps)(FinConditionsForm);
