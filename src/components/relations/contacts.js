import React, { Component } from 'react';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { notaries, mediators, onChange, onSubmit } = this.props;

    if (notaries.notariesFetch == true && mediators.mediatorsFetch == true) {
      return (
        <div>
          <form onSubmit={e => onSubmit(e)} id="parameterForm">
            <div className={'contractForm-inputLine'}>
              <label htmlFor="notaryId">Selectionner le Notaire</label>
              <select
                onChange={e => onChange(e)}
                name="notaryId"
                form="parameterForm"
              >
                <option />
                {notaries.notaries.data.map(notary => {
                  return (
                    <option key={notary.id} value={notary.id}>
                      {notary.attributes.wording}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={'contractForm-inputLine'}>
              <label htmlFor="mediatorId">Selectionner le Mandant</label>
              <select
                onChange={e => onChange(e)}
                name="mediatorId"
                form="parameterForm"
              >
                <option />
                {mediators.mediators.data.map(mediator => {
                  return (
                    <option key={mediator.id} value={mediator.id}>
                      {mediator.attributes.wording}
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
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

export default Contacts;
