import React from 'react';
import { Button } from 'react-bootstrap';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

class Newsletter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      emailError: ''
    };
    this.postEmail = this.postEmail.bind(this);
  }

  postEmail(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_APIV1_URL}newsletters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            email: `${this.email.value}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.name && res.name === 'SequelizeValidationError') {
          this.setState({
            emailError: 'mod-error',
            response: i18n.t('homepage.emailError')
          });
        } else {
          this.setState({
            emailError: 'mod-sucess',
            response: i18n.t('homepage.emailSuccess')
          });
        }
      })
      .catch(err => {
        this.setState({
          emailError: 'mod-error',
          response: i18n.t('homepage.emailError')
        });
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="newsletterContainer">
            <div className="newsletter">
              <form className="newsletter-form" onSubmit={this.postEmail}>
                <input
                  ref={email => (this.email = email)}
                  className={'newsletter-input ' + this.state.emailError}
                  placeholder="Saisissez votre email pour avoir des nouvelles d’atyla"
                  type="text"
                  name="email"
                />
                <Button
                  bsStyle="danger"
                  type="submit"
                  className="newsletter-button"
                >
                  S’inscrire
                </Button>
              </form>
            </div>
            <p className="newsletter-footer">
              Vous êtes un entrepreneur?{' '}
              <a href="/register-pro" className="homepage-openProLink">
                Ouvrir un compte professionnel
              </a>
            </p>
          </div>
        )}
      </I18n>
    );
  }
}

export default Newsletter;
