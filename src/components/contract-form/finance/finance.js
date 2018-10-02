import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import FinConditionsForm from '../../redux-forms/contract-fin-conditions/fin-conditions-form';
import NextArrow from '../../../img/atyla-design-v1/next_arrow.png';
import PrevArrow from '../../../img/atyla-design-v1/prev_arrow.png';

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
    let attributes = values;

    if (attributes.escrowAccountOther && attributes.escrowAccount === 'Autre') {
      attributes.escrowAccount = attributes.escrowAccountOther;
    }

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
        <FinConditionsForm form={'testForm'} onSubmit={this.handleSubmit} />
        <div className={'mandant-bottomButton'}>
          <img
            id={'prevArrow2'}
            className={'mandant-nextArrow'}
            src={PrevArrow}
            alt=""
            height={65}
            width={65}
            onClick={this.props.onPrev}
          />
          <img
            id={'nextArrow2'}
            className={'mandant-nextArrow'}
            src={NextArrow}
            alt=""
            height={65}
            width={65}
            onClick={this.props.onNext}
          />
        </div>
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
