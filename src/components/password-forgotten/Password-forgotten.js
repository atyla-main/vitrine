import React from 'react';
import { Button } from 'react-bootstrap';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class PasswordForgotten extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: '',
      emailSent: false,
      email: ''
    };
    this.processForm = this.processForm.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_APIV1_URL}password_forgotten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: { attributes: { email: `${this.email.value}` } }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('login.errorInformation') });
        } else {
          if (res.message === 'ok') {
            this.setState({ errors: '' });
            this.setState({
              emailSent: true,
              email: this.email.value
            });
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
    let isSent = this.state.emailSent;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="login">
            <div className="login-container">
              <p className="login-header">atyla</p>
              {isSent ? (
                <div className="passwordForgotten-section">
                  <i className="fa fa-envelope-o passwordForgotten-mail" />
                  <p>
                    Un email vient de vous être envoyé à l’adresse suivant : <span className="passwordForgotten-emphasis">
                      {this.state.email}
                    </span>
                  </p>
                  <p className="passwordForgotten-lastSection">
                    Vous devez cliquer sur le
                    <span className="passwordForgotten-emphasis">
                      {' '}
                      lien de confirmation{' '}
                    </span>
                    afin de pouvoir réinitialiser votre mot de passe
                  </p>
                </div>
              ) : (
                <div>
                  <p className="passwordForgotten-subtitle">
                    Besoin d’un nouveau mot de passe ?
                  </p>
                  <p className="passwordForgotten-contentText">
                    Entrez l’adresse mail de votre compte atyla pour commencer
                  </p>
                  <form className="login-form" onSubmit={this.processForm}>
                    <div className="login-inputs">
                      <input
                        className="login-loginInput mod-last"
                        ref={email => (this.email = email)}
                        placeholder="Email"
                        type="text"
                        name="email"
                      />
                    </div>
                    <Button
                      className="login-button"
                      bsStyle="success"
                      type="submit"
                    >
                      Suivant
                    </Button>
                    <p className="passwordForgotten-emailLost">
                      Adresse email oubliée
                    </p>
                    <p className="login-errorMessage mod-forgotten">
                      {this.state.errors}
                    </p>
                  </form>
                </div>
              )}
              <p className="passwordForgotten-footer">
                <a href="/login">Retournez à la page de connexion atyla</a>
              </p>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default PasswordForgotten;
