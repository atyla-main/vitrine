import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { I18n } from 'react-i18next';
import _ from 'lodash';
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core/styles';
import { AtylaInputTheme, AtylaInput } from '../../styles/inputs/atyla-inputs';
import AtylaLogo from '../../img/atyla-design-v1/logo.png';

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
      <div>
        <div className="login-logo">
          <a href="../">
            <img src={AtylaLogo} height={46} width={123} alt="" />
          </a>
        </div>
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
                        Un email vient de vous être envoyé à l’adresse
                        suivant : <span className="passwordForgotten-emphasis">
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
                      <a href="/login">
                        Retournez à la page de connexion atyla
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="login">
                  <div className="login-container">
                    <div className="register-title">
                      <p>
                        Découvrez atyla pour vos{' '}
                        <span className="passwordForgotten-emphasis">
                          contrats immobiliers
                        </span>
                      </p>
                    </div>
                    <form className="login-form" onSubmit={this.registerUser}>
                      <MuiThemeProvider theme={AtylaInputTheme}>
                        <AtylaInput
                          ref={firstName => (this.firstName = firstName)}
                          placeholder="Prénom"
                          type="text"
                          className={
                            'login-loginInput mod-intern mod-register' +
                            firstNameError
                          }
                          name="firstName"
                        />
                        <AtylaInput
                          ref={lastName => (this.lastName = lastName)}
                          placeholder="Nom"
                          type="text"
                          className={
                            'login-loginInput mod-intern mod-register' +
                            lastNameError
                          }
                          name="lastName"
                        />
                        <AtylaInput
                          ref={email => (this.email = email)}
                          placeholder="Email"
                          type="text"
                          className={
                            'login-loginInput mod-intern mod-register' +
                            emailError
                          }
                          name="email"
                        />
                        <ReactFlagsSelect
                          searchable={true}
                          defaultCountry="FR"
                          className="login-loginInput mod-intern mod-register"
                          onSelect={this.onSelectFlag}
                        />
                        <AtylaInput
                          ref={password => (this.password = password)}
                          placeholder="Mot de passe"
                          type="password"
                          className={
                            'login-loginInput mod-intern mod-register' +
                            passwordError
                          }
                          name="password"
                        />
                        <AtylaInput
                          ref={password1 => (this.password1 = password1)}
                          placeholder="Confirmez votre mot de passe"
                          type="password"
                          className={
                            'login-loginInput mod-intern mod-register' +
                            passwordError
                          }
                          name="passwordConfirmation"
                        />
                      </MuiThemeProvider>
                      <div className="register-checkBoxes">
                        <input
                          type="checkbox"
                          checked={this.state.isChecked}
                          onChange={this.toggleConditionsChange}
                          className="login-loginInput mod-checkBox"
                          name="legalAge"
                        />
                        <p className="legalError">
                          Je certifie avoir lu et accepté les{' '}
                          <a>Conditions d’utilisation</a> de atyla
                        </p>
                      </div>
                      <button type="submit" className="login-button">
                        Ouvrir un compte
                      </button>
                    </form>
                    <p className="login-errorMessage">{this.state.errors}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </I18n>
      </div>
    );
  }
}

export default Register;
