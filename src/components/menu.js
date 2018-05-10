import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../styles/menu.css';

var countDownDate = new Date('Jun 30, 2018 20:00:00').getTime();
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ''
    };
  }
  render() {
    return (
      <div>
        <label
          for="toggle"
          className="toggle"
          data-open="Main Menu"
          data-close="Close Menu"
          onclick
        />
        <ul className="menu">
          <li>
            <Link to="/authentication">Sign in/Sign up</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/howitworks">How it works</Link>
          </li>
          <li>
            <Link to="/">Explore ICO's</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
