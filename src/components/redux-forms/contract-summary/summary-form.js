import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';

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

class SummaryForm extends Component {
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
      let attributes = this.transformKey(mandate.mandate.data.attributes);

      if (attributes.signatureDate === null) {
        attributes.signatureDate = moment().format('MM/DD/YYYY');
      }
      this.props.initialize(attributes);
    }
  }

  render() {
    const {
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      reset
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className={'contractForm-inputField'}>
            <Field
              name="mandateNumber"
              component={renderField}
              placeholder="Numéro registre des mandats"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField'}>
            <span>Signé le</span>
            <Field
              name="signatureDate"
              component={renderField}
              placeholder="dd/mm/yyyy"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
        </form>
      </div>
    );
  }
}

SummaryForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SummaryForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  const { updateMandate } = state;
  return {
    mandate: updateMandate
  };
}

export default connect(mapStateToProps)(SummaryForm);
