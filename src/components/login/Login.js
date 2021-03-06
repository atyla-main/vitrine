import React from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../../services/Auth';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';
import _ from 'lodash';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: ''
    };
    this.processForm = this.processForm.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    if (_.isEmpty(this.password.value)) {
      this.setState({ errors: 'Le mot de passe ne peux pas être vide.' });
      return;
    }

    fetch(`${process.env.REACT_APP_APIV1_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            email: `${this.email.value}`,
            password: `${this.password.value}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('login.errorInformation') });
        } else {
          if (res.message === 'ok') {
            this.setState({ errors: '' });
            Auth.authenticateUser(res.token, res.id);
            window.location.href = `/account`;
          } else {
            this.setState({ errors: 'Aucun utilisateur trouvé.' });
          }
        }
      })
      .catch(err => {
        this.setState({ errors: i18n.t('login.error') });
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="login">
            <div className="login-container">
              <p className="login-header">atyla</p>
              <form className="login-form" onSubmit={this.processForm}>
                <div className="login-inputs">
                  <input
                    className="login-loginInput mod-intern"
                    ref={email => (this.email = email)}
                    placeholder="Email"
                    type="text"
                    name="email"
                  />
                  <input
                    className="login-loginInput mod-last"
                    ref={password => (this.password = password)}
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                  />
                </div>
                <Button
                  className="login-button"
                  bsStyle="success"
                  type="submit"
                >
                  Se connecter
                </Button>
                <p className="login-connectionImpossible">
                  <a href="/password-forgotten">
                    Vous n’arrivez pas à vous connectez?
                  </a>
                </p>
                <p className="login-errorMessage">{this.state.errors}</p>
                <p className="login-ctaLimit">  Ou  </p>
                <a href="/register">
                  <Button className="login-button mod-signup" bsStyle="success">
                    Ouvrir un compte
                  </Button>
                </a>
              </form>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default Login;
