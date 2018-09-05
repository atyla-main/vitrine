import React, { Component } from 'react';
import AtylaLogo from '../../img/Logo1_Blanc.png';

class InProgress extends Component {
  render() {
    return (
      <div className={'inProgress-container'}>
        <div className={'inProgress-content'}>
          <img className={'inProgress-img'} src={AtylaLogo} />
          <p className={'inProgress-text'}>We are coming soon</p>
          <p className={'inProgress-text'}>contact@atyla.io</p>
        </div>
      </div>
    );
  }
}

export default InProgress;
