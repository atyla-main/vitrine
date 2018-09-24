import React, { Component } from 'react';

class Office extends Component {
  render() {
    const { parameters, onChange, onSubmit, offices } = this.props;
    return (
      <div>
        <form id="parameterForm" onSubmit={e => onSubmit(e)}>
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
            <label htmlFor="logo">Logo</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.logo}
              name="logo"
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
            <label htmlFor="country">Pays</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.country}
              name="country"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="contactInformation">Corrdonnées</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.contactInformation}
              name="contactInformation"
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
            <label htmlFor="socialCapital">Capital social</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.socialCapital}
              name="socialCapital"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="intercommunityTva">TVA intracommunautaire</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.intercommunityTva}
              name="intercommunityTva"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="headOffice">Siège social</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.headOffice}
              name="headOffice"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="headOfficeAddress">Adresse - siège social</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.headOfficeAddress}
              name="headOfficeAddress"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="nafApe">Code NAF/APE</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.nafApe}
              name="nafApe"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="professionalCard">Carte professionnelle</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.professionalCard}
              name="professionalCard"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="placeOfIssue">Lieu de délivrance</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.placeOfIssue}
              name="placeOfIssue"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="transaction">Transaction</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.transaction}
              name="transaction"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="gestion">Gestion</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.gestion}
              name="gestion"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="activity">Activité</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.activity}
              name="activity"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="perceiveFunds">
              L agence percoit-elle des fonds
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.perceiveFunds}
              name="perceiveFunds"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="transactionGuaranteesAmount">
              Montant des garanties Transaction
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.transactionGuaranteesAmount}
              name="transactionGuaranteesAmount"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="gestionGuaranteesAmount">
              Montant des garanties Gestion
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.gestionGuaranteesAmount}
              name="gestionGuaranteesAmount"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="guaranteeFund">Caisse de garantie</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.guaranteeFund}
              name="guaranteeFund"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="officeId">Agence principale</label>
            <select
              onChange={e => onChange(e)}
              value={parameters.officeId}
              name="officeId"
              form="parameterForm"
            >
              {offices.map(office => {
                return (
                  <option key={office.id} value={office.id}>
                    {office.attributes.wording}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Office;
