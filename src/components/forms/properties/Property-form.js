import React, { Component } from 'react';

class Property extends Component {
  render() {
    const { parameters, onChange, onSubmit } = this.props;
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
            <label htmlFor="propertyNature">Nature du bien</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.propertyNature}
              name="propertyNature"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="coOwnership">Bien en copropriété</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.coOwnership}
              name="coOwnership"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="description">Désignation</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.description}
              name="description"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="rentalState">Etat locatif</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.rentalState}
              name="rentalState"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="address">Adresse</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.address}
              name="address"
              type="number"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="postCode">Code postale</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.postCode}
              name="postCode"
              type="number"
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

          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Property;
