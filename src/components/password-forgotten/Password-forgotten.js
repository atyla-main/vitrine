import React from 'react';
import { Button } from 'react-bootstrap';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class PasswordForgotten extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: '',
      emailSent: ''
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
        console.log(res);
        if (res && res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('login.errorInformation') });
        } else {
          if (res.message === 'ok') {
            this.setState({ errors: '' });
            this.setState({
              emailSent: i18n.t('passwordForgotten.validationMessage')
            });
          } else {
            this.setState({ errors: i18n.t('login.userNotFound') });
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: i18n.t('login.error') });
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="login">
            <div className="login-container">
              <p className="login-header">{t('passwordForgotten.title')}</p>
              <form className="login-form" onSubmit={this.processForm}>
                <div className="login-inputs">
                  <label className="login-label">
                    {t('passwordForgotten.label')}
                    <input
                      ref={email => (this.email = email)}
                      placeholder={t('passwordForgotten.placeholder')}
                      type="text"
                      name="email"
                    />
                  </label>
                </div>
                <Button
                  className="login-button"
                  bsStyle="success"
                  type="submit"
                >
                  {t('passwordForgotten.button')}
                </Button>
                <p className="login-errorMessage">{this.state.errors}</p>
                <p className="">{this.state.emailSent}</p>
              </form>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default PasswordForgotten;
