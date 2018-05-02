import React from 'react';

var countDownDate = new Date('Jun 30, 2018 20:00:00').getTime();
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));

class HomePage extends React.Component {
  render() {
    return (
      <div className="bgImg">
        <div className="topLeft">
          <p>atyla</p>
        </div>
        <div className="middle">
          <h1>COMING SOON</h1>
          <hr />
          <p className="remaining">{days} days left</p>
        </div>
        <div className="bottomRight">
          <input type="text" placeholder="Newsletter" />
          <button type="submit">Submit</button>
        </div>
      </div>
    );
  }
}

export default HomePage;
