import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import {
  AtylaInputTheme,
  AtylaInput
} from '../../../styles/inputs/atyla-inputs';
import { MuiThemeProvider } from '@material-ui/core/styles';

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

      if (_.isEmpty(attributes.signatureDate)) {
        attributes.signatureDate = moment().format('YYYY-MM-DD');
      } else {
        attributes.signatureDate = moment(
          attributes.signatureDate,
          'DD-MM-YYYY'
        ).format('YYYY-MM-DD');
      }

      this.props.initialize(attributes);
    }
  }

  render() {
    const { handleSubmit } = this.props;

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
              type="date"
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

function mapStateToProps(state, initialProps) {
  const { updateMandate } = state;
  return {
    mandate: updateMandate
  };
}

export default connect(mapStateToProps)(SummaryForm);
