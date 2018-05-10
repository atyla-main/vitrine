import React from 'react';
import Menu from './menu';
import '../styles/menu.css';

class HowItWorks extends React.Component {
  render() {
    return (
      <div className="bgImg">
        <input type="checkbox" id="toggle" />
        <Menu />
        <div className="topLeft">
          <p>atyla</p>
        </div>
        <div className="middle">
          <h1>How It Works</h1>
        </div>
      </div>
    );
  }
}

export default HowItWorks;
