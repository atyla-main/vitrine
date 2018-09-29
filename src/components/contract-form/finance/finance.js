import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import FinConditionsForm from '../../redux-forms/contract-fin-conditions/fin-conditions-form';

class Finance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch, mandate } = this.props;

    let body = {
      data: {
        attributes: values
      }
    };

    dispatch(updateMandateActions.update(body, mandate.mandate.data.id));
    this.setState({ firstSubmit: true });
  }

  render() {
    const { mandate, property } = this.props;

    return (
      <div>
        <FinConditionsForm form={'testForm'} onSubmit={this.handleSubmit} />
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

export default connect(mapStateToProps)(Finance);
