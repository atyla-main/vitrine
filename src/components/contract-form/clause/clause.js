import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMandateActions } from '../../../actions/update-mandate';
import ClausesForm from '../../redux-forms/contract-clauses/clauses-form';
import NextArrow from '../../../img/atyla-design-v1/next_arrow.png';
import PrevArrow from '../../../img/atyla-design-v1/prev_arrow.png';

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
    return (
      <div>
        <ClausesForm form={'testForm'} onSubmit={this.handleSubmit} />
        <div className={'mandant-bottomButton'}>
          <img
            id={'nextArrow1'}
            className={'mandant-nextArrow'}
            src={PrevArrow}
            alt=""
            height={65}
            width={65}
            onClick={this.props.onPrev}
          />
          <img
            id={'prevArrow1'}
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

export default connect(mapStateToProps)(Clause);
