import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import SaveIcon from '../../../img/atyla-design-v1/save_icon.png';

class MandateFormSubmit extends Component {
  render() {
    const { dispatch, formName, text } = this.props;

    return (
      <img
        src={SaveIcon}
        onClick={e => dispatch(submit(formName))}
        alt=""
        height={61}
        width={67}
        className={'contractForm-saveButton'}
      />
    );
  }
}

export default connect()(MandateFormSubmit);
