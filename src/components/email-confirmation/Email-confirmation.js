import React from 'react';

class EmailConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      user: null
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIV1_URL}users/${this.state.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.id) {
          this.setState({ user: data.data.id });
        } else {
          window.location.href = '/';
        }
      })
      .catch(err => {
        window.location.href = '/';
      });
  }

  render() {
    let userId = this.state.user;
    return (
      <div>
        {userId && (
          <div
            style={{ marginTop: '50px', height: '100vh', textAlign: 'center' }}
          >
            <p>Your email has been verified</p>
            <p>
              Please go to the <a href="/">Homepage</a>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default EmailConfirmation;
