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

let OfficeForm = props => {
  const { handleSubmit, pristine, submitting, offices } = props;
  return (
    <form onSubmit={handleSubmit}>
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
          name="companyName"
          component={renderField}
          label="Dénomination sociale"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="officeName"
          component={renderField}
          label="Enseigne / Nom commercial"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="logo"
          component={renderField}
          label="Logo"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="address"
          component={renderField}
          label="Address"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="postCode"
          component={renderField}
          label="Code postal"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="city"
          component={renderField}
          label="Ville"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="country"
          component={renderField}
          label="Pays"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="contactInformation"
          component={renderField}
          label="Corrdonnées"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="legalStatus"
          component={renderField}
          label="Statut juridique"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="siren"
          component={renderField}
          label="SIREN"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="siret"
          component={renderField}
          label="SIRET"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="rcs"
          component={renderField}
          label="RCS"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="rcsCity"
          component={renderField}
          label="RCS - ville de délivrance"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="socialCapital.amount"
          component={renderField}
          label="Capital social"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="intercommunityTva"
          component={renderField}
          label="TVA intracommunautaire"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="headOffice"
          component={renderField}
          label="Siège social"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="headOfficeAddress"
          component={renderField}
          label="Adresse - siège social"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="nafApe"
          component={renderField}
          label="Code NAF/APE"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="professionalCard"
          component={renderField}
          label="Carte professionnelle"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="placeOfIssue"
          component={renderField}
          label="Lieu de délivrance"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="transaction"
          component={renderField}
          label="Transaction"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="gestion"
          component={renderField}
          label="Gestion"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="activity"
          component={renderField}
          label="Activité"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="perceiveFunds"
          component={renderField}
          label="L agence percoit-elle des fonds"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="transactionGuaranteesAmount.amount"
          component={renderField}
          label="Montant des garanties Transaction"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="gestionGuaranteesAmount.amount"
          component={renderField}
          label="Montant des garanties Gestion"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputField'}>
        <Field
          name="guaranteeFund"
          component={renderField}
          label="Caisse de garantie"
          inputClassName={'contractForm-inputLine'}
        />
      </div>

      <div className={'contractForm-inputLine'}>
        <label htmlFor="officeId">Agence principale</label>
        <Field component="select" name="officeId">
          {offices.map(office => {
            return (
              <option key={office.id} value={office.id}>
                {office.attributes.wording}
              </option>
            );
          })}
        </Field>
      </div>
      <button type="submit" disabled={pristine || submitting}>
        Submit
      </button>
    </form>
  );
};

export default connect()(
  reduxForm({
    form: 'office',
    initialValues: {
      socialCapital: { currency: 'EUR' },
      transactionGuaranteesAmount: { currency: 'EUR' },
      gestionGuaranteesAmount: { currency: 'EUR' }
    }
  })(OfficeForm)
);
