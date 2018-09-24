import React, { Component } from 'react';

class Negociator extends Component {
  render() {
    const { parameters, onChange, onSubmit, offices } = this.props;

    console.log('OFFICE:', offices);
    return (
      <div>
        <form id="parameterForm" onSubmit={e => onSubmit(e)}>
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
            <label htmlFor="wording">Libellé</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.wording}
              name="wording"
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
            <label htmlFor="lastName">Nom</label>
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
            <label htmlFor="commercialAgent">Agent commercial</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.commercialAgent}
              name="commercialAgent"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="officeId">Agence</label>
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

          <div className={'contractForm-inputLine'}>
            <label htmlFor="rsac">Immatriculation RSAC</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.rsac}
              name="rsac"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="rsacPlace">Lieu RSAC</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.rsacPlace}
              name="rsacPlace"
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

export default Negociator;
