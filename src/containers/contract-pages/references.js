import React, { Component } from 'react';
import { connect } from 'react-redux';
import MandateReferences from '../../components/references/mandate-references';
import Prices from '../../components/references/prices';

class References extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { mandate, parameters, onChange, onSubmit } = this.props;

    return (
      <div>
        <p>Page 2</p>
        <MandateReferences
          onChange={onChange}
          onSubmit={onSubmit}
          parameters={parameters}
        />
        <Prices
          onChange={onChange}
          onSubmit={onSubmit}
          parameters={parameters}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { createMandate } = state;

  return {
    mandate: createMandate
  };
}

export default connect(mapStateToProps)(References);
