import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, submit } from 'redux-form';

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

class MandantForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initialize(this.props.initData);
  }

  render() {
    const {
      maritalStateValue,
      buttonSubmit,
      handleSubmit,
      pristine,
      submitting,
      mandantId,
      onDelete,
      reset
    } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Identité</h2>
          </div>
          <div>
            <label>
              <Field
                name="civility"
                component="input"
                type="radio"
                value="Monsieur"
              />{' '}
              M.
            </label>
            <label>
              <Field
                name="civility"
                component="input"
                type="radio"
                value="Madame"
              />{' '}
              Mme
            </label>
            <label>
              <Field
                name="civility"
                component="input"
                type="radio"
                value="Mademoiselle"
              />{' '}
              Mlle
            </label>
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
          <div className={'contractForm-inputField'}>
            <span>Né le</span>
            <Field
              name="birthDate"
              component={renderField}
              placeholder="jj/mm/yyyy"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField'}>
            <span>A</span>
            <Field
              name="birthPlace"
              component={renderField}
              placeholder="Ville de naissance"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              component="select"
              name="maritalState"
              className={'contractForm-inputLine'}
            >
              <option value="" disabled>
                Statut marital...
              </option>
              <option value="Mariage">Marié</option>
              <option value="PACS">PACS</option>
            </Field>
          </div>
          {maritalStateValue && (
            <div>
              <div className={'contractForm-inputField'}>
                <span>{maritalStateValue} le</span>
                <Field
                  name="weddingPacsDate"
                  component={renderField}
                  placeholder="jj/mm/yyyy"
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
              <div className={'contractForm-inputField'}>
                <span>A</span>
                <Field
                  name="weddingPacsPlace"
                  component={renderField}
                  placeholder={`Ville de ${maritalStateValue}`}
                  type="text"
                  inputClassName={'contractForm-inputLine'}
                />
              </div>
            </div>
          )}
          <div>
            <h2>Adresse</h2>
          </div>
          <div className={'contractForm-inputField'}>
            <span>A</span>
            <Field
              name="address"
              component={renderField}
              placeholder="N, type et libéllé de la voie"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField'}>
            <span>A</span>
            <Field
              name="city"
              component={renderField}
              placeholder="Ville"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div>
            <h2>Coordonnés</h2>
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name="phone"
              component={renderField}
              placeholder="Numéro de téléphone"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
          <div className={'contractForm-inputField'}>
            <Field
              name="email"
              component={renderField}
              placeholder="Adresse e-mail"
              type="text"
              inputClassName={'contractForm-inputLine'}
            />
          </div>
        </form>
        {onDelete && (
          <button onClick={() => onDelete(this.props.initData)}>
            Supprimer
          </button>
        )}
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
    maritalStateValue: selector(initialProps.form, state, 'maritalState')
  };
}

export default connect(mapStateToProps)(MandantForm);
