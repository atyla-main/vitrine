import React, { Component } from 'react';

class Prices extends Component {
  render() {
    const { parameters, onChange, onSubmit } = this.props;
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
            <label htmlFor="saleAmountText">
              Prix de vente en toute lettres
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.saleAmountText}
              name="saleAmountText"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="propertyId">Type de rémunération</label>
            <select
              onChange={e => onChange(e)}
              name="remunerationType"
              form="parameterForm"
            >
              <option value={'Forfaitaire'}>Forfaitaire</option>
              <option value={'Pourcentage de la vente'}>
                Pourcentage de la vente
              </option>
            </select>
          </div>

          {parameters.remunerationType === 'Forfaitaire' ? (
            <div className={'contractForm-inputLine'}>
              <label htmlFor="lumpSum">Montant forfaitaire</label>
              <input
                onChange={e => onChange(e)}
                value={parameters.lumpSum}
                name="lumpSum"
                type="text"
              />
            </div>
          ) : (
            <div className={'contractForm-inputLine'}>
              <label htmlFor="percentage">Pourcentage</label>
              <input
                onChange={e => onChange(e)}
                value={parameters.percentage}
                name="percentage"
                type="text"
              />
            </div>
          )}

          <div className={'contractForm-inputLine'}>
            <label htmlFor="escrowAccount">Séquestre</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.escrowAccount}
              name="escrowAccount"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="inChargeOfRemuneration">
              Rémunération à la charge
            </label>
            <input
              onChange={e => onChange(e)}
              value={parameters.inChargeOfRemuneration}
              name="inChargeOfRemuneration"
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

export default Prices;
