import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPropertyActions } from '../../../actions/create-property';
import { updatePropertyActions } from '../../../actions/update-property';
import { updateMandateActions } from '../../../actions/update-mandate';
import PropertyForm from '../../redux-forms/contract-property/property-form';
import Auth from '../../../services/Auth';
import NextArrow from '../../../img/atyla-design-v1/next_arrow.png';
import PrevArrow from '../../../img/atyla-design-v1/prev_arrow.png';

class Mandant extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch, mandate, property } = this.props;
    let attributes = values;
    // attributes.rentalState = values.rentalState ? 'Occupé' : 'Libre';

    let body = {
      data: {
        attributes: attributes,
        relationships: {
          user: { data: { id: Auth.getId(), type: 'users' } }
        }
      }
    };

    if (property.property) {
      dispatch(updatePropertyActions.update(body, property.property.data.id));
    } else {
      dispatch(createPropertyActions.create(body));
    }
  }

  componentDidUpdate(prevProps) {
    const { mandate, property, dispatch } = this.props;

    if (!prevProps.property.property && property.property) {
      dispatch(
        updateMandateActions.update(
          {
            data: {
              attributes: {},
              relationships: {
                property: {
                  data: { id: property.property.data.id, type: 'properties' }
                }
              }
            }
          },
          mandate.mandate.data.id
        )
      );
    }
  }

  render() {
    const { mandate, property } = this.props;

    return (
      <div>
        <PropertyForm form={'propertyForm'} onSubmit={this.handleSubmit} />
        <div className={'mandant-bottomButton'}>
          <img
            id={'prevArrow4'}
            className={'mandant-nextArrow'}
            src={PrevArrow}
            alt=""
            height={65}
            width={65}
            onClick={this.props.onPrev}
          />
          <img
            id={'nextArrow4'}
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
  const { createMandate, createProperty } = state;

  return {
    mandate: createMandate,
    property: createProperty
  };
}

export default connect(mapStateToProps)(Mandant);
