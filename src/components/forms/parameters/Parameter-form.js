import React, { Component } from 'react';

class Parameters extends Component {
  render() {
    const {
      parameters,
      onChange,
      onSubmit,
      notaries,
      offices,
      negociators
    } = this.props;
    return (
      <div>
        <form id="parameterForm" onSubmit={e => onSubmit(e)}>
          <div className={'contractForm-inputLine'}>
            <label htmlFor="logoPlace">Logo</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.logoPlace}
              name="logoPlace"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="subtitleColorBackground">
              Couleur de fond des sous titres
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.subtitleColorBackground}
              name="subtitleColorBackground"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="subtitleColorText">Couleur des sous titres</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.subtitleColorText}
              name="subtitleColorText"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="notaireId">Notaire par default</label>
            <select
              onChange={e => onChange(e)}
              value={parameters.notaireId}
              name="notaireId"
              form="parameterForm"
            >
              <option />
              {notaries.map(notaire => {
                return (
                  <option key={notaire.id} value={notaire.id}>
                    {notaire.attributes.wording}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="officeId">Agence par default</label>
            <select
              onChange={e => onChange(e)}
              value={parameters.officeId}
              name="officeId"
              form="parameterForm"
            >
              <option />
              {offices.map(office => {
                return (
                  <option key={office.id} value={office.id}>
                    {office.attributes.wording}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="negociatorId">Agence par default</label>
            <select
              onChange={e => onChange(e)}
              value={parameters.negociatorId}
              name="negociatorId"
              form="parameterForm"
            >
              <option />
              {negociators.map(negociator => {
                return (
                  <option key={negociator.id} value={negociator.id}>
                    {negociator.attributes.wording}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="textColor">Couleur du texte</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.textColor}
              name="textColor"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultPayType">
              Type de rémunération par défaut
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultPayType}
              name="defaultPayType"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="remunerationAmount">Montant rémunération</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.remunerationAmount}
              name="remunerationAmount"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultPercentage">Pourcentage par défaut</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultPercentage}
              name="defaultPercentage"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="inChargeOfRemuneration">
              Rémunération à la charge par défaut
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.inChargeOfRemuneration}
              name="inChargeOfRemuneration"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultEscrowAccount">Séquestre par défaut</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultEscrowAccount}
              name="defaultEscrowAccount"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultDelegation">
              Délégation pouvoir par défaut
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultDelegation}
              name="defaultDelegation"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultPenaltyClauseDuration">
              Durée clause pénale par défaut
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultPenaltyClauseDuration}
              name="defaultPenaltyClauseDuration"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="defaultSpecialClause">
              Clauses particulières par défaut
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.defaultSpecialClause}
              name="defaultSpecialClause"
              type="text"
            />
          </div>

          <div>
            <button id="parameterSubmit" name="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Parameters;
