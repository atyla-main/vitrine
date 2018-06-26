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
          <div className="login">
            <div className="login-container">
              <p className="login-header">atyla</p>
              <div className="passwordForgotten-section">
                <i className="fa fa-check-circle-o passwordForgotten-mail mod-success" />
                <p>
                  Votre compte est<span className="passwordForgotten-emphasis">
                    {' '}
                    désormais activé
                  </span>
                </p>
                <p className="passwordForgotten-lastSection">
                  Vous pouvez maintenant vous y connecter pour gérer vos tokens
                </p>
              </div>
              <p className="passwordForgotten-footer">
                <a href="/login">Retournez à la page de connexion atyla</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EmailConfirmation;
