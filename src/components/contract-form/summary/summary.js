import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import SummaryForm from '../../redux-forms/contract-summary/summary-form';
import SummaryCollapse from '../../summary-collapse/summary-collapse';

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSubmit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch, mandate } = this.props;
    let attributes = values;

    let body = {
      data: {
        attributes: attributes
      }
    };

    dispatch(updateMandateActions.update(body, mandate.mandate.data.id));
    this.setState({ firstSubmit: true });
  }

  render() {
    const { mandate, property } = this.props;

    return (
      <div>
        <SummaryForm form={'testForm'} onSubmit={this.handleSubmit} />
        <SummaryCollapse title={'Mandant'}>
          <div>
            <h2>Hello</h2>
            <p>Content contenue superbe</p>
          </div>
        </SummaryCollapse>
        <SummaryCollapse title={'Bien'}>
          <div>
            <h2>Hello</h2>
            <p>Content contenue superbe</p>
          </div>
        </SummaryCollapse>
        <SummaryCollapse title={'Conditions Financieres'}>
          <div>
            <h2>Hello</h2>
            <p>Content contenue superbe</p>
          </div>
        </SummaryCollapse>
        <SummaryCollapse title={'Clauses'}>
          <div>
            <h2>Hello</h2>
            <p>Content contenue superbe</p>
          </div>
        </SummaryCollapse>
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

export default connect(mapStateToProps)(Summary);
