import React, { Component } from 'react';

class CreateButton extends Component {
  render() {
    const { openModal } = this.props;
    return (
      <div className={'tabHeader-button'}>
        <button onClick={openModal} className={'tabHeader-buttonDesign'}>
          Créer un element
        </button>
      </div>
    );
  }
}

export default CreateButton;
