import React, { Component } from 'react';

class Mandates extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      offices,
      negociators,
      parameters,
      onChange,
      onChangeCheck,
      onSubmit
    } = this.props;

    if (
      offices.officesFetch === true &&
      negociators.negociatorsFetch === true
    ) {
      return (
        <div>
          <form onSubmit={e => onSubmit(e)} id="parameterForm">
            <div className={'contractForm-inputLine'}>
              <label htmlFor="officeId">
                Selectionner l établissement de votre choix
              </label>
              <select
                onChange={e => onChange(e)}
                name="officeId"
                form="parameterForm"
              >
                <option />
                {offices.offices.data.map(office => {
                  return (
                    <option key={office.id} value={office.id}>
                      {office.attributes.wording}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={'contractForm-inputLine'}>
              <label htmlFor="negociatorOnContract">
                Négociateur présent sur le contract
              </label>
              <input
                onChange={e => onChangeCheck(e)}
                value={parameters.negociatorOnContract}
                name="negociatorOnContract"
                type="checkbox"
              />
            </div>
            {parameters.negociatorOnContract === true && (
              <div className={'contractForm-inputLine'}>
                <label htmlFor="negociatorId">
                  Selectionner le négociateur
                </label>
                <select
                  onChange={e => onChange(e)}
                  name="negociatorId"
                  form="parameterForm"
                >
                  <option />
                  {negociators.negociators.data.map(negociator => {
                    return (
                      <option key={negociator.id} value={negociator.id}>
                        {negociator.attributes.wording}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
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

export default Mandates;
