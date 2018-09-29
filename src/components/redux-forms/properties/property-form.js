import React from 'react';
import { Field, reduxForm } from 'redux-form';

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

let PropertyForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className={'contractForm-inputField'}>
        <Field
          name="wording"
          component={renderField}
          label="Libellé"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="propertyNature"
          component={renderField}
          label="Nature du bien"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="coOwnership"
          component={renderField}
          label="Bien en copropriété"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="description"
          component={renderField}
          label="Désignation"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="rentalState"
          component={renderField}
          label="Etat locatif"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="address"
          component={renderField}
          label="Adresse"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="postCode"
          component={renderField}
          label="Code postal"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="city"
          component={renderField}
          label="Ville"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="country"
          component={renderField}
          label="Pays"
          type="text"
          inputClassName={'contractForm-inputLine'}
        />
      </div>
      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>
    </form>
  );
};

PropertyForm = reduxForm({
  form: 'property'
})(PropertyForm);

export default PropertyForm;
