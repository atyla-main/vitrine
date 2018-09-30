import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import ClausesForm from '../../redux-forms/contract-clauses/clauses-form';

class Clause extends Component {
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
        <ClausesForm form={'testForm'} onSubmit={this.handleSubmit} />
        <button onClick={this.props.onPrev}>Prev</button>
        <button onClick={this.props.onNext}>Next</button>
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

export default connect(mapStateToProps)(Clause);
