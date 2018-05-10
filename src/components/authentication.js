import React from 'react';
import Menu from './menu';
import '../styles/menu.css';

var countDownDate = new Date('Jun 30, 2018 20:00:00').getTime();
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));

class Authentication extends React.Component {
  render() {
    return (
      <div className="bgImg">
        <input type="checkbox" id="toggle" />
        <Menu />
        <div className="topLeft">
          <p>atyla</p>
        </div>
        <div className="middle">
          <h1>Authentication</h1>
        </div>
      </div>
    );
  }
}

export default Authentication;
