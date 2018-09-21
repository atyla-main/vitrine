import React, { Component } from 'react';

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { properties, onChange, onSubmit } = this.props;

    if (properties.propertiesFetch == true) {
      return (
        <div>
          <form onSubmit={e => onSubmit(e)} id="parameterForm">
            <div className={'contractForm-inputLine'}>
              <label htmlFor="propertyId">
                Selectionner le bien de votre choix
              </label>
              <select
                onChange={e => onChange(e)}
                name="propertyId"
                form="parameterForm"
              >
                <option />
                {properties.properties.data.map(property => {
                  return (
                    <option key={property.id} value={property.id}>
                      {property.attributes.wording}
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

export default Properties;
