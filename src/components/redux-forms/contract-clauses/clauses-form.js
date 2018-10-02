import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  change
} from 'redux-form';
import _ from 'lodash';
import {
  AtylaInputTheme,
  AtylaInput
} from '../../../styles/inputs/atyla-inputs';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Arrow from '../../../img/atyla-design-v1/arrow_left.png';
import ClauseList from '../../clauses/clause-list';

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

const renderAtylaRadioInCharge = field => {
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

const renderAtylaCheckBox = field => (
  <div
    className={'mandantForm-radio'}
    onClick={param => {
      field.input.onChange(!field.actualValue);
    }}
  >
    <div
      className={
        'mandantForm-radioButton ' +
        (field.actualValue === field.valueCheck ? 'mod-active' : '')
      }
    >

    </div>
    {field.label}
  </div>
);

const renderAtylaRdioButton = field => (
  <div
    className={
      'clausesForm-radioButton ' +
      (field.actualValue === field.valueCheck ? 'mod-active' : '')
    }
    onClick={param => {
      field.input.onChange(!field.actualValue);
    }}
  >
    {field.label}
  </div>
);

const renderAtylaOtherRadio = field => (
  <input
    defaultValue={field.actualValue === true ? '' : field.actualValue}
    placeholder={field.label}
    className={
      'clausesForm-radioOther ' + (!field.actualValue ? '' : 'mod-active')
    }
    onChange={e => {
      field.input.onChange(e.target.value);
    }}
  />
);

class ClausesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      label: '',
      specialClauses: new Array()
    };

    this.transformKey = this.transformKey.bind(this);
    this.handleClauseChange = this.handleClauseChange.bind(this);
    this.handleClauseSubmit = this.handleClauseSubmit.bind(this);
    this.handleClauseRemove = this.handleClauseRemove.bind(this);
    this.transformKey = this.transformKey.bind(this);
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  handleClauseRemove(event, index) {
    let clauses = this.state.specialClauses;

    clauses.splice(index, 1);
    this.setState({ specialClauses: clauses });
  }

  handleClauseChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleClauseSubmit(event) {
    event.preventDefault();
    const { dispatch, change } = this.props;
    let clauses = this.state.specialClauses;

    clauses.push({ label: this.state.label, content: this.state.content });
    this.setState({ specialClauses: clauses, label: '', content: '' });
    dispatch(change('specialClause', clauses));
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

      if (!attributes.clause) {
        attributes.clause = [{ label: '', content: '' }];
      }

      if (!attributes.specialClause) {
        attributes.specialClause = [{ label: '', content: '' }];
      }

      if (!attributes.delegationOfPower) {
        attributes.delegationOfPower = { totale: true, autre: '' };
      }

      if (!attributes.documentsRequired) {
        attributes.documentsRequired = {
          surfaceCarrez: true,
          organisationImmeuble: true,
          dossierTechnique: true,
          carnetEntretien: true
        };
      }

      if (!attributes.documentsRequiredPerson) {
        attributes.documentsRequiredPerson = 'client';
      }

      this.props.initialize(attributes);
      this.setState({ specialClauses: attributes.specialClause || [] });
    }
  }

  componentDidUpdate() {
    const {
      dispatch,
      change,
      proposer,
      visiter,
      publicite,
      totalPower
    } = this.props;

    if (totalPower === true) {
      dispatch(change('delegationOfPower.proposer', true));
      dispatch(change('delegationOfPower.visiter', true));
      dispatch(change('delegationOfPower.publicite', true));
    }
  }

  render() {
    const {
      dispatch,
      change,
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      reset,
      form,
      autrePower,
      autreDocument,
      totalPower,
      proposer,
      visiter,
      publicite,
      documentsRequiredPersonValue
    } = this.props;

    return (
      <div>
        <div className={'clausesForm-container'}>
          <form onSubmit={handleSubmit}>
            <div className={'clausesForm-title'}>Délégation de pouvoir</div>
            <div className={'clausesForm-total'}>
              <Field
                name="delegationOfPower.totale"
                component={renderAtylaCheckBox}
                valueCheck={true}
                label={'Totale'}
                actualValue={totalPower}
              />
            </div>
            <div className={'clausesForm-radioButtons'}>
              <Field
                name="delegationOfPower.proposer"
                component={renderAtylaRdioButton}
                valueCheck={true}
                label={'Proposer'}
                actualValue={proposer}
              />
              <Field
                name="delegationOfPower.visiter"
                component={renderAtylaRdioButton}
                valueCheck={true}
                label={'Visiter'}
                actualValue={visiter}
              />
              <Field
                name="delegationOfPower.publicite"
                component={renderAtylaRdioButton}
                valueCheck={true}
                label={'Publicité'}
                actualValue={publicite}
              />
              <div>
                {autrePower ? (
                  <Field
                    name="delegationOfPower.autre"
                    component={renderAtylaOtherRadio}
                    valueCheck={''}
                    label={'Autre'}
                    actualValue={autrePower}
                  />
                ) : (
                  <Field
                    name="delegationOfPower.autre"
                    component={renderAtylaRdioButton}
                    valueCheck={true}
                    label={'Autre'}
                    actualValue={autrePower}
                  />
                )}
              </div>
            </div>
            <div className={'contractForm-inputField clausesForm-textArea'}>
              <Field
                name={'mandateAdvertising'}
                component={renderField}
                placeholder={'Description mandat de publicité'}
                type="textarea"
                multiline={true}
                rows="3"
                rowsMax="3"
                margin="normal"
                inputClassName={'contractForm-inputLine'}
              />
            </div>
            <div className={'clausesForm-title'}>Pieces à fournir</div>
            <div className={'clausesForm-checkBoxes'}>
              <div className={'clausesForm-checkBox'}>
                <label>
                  <Field
                    name="documentsRequired.surfaceCarrez"
                    component="input"
                    type="checkbox"
                  />{' '}
                    Surface carrez
                </label>
              </div>
              <label>
                <Field
                  name="documentsRequired.organisationImmeuble"
                  component="input"
                  type="checkbox"
                />{' '}
                  Organisation immeuble
              </label>
            </div>
            <div className={'clausesForm-checkBoxes'}>
              <div className={'clausesForm-checkBox'}>
                <label>
                  <Field
                    name="documentsRequired.dossierTechnique"
                    component="input"
                    type="checkbox"
                  />{' '}
                    Dossier technique
                </label>
              </div>
              <label>
                <Field
                  name="documentsRequired.carnetEntretien"
                  component="input"
                  type="checkbox"
                />{' '}
                  Carnet d'entretien
              </label>
            </div>
            <div className={'clausesForm-otherCheckBoxInput'}>
              <div className={'clausesForm-otherCheckBox'}>
                <Field
                  name="documentsRequired.autre"
                  component="input"
                  type="checkbox"
                />
              </div>
              <div>
                <Field
                  placeholder="Autre..."
                  name="documentsRequired.autreContent"
                  component="input"
                  disabled={autreDocument ? false : true}
                  component={renderField}
                  inputClassName={'clausesForm-otherInput'}
                />
              </div>
            </div>
            <div
              className={'finConditionsForm-radioInputs clausesForm-checkBoxes'}
            >
              <span className={'finConditionsForm-radioLabel'}>
                A la charge de:
              </span>
              <Field
                name="documentsRequiredPerson"
                component={renderAtylaRadioInCharge}
                valueCheck={'client'}
                label={'Client'}
                modRadio={true}
                actualValue={documentsRequiredPersonValue}
              />
              <Field
                name="documentsRequiredPerson"
                component={renderAtylaRadioInCharge}
                valueCheck={'agence'}
                label={'Agence'}
                actualValue={documentsRequiredPersonValue}
              />
            </div>
          </form>
        </div>
        <div>
          <FieldArray name="specialClause" component={ClauseList} />
        </div>
      </div>
    );
  }
}

ClausesForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: { specialClause: [{ label: '', content: '' }] }
})(ClausesForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  const { updateMandate, createMandate } = state;

  let mandate = createMandate;
  if (updateMandate && updateMandate.mandateUpdate === true) {
    mandate = updateMandate;
  }

  return {
    mandate: mandate,
    autrePower: selector(initialProps.form, state, 'delegationOfPower.autre'),
    autreDocument: selector(
      initialProps.form,
      state,
      'documentsRequired.autre'
    ),
    totalPower: selector(initialProps.form, state, 'delegationOfPower.totale'),
    proposer: selector(initialProps.form, state, 'delegationOfPower.proposer'),
    visiter: selector(initialProps.form, state, 'delegationOfPower.visiter'),
    publicite: selector(
      initialProps.form,
      state,
      'delegationOfPower.publicite'
    ),
    documentsRequiredPersonValue: selector(
      initialProps.form,
      state,
      'documentsRequiredPerson'
    )
  };
}

export default connect(mapStateToProps)(ClausesForm);
