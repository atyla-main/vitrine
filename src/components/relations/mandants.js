import React, { Component } from 'react';

class Mandants extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { mandants, onChange, onSubmit } = this.props;

    if (mandants.mandantsFetch === true) {
      return (
        <div>
          <form onSubmit={e => onSubmit(e)} id="parameterForm">
            <div className={'contractForm-inputLine'}>
              <label htmlFor="mandantId">Selectionner le Mandant</label>
              <select
                onChange={e => onChange(e)}
                name="mandantId"
                form="parameterForm"
              >
                <option />
                {mandants.mandants.data.map(mandant => {
                  return (
                    <option key={mandant.id} value={mandant.id}>
                      {mandant.attributes.wording}
                    </option>
                  );
                })}
              </select>
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

export default Mandants;
