import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import {
  AtylaInputTheme,
  AtylaInput,
  AtylaInputLabel
} from '../../../styles/inputs/atyla-inputs';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  multiline,
  rows,
  rowsMax,
  disabled,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        <AtylaInput
          {...input}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          rowsMax={rowsMax}
          placeholder={placeholder}
          type={type}
          className={inputClassName}
        />
      </MuiThemeProvider>
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
      <div className={'summary-inputContainer'}>
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
          <div className={'contractForm-inputField mod-label'}>
            <span>Signé le </span>
            <Field
              name="signatureDate"
              component={renderField}
              placeholder="dd/mm/yyyy"
              type="text"
              inputClassName={'contractForm-inputLine summary-inputLabel'}
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
