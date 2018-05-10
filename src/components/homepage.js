import React from 'react';
import Menu from './menu';
import '../styles/menu.css';

var countDownDate = new Date('Jun 30, 2018 20:00:00').getTime();
var now = new Date().getTime();
var distance = countDownDate - now;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ''
    };
    this.postEmail = this.postEmail.bind(this);
  }

  postEmail(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_APIV1_URL}newsletters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            email: `${this.email.value}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.name && res.name === 'SequelizeValidationError') {
          this.setState({
            response: 'Please verify the email!'
          });
        } else {
          this.setState({
            response: 'Thank you! We will keep you informed!'
          });
        }
      })
      .catch(err => {
        this.setState({ response: 'Please verify the email!' });
      });
  }
  render() {
    return (
      <div className="bgImg">
        <input type="checkbox" id="toggle" />
        <Menu />
        <div className="topLeft">
          <p>atyla</p>
        </div>
        <div className="middle">
          <h1>COMING SOON</h1>
          <hr />
          <p>{days} days left</p>
        </div>
        <form onSubmit={this.postEmail}>
          <p className="bottomRightText">{this.state.response}</p>
          <div className="bottomRight">
            <input
              ref={email => (this.email = email)}
              placeholder="Email"
              type="text"
              name="email"
            />
            <br />
            <button type="Submit">Newsletter</button>
          </div>
        </form>
      </div>
    );
  }
}

export default HomePage;
