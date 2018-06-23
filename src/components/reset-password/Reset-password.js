import React from 'react';
import { Button } from 'react-bootstrap';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class PasswordForgotten extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: '',
      id: props.match.params.id
    };
    this.processForm = this.processForm.bind(this);
  }

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_APIV1_URL}can_reset_password/${this.state.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log(res.message);
        if (res.message !== 'ok') {
          window.location.href = '/not-found';
        }
      })
      .catch(err => {
        window.location.href = '/not-found';
      });
  }

  processForm(event) {
    event.preventDefault();

    if (this.password1.value !== this.password2.value) {
      this.setState({ errors: i18n.t('resetPassword.errorPassword') });
      return;
    }

    fetch(`${process.env.REACT_APP_APIV1_URL}reset_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: { password: `${this.password1.value}`, id: this.state.id }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res && res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('login.errorInformation') });
        } else {
          if (res.message === 'ok') {
            this.setState({ errors: '' });
            window.location.href = '/login';
          } else {
            this.setState({ errors: i18n.t('login.userNotFound') });
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
              <p className="login-header">{t('resetPassword.title')}</p>
              <form className="login-form" onSubmit={this.processForm}>
                <div className="login-inputs">
                  <label className="login-label">
                    {t('resetPassword.label1')}
                    <input
                      ref={password1 => (this.password1 = password1)}
                      placeholder={t('resetPassword.placeholder')}
                      type="password"
                      name="password1"
                    />
                  </label>
                  <label className="login-label">
                    {t('resetPassword.label2')}
                    <input
                      ref={password2 => (this.password2 = password2)}
                      placeholder={t('resetPassword.placeholder')}
                      type="password"
                      name="password2"
                    />
                  </label>
                </div>
                <Button
                  className="login-button"
                  bsStyle="success"
                  type="submit"
                >
                  {t('resetPassword.button')}
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
