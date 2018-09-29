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

class PropertyForm extends Component {
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
    const { property } = this.props;

    if (property && property.property) {
      this.props.initialize(
        this.transformKey(property.property.data.attributes)
      );
    }
  }

  render() {
    const {
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      reset
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Informations</h2>
          </div>
          <div>
            <label>
              <Field
                name="propertyNature"
                component="input"
                type="radio"
                value="Appartement"
              />{' '}
              Appartement
            </label>
            <label>
              <Field
                name="propertyNature"
                component="input"
                type="radio"
                value="Maison"
              />{' '}
              Maison
            </label>
            <label>
              <Field
                name="propertyNature"
                component="input"
                type="radio"
                value="Autre"
              />{' '}
              Autre
            </label>
          </div>
          <div>
            <label>
              <Field name="coOwnership" component="input" type="checkbox" />{' '}
              Bien en copropriété
            </label>
          </div>
          <div>
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
              type="textarea"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div>
            <h2>Adresse</h2>
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name="address"
              component={renderField}
              placeholder="N, type et libellé de la voie"
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
        </form>
      </div>
    );
  }
}

PropertyForm = reduxForm({
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(PropertyForm);

function mapStateToProps(state, initialProps) {
  const { createProperty, updateProperty } = state;

  let property = createProperty;

  if (updateProperty && updateProperty.propertyUpdate === true) {
    property = updateProperty;
  }

  return {
    property: property
  };
}

export default connect(mapStateToProps)(PropertyForm);
