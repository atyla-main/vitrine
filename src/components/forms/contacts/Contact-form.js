import React, { Component } from 'react';

class ContactForm extends Component {
  render() {
    const { parameters, onChange, onSubmit, currentStatus } = this.props;
    return (
      <div>
        <form id="contactForm" onSubmit={e => onSubmit(e)}>
          <div className={'contractForm-inputLine'}>
            <label htmlFor="wording">Libellé</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.wording}
              name="wording"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="address">Adresse</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.address}
              name="address"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="postCode">Code postale</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.postCode}
              name="postCode"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="city">Ville</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.city}
              name="city"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="coutry">Pays</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.coutry}
              name="coutry"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="phone">Telephone</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.phone}
              name="phone"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="fax">FAX</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.fax}
              name="fax"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="email">Email</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.email}
              name="email"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="status">Profil</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.status}
              name="status"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="civility">Civilité</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.civility}
              name="civility"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="lastName">Nom de famille</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.lastName}
              name="lastName"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="firstName">Prénom</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.firstName}
              name="firstName"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="otherFirstName">Autre prénom</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.otherFirstName}
              name="otherFirstName"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="conjugalStatus">Statut marital</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.conjugalStatus}
              name="conjugalStatus"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="maritalState">Complément de régime</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.maritalState}
              name="maritalState"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="birthName">Nom de naissance</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.birthName}
              name="birthName"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="partner">Conjoint</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.partner}
              name="partner"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="weddingPacsSate">Date mariage/PACS</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.weddingPacsSate}
              name="weddingPacsSate"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="weddingPacsPlace">Lieu de mariage/PACS</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.weddingPacsPlace}
              name="weddingPacsPlace"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="birthDate">Date de naissance</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.birthDate}
              name="birthDate"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="birthPlace">Lieu naissance</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.birthPlace}
              name="birthPlace"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="nationality">Nationalité</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.nationality}
              name="nationality"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="job">Emploi</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.job}
              name="job"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="notes">Note</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.notes}
              name="notes"
              type="text"
            />
          </div>

          {currentStatus == 'notaire' && (
            <div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="companyName">Dénomination sociale</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.companyName}
                  name="companyName"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="officeName">Enseigne / Nom commercial</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.officeName}
                  name="officeName"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="legalStatus">Statut juridique</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.legalStatus}
                  name="legalStatus"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="otherStatus">Statut - Autre</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.otherStatus}
                  name="otherStatus"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="siren">SIREN</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.siren}
                  name="siren"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="siret">SIRET</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.siret}
                  name="siret"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="rcs">RCS</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.rcs}
                  name="rcs"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="rcsCity">RCS - ville de délivrance</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.rcsCity}
                  name="rcsCity"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="rm">RM</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.rm}
                  name="rm"
                  type="text"
                />
              </div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="codeNafApe">Code NAF/APE</label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.codeNafApe}
                  name="codeNafApe"
                  type="text"
                />
              </div>
            </div>
          )}
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
