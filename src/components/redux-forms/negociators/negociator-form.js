import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className={inputClassName}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

let NegociatorForm = props => {
  const { handleSubmit, pristine, submitting, offices } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className={'contractForm-inputField'}>
        <Field
          name="email"
          component={renderField}
          label="Email"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="wording"
          component={renderField}
          label="Libellé"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="civility"
          component={renderField}
          label="Civilité"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="lastName"
          component={renderField}
          label="Nom"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="firstName"
          component={renderField}
          label="Prénom"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <label htmlFor="officeId">Agence</label>
        <Field
          component="select"
          name="officeId"
          className={'contractForm-inputLine'}
        >
          {offices.map(office => {
            return (
              <option key={office.id} value={office.id}>
                {office.attributes.wording}
              </option>
            );
          })}
        </Field>
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="rsac"
          component={renderField}
          label="Agent commercial"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="rsacPlace"
          component={renderField}
          label="Lieu RSAC"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>
    </form>
  );
};

NegociatorForm = reduxForm({
  form: 'property'
})(NegociatorForm);

export default NegociatorForm;
