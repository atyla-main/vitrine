import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { I18n } from 'react-i18next';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AtylaInputTheme, AtylaInput } from '../../styles/inputs/atyla-inputs';
import AtylaLogo from '../../img/atyla-design-v1/logo.png';
import { Button } from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const renderField = ({
  input,
  label,
  type,
  inputClassName,
  placeholder,
  multiline,
  rows,
  rowsMax,
  disabled,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <MuiThemeProvider theme={AtylaInputTheme}>
        <AtylaInput
          {...input}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          rowsMax={rowsMax}
          placeholder={placeholder}
          type={type}
          className={inputClassName}
        />
      </MuiThemeProvider>
      {touched &&
        ((error && <span className={'register-errorMessage'}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Requis.';
  }

  if (!values.lastName) {
    errors.lastName = 'Requis.';
  }

  if (!values.email) {
    errors.email = 'Requis.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Adresse email invalide.';
  }

  if (!values.password) {
    errors.password = 'Requis.';
  } else if (values.password < 8) {
    errors.password = 'Le mot de passe doit faire au minimum 8 charactères.';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Requis.';
  }

  if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'Doit être similaire au mot de passe.';
  }

  return errors;
};

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: '',
      countryCode: 'FR',
      termOfUseError: '',
      isRegistered: false
    };
    this.registerSubmit = this.registerSubmit.bind(this);
  }

  registerSubmit(form) {
    const { termOfUseValue } = this.props;
    this.setState({ errors: false });

    if (!termOfUseValue || termOfUseValue === false) {
      this.setState({ termOfUseError: true });
      return;
    } else {
      this.setState({ termOfUseError: false });
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
            firstName: `${form.values.firstName}`,
            lastName: `${form.values.lastName}`,
            email: `${form.values.email}`,
            password: `${form.values.password}`,
            country: `${this.state.countryCode}`,
            optIn: `${form.values.termOfUse}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          res.errors.forEach(error => {
            if (error.detail && error.detail === 'email must be unique') {
              this.setState({ errors: 'Email déjà utilisé.' });
            } else {
              this.setState({ errors: 'Merci de bien remplir le formulaire.' });
            }
          });
        } else {
          this.setState({ isRegister: true });
        }
      })
      .catch(err => {
        this.setState({ errors: 'Erreur serveur merci de recharger la page.' });
      });
  }

  onSelectFlag = countryCode => {
    this.setState({
      countryCode: countryCode
    });
  };

  render() {
    let { isRegister, termOfUseError } = this.state;
    const { submitting } = this.props;

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
                    <form
                      className="login-form"
                      onSubmit={e => {
                        e.preventDefault();
                        if (!this.props.registerFormValues.syncErrors) {
                          this.registerSubmit(this.props.registerFormValues);
                        }
                      }}
                    >
                      <MuiThemeProvider theme={AtylaInputTheme}>
                        <div>
                          <Field
                            name="firstName"
                            type="text"
                            component={renderField}
                            placeholder="Prénom"
                            inputClassName={
                              'login-loginInput mod-intern mod-register'
                            }
                          />
                        </div>
                        <div>
                          <Field
                            name="lastName"
                            type="text"
                            component={renderField}
                            placeholder="Nom"
                            inputClassName={
                              'login-loginInput mod-intern mod-register'
                            }
                          />
                        </div>
                        <div>
                          <Field
                            name="email"
                            type="text"
                            component={renderField}
                            placeholder="Email"
                            inputClassName={
                              'login-loginInput mod-intern mod-register'
                            }
                          />
                        </div>
                        <ReactFlagsSelect
                          searchable={true}
                          defaultCountry={this.state.countryCode}
                          className="login-loginInput mod-intern mod-register mod-flag"
                          selectedSize={21}
                          onSelect={this.onSelectFlag}
                        />
                        <div>
                          <Field
                            name="password"
                            type="password"
                            component={renderField}
                            placeholder="Mot de passe"
                            inputClassName={
                              'login-loginInput mod-intern mod-register'
                            }
                          />
                        </div>
                        <div className={'register-input'}>
                          <Field
                            name="passwordConfirmation"
                            type="password"
                            component={renderField}
                            placeholder="Confirmez votre mot de passe"
                            inputClassName={
                              'login-loginInput mod-intern mod-register'
                            }
                          />
                        </div>
                      </MuiThemeProvider>
                      <div className="register-checkBoxes">
                        <Field
                          name="termOfUse"
                          component="input"
                          type="checkbox"
                          className="login-loginInput mod-checkBox"
                        />
                        <p className="legalError">
                          Je certifie avoir lu et accepté les{' '}
                          <a>Conditions d’utilisation</a> de atyla
                        </p>
                      </div>
                      {termOfUseError && (
                        <p className={'register-errorMessage'}>Requis</p>
                      )}
                      <div />
                      <Button
                        className="login-button"
                        bsStyle="success"
                        type="submit"
                        disabled={submitting}
                      >
                        Retournez à la page de connexion atyla
                      </Button>
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

Register = reduxForm({
  form: 'registerForm',
  validate
})(Register);

const selector = (form, ...other) =>
  formValueSelector('registerForm')(...other);

function mapStateToProps(state, initialProps) {
  return {
    registerFormValues: state.form.registerForm,
    termOfUseValue: selector(initialProps.form, state, 'termOfUse')
  };
}

export default connect(mapStateToProps)(Register);
