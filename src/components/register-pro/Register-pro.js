import React from 'react';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';
import { Button } from 'react-bootstrap';

class RegisterPro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      isRegistered: false,
      email: ''
    };
    this.registerPro = this.registerPro.bind(this);
  }

  registerPro(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_APIV1_URL}prospects`, {
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
        if (res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('register.error') });
        } else {
          this.setState({
            errors: '',
            isRegistered: true,
            email: this.email.value
          });
        }
      })
      .catch(err => {
        this.setState({ errors: i18n.t('login.error') });
      });
  }

  render() {
    let isRegister = this.state.isRegistered;

    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div>
            {isRegister ? (
              <div className="login">
                <div className="login-container">
                  <p className="login-header">atyla</p>
                  <div className="passwordForgotten-section">
                    <i className="fa fa-check-circle-o passwordForgotten-mail mod-success" />
                    <p>
                      Votre demande de création d’un{' '}
                      <span className="passwordForgotten-emphasis">
                        compte professionnel
                      </span>{' '}
                      a bien été enregistrée
                    </p>
                    <p className="registerPro-lastSection">
                      <span className="passwordForgotten-emphasis">
                        Un conseiller va vous recontacter
                      </span>{' '}
                      dans les prochaines 24 heures
                    </p>
                  </div>
                  <a href="/login">
                    <p className="passwordForgotten-footer">
                      <a href="/login">
                        Retournez à la page de connexion atyla
                      </a>
                    </p>
                  </a>
                </div>
              </div>
            ) : (
              <div className="login">
                <div className="login-container">
                  <p className="login-header">atyla</p>
                  <p className="passwordForgotten-subtitle">
                    Ouvrir un compte professionnel
                  </p>
                  <p className="passwordForgotten-contentText registerPro-legendText">
                    Entrez votre adresse mail, un conseiller va vous recontacter
                  </p>
                  <form className="login-form" onSubmit={this.registerPro}>
                    <div className="login-inputs">
                      <input
                        className="login-loginInput mod-intern"
                        ref={email => (this.email = email)}
                        placeholder="Email"
                        type="text"
                        name="email"
                      />
                    </div>
                    <p className="login-errorMessage mod-forgotten">
                      {this.state.errors}
                    </p>
                    <Button
                      className="login-button"
                      bsStyle="success"
                      type="submit"
                    >
                      Ouvrir un compte professionel
                    </Button>
                  </form>
                  <p className="registerPro-footerNote">
                    Vous êtes un particulier ?{' '}
                    <a href="/register" className="homepage-openProLink">
                      Ouvrir un compte particulier
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </I18n>
    );
  }
}

export default RegisterPro;
