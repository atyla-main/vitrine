import React, { Component } from 'react';

class Delegation extends Component {
  render() {
    const { parameters, onChange, onSubmit, handleCheckAnnex } = this.props;
    return (
      <div>
        <form id="contactForm" onSubmit={e => onSubmit(e)}>
          <div className={'contractForm-inputLine'}>
            <label htmlFor="saleAmount">Prix de vente</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.saleAmount}
              name="saleAmount"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="negociatorOnContract">
              Négociateur présent sur le contract
            </label>
            <div>
              Totale
              <input
                onChange={e => handleCheckAnnex(e)}
                value={parameters.delegationOfPower.totale}
                name="totale"
                type="checkbox"
              />
            </div>
            <div>
              Proposer
              <input
                onChange={e => handleCheckAnnex(e)}
                value={parameters.delegationOfPower.proposer}
                name="proposer"
                type="checkbox"
              />
            </div>
            <div>
              Visiter
              <input
                onChange={e => handleCheckAnnex(e)}
                value={parameters.delegationOfPower.visiter}
                name="visiter"
                type="checkbox"
              />
            </div>
            <div>
              Publicité
              <input
                onChange={e => handleCheckAnnex(e)}
                value={parameters.delegationOfPower.publicite}
                name="publicite"
                type="checkbox"
              />
            </div>
            <div>
              Autre
              <input
                onChange={e => handleCheckAnnex(e)}
                value={parameters.delegationOfPower.custom}
                name="custom"
                type="checkbox"
              />
            </div>
          </div>
          {(parameters.delegationOfPower.publicite ||
            parameters.delegationOfPower.totale) && (
            <div className={'contractForm-inputLine'}>
              <label htmlFor="mandateAdvertising">Mandat publicité</label>
              <input
                onChange={e => onChange(e)}
                value={parameters.mandateAdvertising}
                name="mandateAdvertising"
                type="textarea"
              />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Delegation;
