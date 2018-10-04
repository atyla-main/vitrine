import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import _ from 'lodash';
import {
  AtylaInputTheme,
  AtylaInput
} from '../../../styles/inputs/atyla-inputs';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LocationSearchInput from '../../google-components/location-search-input';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  multiline,
  rows,
  rowsMax,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        <AtylaInput
          {...input}
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

const renderAtylaButtonBox = field => (
  <div
    className={
      'propertyFrom-radio ' +
      (field.actualValue === field.valueCheck ? 'mod-active' : '')
    }
    onClick={param => {
      field.input.onChange(field.valueCheck);
      field.onOther(false);
    }}
  >
    {field.label}
  </div>
);

const renderAtylaOtherButtonBox = field => {
  if (
    field.actualValue !== 'Appartement' &&
    field.actualValue !== 'Maison' &&
    field.actualValue !== 'Autre'
  ) {
    if (field.actualValue) {
      return (
        <input
          placeholder={'Autre...'}
          onChange={e => {
            field.input.onChange(e.target.value);
          }}
          value={field.actualValue}
          className={'propertyFrom-otherInput'}
        />
      );
    }
  }

  return (
    <div>
      {field.other ? (
        <input
          placeholder={'Autre...'}
          onChange={e => {
            field.input.onChange(e.target.value);
          }}
          className={'propertyFrom-otherInput'}
        />
      ) : (
        <div
          className={
            'propertyFrom-radio ' +
            (field.actualValue === field.valueCheck ? 'mod-active' : '')
          }
          onClick={() => {
            field.input.onChange(field.valueCheck);
            field.onOther(!field.other);
          }}
        >
          <div className={'propertyFrom-otherLabel'}>{field.label}...</div>
        </div>
      )}
    </div>
  );
};

class PropertyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otherInput: false
    };

    this.transformKey = this.transformKey.bind(this);
    this.handleOtherInput = this.handleOtherInput.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
  }

  onAddressChange(addressObject) {
    const { dispatch, change } = this.props;

    dispatch(change('address', addressObject[0].formatted_address));
    dispatch(change('city', addressObject[0].address_components[2].long_name));
    dispatch(
      change('postCode', addressObject[0].address_components[6].long_name)
    );
  }

  transformKey(hash) {
    let newHash = {};

    for (let key in hash) {
      newHash[_.camelCase(key)] = hash[key];
    }

    return newHash;
  }

  componentDidMount() {
    const { property } = this.props;

    if (property && property.property) {
      let attributes = this.transformKey(property.property.data.attributes);
      if (
        attributes.propertyNature !== 'Appartement' &&
        attributes.propertyNature !== 'Maison' &&
        attributes.propertyNature !== 'Maison'
      ) {
        this.handleOtherInput(true);
      }
      this.props.initialize(attributes);
    } else {
      this.props.initialize({ propertyNature: 'Appartement' });
    }
  }

  handleOtherInput(value) {
    this.setState({ otherInput: value });
  }

  render() {
    const { handleSubmit, propertyNatureValue } = this.props;

    return (
      <div className={'propertyForm-container'}>
        <form onSubmit={handleSubmit}>
          <div className={'propertyFrom-title'}>Informations</div>
          <div className={'propertyFrom-radios'}>
            <Field
              name="propertyNature"
              component={renderAtylaButtonBox}
              valueCheck={'Appartement'}
              label={'Appartement'}
              actualValue={propertyNatureValue}
              onOther={this.handleOtherInput}
            />
            <Field
              name="propertyNature"
              component={renderAtylaButtonBox}
              valueCheck={'Maison'}
              label={'Maison'}
              actualValue={propertyNatureValue}
              onOther={this.handleOtherInput}
            />
            <Field
              name="propertyNature"
              component={renderAtylaOtherButtonBox}
              valueCheck={'Autre'}
              label={'Autre'}
              actualValue={propertyNatureValue}
              other={this.state.otherInput}
              onOther={this.handleOtherInput}
            />
          </div>
          <div className={'propertyFrom-checkBox'}>
            <label>
              <Field name="coOwnership" component="input" type="checkbox" />{' '}
                Bien en copropriété
            </label>
          </div>
          <div className={'propertyFrom-checkBox mod-last'}>
            <label>
              <Field name="rentalState" component="input" type="checkbox" />{' '}
                Bien loué
            </label>
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name="description"
              component={renderField}
              placeholder="Désignation"
              type="text"
              multiline={true}
              rows="6"
              rowsMax="10"
              margin="normal"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'propertyFrom-title'}>Adresse</div>
          <div className={'contractForm-inputField'}>
            <LocationSearchInput
              name={'address'}
              placeholder={'N°, type et libellé de la voie'}
              onUpdate={this.onAddressChange}
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
        </form>
      </div>
    );
  }
}

PropertyForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(PropertyForm);

const selector = (form, ...other) => formValueSelector(form)(...other);

function mapStateToProps(state, initialProps) {
  const { createProperty, updateProperty } = state;

  let property = createProperty;

  if (updateProperty && updateProperty.propertyUpdate === true) {
    property = updateProperty;
  }

  return {
    property: property,
    propertyNatureValue: selector(initialProps.form, state, 'propertyNature')
  };
}

export default connect(mapStateToProps)(PropertyForm);
