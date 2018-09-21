import React, { Component } from 'react';

class MandateReferences extends Component {
  render() {
    const { parameters, onChange, onSubmit } = this.props;
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
            <label htmlFor="mandateNumber">Numéro de mandat</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.mandateNumber}
              name="mandateNumber"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="internalReference">Référence interne</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.internalReference}
              name="internalReference"
              type="text"
            />
          </div>

          <div className={'contractForm-inputLine'}>
            <label htmlFor="signatureDate">Date de signature</label>
            <input
              onChange={e => onChange(e)}
              value={parameters.signatureDate}
              name="signatureDate"
              type="text"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default MandateReferences;
