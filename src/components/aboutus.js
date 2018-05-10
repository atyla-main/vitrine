import React from 'react';
import Menu from './menu';
import '../styles/menu.css';

class AboutUs extends React.Component {
  render() {
    return (
      <div className="bgImg">
        <input type="checkbox" id="toggle" />
        <Menu />
        <div className="topLeft">
          <p>atyla</p>
        </div>
        <div className="middle">
          <h1>About Us</h1>
        </div>
      </div>
    );
  }
}

export default AboutUs;
