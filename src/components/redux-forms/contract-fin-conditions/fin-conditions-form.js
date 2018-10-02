import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import writtenNumber from 'written-number';

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

const renderAtylaCheckBox = field => {
  let mod = field.actualValue === field.valueCheck ? 'mod-active' : '';
  if (field.valueCheck === 'Autre' && field.actualValue != 'Notaire') {
    mod = 'mod-active';
  }
  return (
    <div
      className={'mandantForm-radio ' + (field.modRadio ? 'mod-noInput' : '')}
      onClick={param => field.input.onChange(field.valueCheck)}
    >
      <div className={'mandantForm-radioButton ' + mod}> </div>
      {field.label}
    </div>
  );
};

class FinConditionsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remunerationState: 'forfaitaire'
    };

    this.transformKey = this.transformKey.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { dispatch, change } = this.props;
    this.setState({ remunerationState: event.target.value });
    dispatch(change([event.target.name], event.target.value));
  }

  handleAmountChange(event) {
    event.preventDefault();
    const { dispatch, change } = this.props;

    if (event.target.name != 'percentage') {
      let key = event.target.name.split('.')[0];
      dispatch(change([`${key}.currency`], 'euros'));
      dispatch(
        change(
          [`${key}.valueText`],
          writtenNumber(event.target.value, { lang: 'fr' })
        )
      );
    }
    dispatch(change([event.target.name], event.target.value));
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
    let attributes = mandate.mandate.data.attributes;

    if (mandate.mandate) {
      if (mandate.mandate && !attributes['escrow-account']) {
        attributes['escrow-account'] = 'Notaire';
      } else if (attributes['escrow-account'] != 'Notaire') {
        attributes['escrow-account-other'] = attributes['escrow-account'];
      }

      if (mandate.mandate && !attributes['remuneration-type']) {
        attributes['remuneration-type'] = 'forfaitaire';
      }

      if (mandate.mandate && !attributes['in-charge-of-remuneration']) {
        attributes['in-charge-of-remuneration'] = 'Acquéreur';
      }

      this.setState({ remunerationState: attributes['remuneration-type'] });

      this.props.initialize(this.transformKey(attributes));
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
      remunerationTypeValue,
      escrowAccountValue,
      inChargeOfRemunerationValue
    } = this.props;

    return (
      <div className={'finConditionsForm-container'}>
        <form onSubmit={handleSubmit}>
          <div className={'finConditionsForm-title'}>Vente</div>
          <div
            className={
              'contractForm-inputField finConditionsForm-currencyContainer'
            }
          >
            <span className={'finConditionsForm-currency'}>€</span>
            <Field
              name="saleAmount.amount"
              component={renderField}
              placeholder="Prix de vente"
              type="text"
              onChange={this.handleAmountChange}
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField mod-label'}>
            <div className={'finConditionsForm-checkBox'}>
              <span className={'finConditionsForm-inline'}>Séquestre: </span>
              <div className={'finConditionsForm-inline'}>
                <Field
                  name="escrowAccount"
                  component={renderAtylaCheckBox}
                  valueCheck={'Notaire'}
                  label={'Notaire'}
                  actualValue={escrowAccountValue}
                />
              </div>
              <Field
                name="escrowAccount"
                component={renderAtylaCheckBox}
                valueCheck={'Autre'}
                label={''}
                actualValue={escrowAccountValue}
              />
            </div>
            <Field
              atylaInputLabel={true}
              name={
                escrowAccountValue === 'Notaire' ? '' : 'escrowAccountOther'
              }
              component={renderField}
              placeholder="Autre"
              type="text"
              disabled={escrowAccountValue === 'Notaire' ? true : false}
              inputClassName={
                'contractForm-inputLine finConditionsForm-otherInput'
              }
            />
          </div>
          <div className={'finConditionsForm-title'} style={{ width: '408px' }}>
            Rémunération mandataire
          </div>
          <div className={'finConditionsForm-remInput'}>
            <div className={'contractForm-inputField'}>
              <Field
                name={
                  remunerationTypeValue === 'pourcentage'
                    ? 'percentage'
                    : 'lumpSum.amount'
                }
                component={renderField}
                placeholder={'Montant rémunération'}
                type="text"
                onChange={this.handleAmountChange}
                inputClassName={
                  'contractForm-inputLine finConditionsForm-typeInput'
                }
              />
            </div>
            <div className={'contractForm-inputField'}>
              <MuiThemeProvider theme={AtylaInputTheme}>
                <Select
                  value={this.state.remunerationState}
                  onChange={this.handleChange}
                  input={<AtylaInput name="remunerationType" />}
                  name="remunerationType"
                  style={{ width: '100%' }}
                >
                  <MenuItem value={'forfaitaire'}>€</MenuItem>
                  <MenuItem value={'pourcentage'}>%</MenuItem>
                </Select>
              </MuiThemeProvider>
            </div>
          </div>
          <div className={'finConditionsForm-radioInputs'}>
            <span className={'finConditionsForm-radioLabel'}>
              A la charge de:
            </span>
            <Field
              name="inChargeOfRemuneration"
              component={renderAtylaCheckBox}
              valueCheck={'Acquéreur'}
              label={'Acquéreur'}
              modRadio={true}
              actualValue={inChargeOfRemunerationValue}
            />
            <Field
              name="inChargeOfRemuneration"
              component={renderAtylaCheckBox}
              valueCheck={'Vendeur'}
              label={'Vendeur'}
              actualValue={inChargeOfRemunerationValue}
            />
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
    inChargeOfRemunerationValue: selector(
      initialProps.form,
      state,
      'inChargeOfRemuneration'
    ),
    remunerationTypeValue: selector(
      initialProps.form,
      state,
      'remunerationType'
    ),
    escrowAccountValue: selector(initialProps.form, state, 'escrowAccount'),
    mandate: mandate
  };
}

export default connect(mapStateToProps)(FinConditionsForm);
