import React from 'react';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      isChecked: false,
      isOptIn: false,
      isRegistered: false,
      email: ''
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(event) {
    event.preventDefault();

    if (!this.state.isChecked) {
      this.setState({
        errors: "Il vous faut accepter les conditions d'utilisation."
      });
      return;
    }

    if (this.password.value !== this.password1.value) {
      this.setState({ errors: 'Mot de passe incorrect.' });
      return;
    }

    fetch(`${process.env.REACT_APP_APIV1_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            firstName: `${this.firstName.value}`,
            lastName: `${this.lastName.value}`,
            email: `${this.email.value}`,
            password: `${this.password.value}`,
            country: `${this.country.value}`,
            optIn: `${this.state.isOptIn}`
          }
        }
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

  toggleOptInChange = () => {
    this.setState({
      isOptIn: !this.state.isOptIn
    });
  };

  toggleConditionsChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

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
                      afin de pouvoir activer votre compte
                    </p>
                  </div>
                  <p className="passwordForgotten-footer">
                    <a href="/login">Retournez à la page de connexion atyla</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="register-container">
                <div className="register-title">
                  <p>
                    Investissez dans les tokens de votre choix de la manière la
                    plus
                    <span className="passwordForgotten-emphasis"> simple </span>
                    et{' '}
                    <span className="passwordForgotten-emphasis">
                      sécurisée
                    </span>{' '}
                    possible
                  </p>
                </div>
                <form className="" onSubmit={this.registerUser}>
                  <input
                    ref={country => (this.country = country)}
                    placeholder="Pays"
                    type="text"
                    className="login-loginInput mod-intern mod-register"
                    name="country"
                  />
                  <input
                    ref={firstName => (this.firstName = firstName)}
                    placeholder="Prénom"
                    type="text"
                    className="login-loginInput mod-intern mod-register"
                    name="firstName"
                  />
                  <input
                    ref={lastName => (this.lastName = lastName)}
                    placeholder="Nom"
                    type="text"
                    className="login-loginInput mod-intern mod-register"
                    name="lastName"
                  />
                  <input
                    ref={email => (this.email = email)}
                    placeholder="Email"
                    type="text"
                    className="login-loginInput mod-intern mod-register"
                    name="email"
                  />
                  <input
                    ref={password => (this.password = password)}
                    placeholder="Mot de passe"
                    type="password"
                    className="login-loginInput mod-intern mod-register"
                    name="password"
                  />
                  <input
                    ref={password1 => (this.password1 = password1)}
                    placeholder="Choisissez votre mot de passe"
                    type="password"
                    className="login-loginInput mod-last mod-register"
                    name="password"
                  />
                  <div className="register-checkBoxes">
                    <input
                      ref={optIn => (this.optIn = optIn)}
                      placeholder="Confirmez le mot de passe"
                      type="checkbox"
                      className="login-loginInput mod-intern mod-checkBox"
                      name="optIn"
                    />
                    <p>
                      Recevez les offres et promotions atyla par email. Vous
                      pouvez modifier ce paramètre, à tout moment.{' '}
                      <a>Plus d’informations</a>
                    </p>
                  </div>
                  <div className="register-checkBoxes">
                    <input
                      placeholder="Confirmez le mot de passe"
                      type="checkbox"
                      checked={this.state.isChecked}
                      onChange={this.toggleConditionsChange}
                      className="login-loginInput mod-last mod-checkBox"
                      name="legalAge"
                    />
                    <p>
                      Je certifie avoir l’âge légal et avoir lu et accepté les{' '}
                      <a>Conditions d’utilisation</a> de atyla
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="homepage-switcherAtylaButton mod-register"
                  >
                    <span className="homepage-switcherAtylaButtonContent">
                      <span className="homepage-switcherAtylaButtonBrand">
                        atyla
                      </span>
                      <span className="homepage-switcherAtylaButtonText">
                        Ouvrir un compte
                      </span>
                    </span>
                  </button>
                </form>
                <p className="login-errorMessage">{this.state.errors}</p>
              </div>
            )}
          </div>
        )}
      </I18n>
    );
  }
}

export default Register;
