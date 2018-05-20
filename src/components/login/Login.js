import React from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../../services/Auth';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: '',
    };
    this.processForm = this.processForm.bind(this);
  }

  processForm(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_APIV1_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        'data': {
          'attributes': {
            'email': `${this.email.value}`,
            'password': `${this.password.value}`
          }
        }
      })
    }).then(res => res.json())
    .then(res => {
      if (res.name && res.name === 'SequelizeValidationError') {
        this.setState({errors: i18n.t('login.errorInformation')});
      } else {
        if (res.message === 'ok') {
          this.setState({errors: ''});
          Auth.authenticateUser(res.token, res.id);
          window.location.href = `/users/${res.id}`;
        } else {
          this.setState({errors: i18n.t('login.userNotFound')});
        }
      }
    })
    .catch(err => {
      this.setState({errors: i18n.t('login.error')});
    });
  }

  render() {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className='login'>
              <div className='login-container'>
                <p className='login-header' >{t('login.title')}</p>
                <form className='login-form' onSubmit={this.processForm}>
                  <div className='login-inputs'>
                    <label className='login-label'>
                      {t('login.username.label')}
                      <input
                        ref={(email) => this.email = email }
                        placeholder={t('login.username.placeholder')}
                        type='text'
                        name='email'/>
                    </label>
                    <label className='login-label'>
                      {t('login.password.label')}
                      <input
                        ref={(password) => this.password= password }
                        placeholder={t('login.password.placeholder')}
                        type='password'
                        name='password'/>
                    </label>
                  </div>
                  <Button
                    className='login-button'
                    bsStyle='success'
                    type='submit'>
                    {t('login.button')}
                  </Button>
                  <p className="login-errorMessage">{this.state.errors}</p>
                </form>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default Login;