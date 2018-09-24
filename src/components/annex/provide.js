import React, { Component } from 'react';

class Provide extends Component {
  render() {
    const { parameters, onChange, onSubmit, handleCheckProvide } = this.props;
    let isCheck = false;

    if (
      parameters.documentsRequired.surfaceCarrez ||
      parameters.documentsRequired.dossierTechnique ||
      parameters.documentsRequired.carnetEntretien ||
      parameters.documentsRequired.organisationImmeuble
    ) {
      isCheck = true;
    } else {
      isCheck = false;
    }

    return (
      <div>
        <form id="contactForm" onSubmit={e => onSubmit(e)}>
          <div className={'contractForm-inputLine'}>
            <label htmlFor="negociatorOnContract">Piéce a fournir</label>
            <div>
              Surface Carrez
              <input
                onChange={e => handleCheckProvide(e)}
                value={parameters.documentsRequired.surfaceCarrez}
                name="surfaceCarrez"
                type="checkbox"
              />
            </div>
            <div>
              Dossier Technique
              <input
                onChange={e => handleCheckProvide(e)}
                value={parameters.documentsRequired.dossierTechnique}
                name="dossierTechnique"
                type="checkbox"
              />
            </div>
            <div>
              Carnet Entretien
              <input
                onChange={e => handleCheckProvide(e)}
                value={parameters.documentsRequired.carnetEntretien}
                name="carnetEntretien"
                type="checkbox"
              />
            </div>
            <div>
              Organisation de l Immeuble
              <input
                onChange={e => handleCheckProvide(e)}
                value={parameters.documentsRequired.organisationImmeuble}
                name="organisationImmeuble"
                type="checkbox"
              />
            </div>
            <div>
              Autre
              <input
                onChange={e => handleCheckProvide(e)}
                value={parameters.documentsRequired.custom}
                name="custom"
                type="checkbox"
              />
            </div>
          </div>
          {isCheck && (
            <div>
              <div className={'contractForm-inputLine'}>
                <label htmlFor="documentsRequiredPerson">
                  Personne chargée pièces manquantes
                </label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.documentsRequiredPerson}
                  name="documentsRequiredPerson"
                  type="text"
                />
              </div>

              <div className={'contractForm-inputLine'}>
                <label htmlFor="partsFilingDeadline">
                  Délai de présentation des pièces
                </label>
                <input
                  onChange={e => onChange(e)}
                  value={parameters.partsFilingDeadline}
                  name="partsFilingDeadline"
                  type="number"
                />
              </div>
            </div>
          )}
          <div className={'contractForm-inputLine'}>
            <label htmlFor="partsFilingDeadline">Durée clause pénale</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.partsFilingDeadline}
              name="partsFilingDeadline"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="specialClause">Clauses particulières</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.specialClause}
              name="specialClause"
              type="text"
            />
          </div>
          <div>
            <button name="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Provide;
