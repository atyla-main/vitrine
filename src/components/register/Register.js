import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { I18n } from 'react-i18next';
import _ from 'lodash';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      countryCode: '',
      isChecked: false,
      isOptIn: false,
      isRegistered: false,
      email: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      legalError: ''
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(event) {
    event.preventDefault();
    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      legalError: '',
      errors: ''
    });

    if (!this.state.isChecked) {
      this.setState({
        legalError: 'form-hasError',
        errors: "Il vous faut accepter les conditions d'utilisation."
      });
      return;
    }

    if (this.password.value !== this.password1.value) {
      this.setState({
        passwordError: 'has-error',
        errors: 'Les mots de passe ne correspondent pas.'
      });
      return;
    } else if (this.password.value.length < 8) {
      this.setState({
        passwordError: 'has-error',
        errors: 'Le mot de passe doit faire au minimum 8 charactères.'
      });
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
            country: `${this.state.countryCode}`,
            optIn: `${this.state.isOptIn}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.name && res.name === 'SequelizeValidationError') {
          res.errors.forEach(error => {
            this.setState({ [error.path + 'Error']: 'has-error' });
            this.setState({ errors: 'Les champs sont obligatoires.' });
            if (error.path === 'email' && !_.isEmpty(this.email.value)) {
              if (error.validatorKey === 'isEmail') {
                this.setState({ errors: 'Format de l’email invalid.' });
              } else if (error.validatorKey === 'isUnique') {
                this.setState({ errors: 'Email déjà utilisé.' });
              }
            }
          });
        } else {
          this.setState({
            errors: '',
            isRegistered: true,
            email: this.email.value
          });
        }
      })
      .catch(err => {
        this.setState({ errors: 'Erreur serveur merci de recharger la page.' });
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

  onSelectFlag = countryCode => {
    this.setState({
      countryCode: countryCode
    });
  };

  render() {
    let isRegister = this.state.isRegistered;
    let firstNameError = this.state.firstNameError;
    let lastNameError = this.state.lastNameError;
    let emailError = this.state.emailError;
    let passwordError = this.state.passwordError;
    let legalError = this.state.legalError;

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
                    Découvrez atyla : la solution
                    <span className="passwordForgotten-emphasis"> simple </span>
                    et{' '}
                    <span className="passwordForgotten-emphasis">
                      intuitive
                    </span>{' '}
                    pour vos contrats immobiliers
                  </p>
                </div>
                <form className="" onSubmit={this.registerUser}>
                  <input
                    ref={firstName => (this.firstName = firstName)}
                    placeholder="Prénom"
                    type="text"
                    className={
                      'login-loginInput mod-intern mod-register ' +
                      firstNameError
                    }
                    name="firstName"
                  />
                  <input
                    ref={lastName => (this.lastName = lastName)}
                    placeholder="Nom"
                    type="text"
                    className={
                      'login-loginInput mod-intern mod-register ' +
                      lastNameError
                    }
                    name="lastName"
                  />
                  <input
                    ref={email => (this.email = email)}
                    placeholder="Email"
                    type="text"
                    className={
                      'login-loginInput mod-intern mod-register ' + emailError
                    }
                    name="email"
                  />
                  <ReactFlagsSelect
                    searchable={true}
                    defaultCountry="FR"
                    className="login-loginInput mod-intern mod-register"
                    onSelect={this.onSelectFlag}
                  />
                  <input
                    ref={password => (this.password = password)}
                    placeholder="Mot de passe"
                    type="password"
                    className={
                      'login-loginInput mod-intern mod-register ' +
                      passwordError
                    }
                    name="password"
                  />
                  <input
                    ref={password1 => (this.password1 = password1)}
                    placeholder="Confirmez votre mot de passe"
                    type="password"
                    className={
                      'login-loginInput mod-intern mod-register ' +
                      passwordError
                    }
                    name="passwordConfirmation"
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
                      type="checkbox"
                      checked={this.state.isChecked}
                      onChange={this.toggleConditionsChange}
                      className="login-loginInput mod-last mod-checkBox"
                      name="legalAge"
                    />
                    <p className={legalError}>
                      Je certifie avoir lu et accepté les{' '}
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
