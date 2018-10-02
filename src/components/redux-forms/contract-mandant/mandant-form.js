import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  formValueSelector,
  submit,
  change
} from 'redux-form';
import Collapse from '@material-ui/core/Collapse';
import Arrow from '../../../img/atyla-design-v1/arrow_left.png';
import DeleteBlack from '../../../img/atyla-design-v1/delete_black.png';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import {
  AtylaInputTheme,
  AtylaInput,
  AtylaInputLabel
} from '../../../styles/inputs/atyla-inputs';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  atylaInputLabel,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        {atylaInputLabel ? (
          <AtylaInputLabel
            {...input}
            placeholder={placeholder}
            type={type}
            className={inputClassName}
          />
        ) : (
          <AtylaInput
            {...input}
            placeholder={placeholder}
            type={type}
            className={inputClassName}
          />
        )}
      </MuiThemeProvider>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderAtylaCheckBox = field => (
  <div
    className={'mandantForm-radio'}
    onClick={param => field.input.onChange(field.valueCheck)}
  >
    <div
      className={
        'mandantForm-radioButton ' +
        (field.actualValue === field.valueCheck ? 'mod-active' : '')
      }
    />
    {field.label}
  </div>
);

class MandantForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      maritalState: ''
    };
    this.handleCollapsed = this.handleCollapsed.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let attributes = this.props.initData;

    if (!attributes.civility) {
      attributes.civility = 'Monsieur';
    }

    if (attributes.maritalState) {
      this.setState({ maritalState: attributes.maritalState });
    }

    this.props.initialize(attributes);
  }

  handleChange(event) {
    event.preventDefault();
    const { dispatch, change } = this.props;
    this.setState({ [event.target.name]: event.target.value });
    dispatch(change([event.target.name], event.target.value));
  }

  handleCollapsed(e) {
    e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      maritalStateValue,
      civilityValue,
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      onDelete,
      reset
    } = this.props;

    return (
      <div className={'mandantForm'}>
        <div className={'mandantForm-collapse'} onClick={this.handleCollapsed}>
          Mandant
          <img
            src={Arrow}
            heigh={10}
            width={10}
            alt=""
            className={
              'mandantForm-arrow ' +
              (this.state.collapsed === true ? 'mod-up' : 'mod-down')
            }
          />
          {onDelete && (
            <img
              className={'mandantForm-deleteBlack'}
              src={DeleteBlack}
              alt=""
              height={18}
              width={18}
              onClick={() => onDelete(this.props.initData)}
            />
          )}
        </div>
        <Collapse in={this.state.collapsed}>
          <div className={'mandantForm-formContainer'}>
            <form onSubmit={handleSubmit}>
              <div>
                <div className={'mandantForm-header'}>Identité</div>
              </div>
              <div className={'mandantForm-radioInputs'}>
                <Field
                  name="civility"
                  component={renderAtylaCheckBox}
                  valueCheck={'Monsieur'}
                  label={'M.'}
                  actualValue={civilityValue}
                />
                <Field
                  name="civility"
                  component={renderAtylaCheckBox}
                  valueCheck={'Madame'}
                  label={'Mme.'}
                  actualValue={civilityValue}
                />
                <Field
                  name="civility"
                  component={renderAtylaCheckBox}
                  valueCheck={'Mademoiselle'}
                  label={'Mlle.'}
                  actualValue={civilityValue}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="firstName"
                  component={renderField}
                  placeholder="Prénom1, Prénom2"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="lastName"
                  component={renderField}
                  placeholder="Nom de famille"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField mod-label'}>
                <span>Né le</span>
                <Field
                  atylaInputLabel={true}
                  name="birthDate"
                  component={renderField}
                  placeholder="jj/mm/yyyy"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField mod-label'}>
                <span>A</span>
                <Field
                  atylaInputLabel={true}
                  name="birthPlace"
                  component={renderField}
                  placeholder="Ville de naissance"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <MuiThemeProvider theme={AtylaInputTheme}>
                  <Select
                    value={this.state.maritalState}
                    onChange={this.handleChange}
                    input={
                      <AtylaInput
                        value={this.state.maritalState}
                        name="maritalState"
                      />
                    }
                    name="maritalState"
                    placeholder="Statut marital"
                    style={{ width: '100%' }}
                  >
                    <MenuItem value={'Celibataire'}>Célibataire</MenuItem>
                    <MenuItem value={'Marié'}>Marié</MenuItem>
                    <MenuItem value={'Divorce'}>Divorcé</MenuItem>
                    <MenuItem value={'Veuf'}>Veuf/Veuve</MenuItem>
                    <MenuItem value={'PACS'}>PACS</MenuItem>
                  </Select>
                </MuiThemeProvider>
              </div>
              {(maritalStateValue === 'Marié' ||
                maritalStateValue === 'PACS') && (
                <div>
                  <div className={'contractForm-inputField mod-label'}>
                    <span>Marié le</span>
                    <Field
                      atylaInputLabel={true}
                      name="weddingPacsDate"
                      component={renderField}
                      placeholder="jj/mm/yyyy"
                      type="text"
                      inputClassName={'contractForm-inputLine'}
                    />
                  </div>
                  <div className={'contractForm-inputField mod-label'}>
                    <span>A</span>
                    <Field
                      atylaInputLabel={true}
                      name="weddingPacsPlace"
                      component={renderField}
                      placeholder="Ville de mariage"
                      type="text"
                      inputClassName={'contractForm-inputLine'}
                    />
                  </div>
                </div>
              )}
              <div>
                <div className={'mandantForm-header'}>Adresse</div>
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="address"
                  component={renderField}
                  placeholder="N°, type et libellé de la voie"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="city"
                  component={renderField}
                  placeholder="Ville"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div>
                <div className={'mandantForm-header'}>Coordonnées</div>
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="phone"
                  component={renderField}
                  placeholder="Téléphone"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <Field
                  name="email"
                  component={renderField}
                  placeholder="E-mail"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    );
  }
}

MandantForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onChange: (values, dispatch, props) => {
    dispatch(submit(props.form));
  }
})(MandantForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  return {
    maritalStateValue: selector(initialProps.form, state, 'maritalState'),
    civilityValue: selector(initialProps.form, state, 'civility')
  };
}

export default connect(mapStateToProps)(MandantForm);
