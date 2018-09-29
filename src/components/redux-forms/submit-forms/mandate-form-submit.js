import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

class MandateFormSubmit extends Component {
  render() {
    const { dispatch, formName } = this.props;

    return <button onClick={() => dispatch(submit(formName))}>Submit</button>;
  }
}

export default connect()(MandateFormSubmit);
