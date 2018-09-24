import React, { Component } from 'react';
import { connect } from 'react-redux';
import Delegation from '../../components/annex/delegation';
import Provide from '../../components/annex/provide';

class Annex extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      parameters,
      onChange,
      onSubmit,
      handleCheckAnnex,
      handleCheckProvide
    } = this.props;

    return (
      <div>
        <p>Page 3</p>
        <Delegation
          handleCheckAnnex={handleCheckAnnex}
          parameters={parameters}
          onSubmit={onSubmit}
          onChange={onChange}
        />
        <Provide
          parameters={parameters}
          onSubmit={onSubmit}
          onChange={onChange}
          handleCheckProvide={handleCheckProvide}
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

export default connect(mapStateToProps)(Annex);
