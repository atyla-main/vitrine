import React from 'react';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';
import { Button } from 'react-bootstrap';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: ''
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser(event) {
    event.preventDefault();

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
            source: `${this.source.value}`,
            stage: 'inscription',
            gender: `${this.gender.value}`,
            birthDate: `${this.birthDate.value}`,
            birthCity: `${this.birthCity.value}`,
            phone: `${this.phone.value}`,
            citizenship: `${this.citizenship.value}`,
            country: `${this.country.value}`,
            address: `${this.address.value}`,
            zipCode: `${this.zipCode.value}`,
            city: `${this.city.value}`,
            state: `${this.userState.value}`,
            optIn: `${this.optIn.value}`
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.name && res.name === 'SequelizeValidationError') {
          this.setState({ errors: i18n.t('register.error') });
        } else {
          this.setState({ errors: '' });
          window.location.href = '/register-validation';
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
          <div className="ico">
            <div className="ico-headerBar">
              <p className="ico-title">Sign-up</p>
            </div>
            <div className="ico-card">
              <p className="ico-cardTitle">{t('ico.informations')}</p>
              <form className="ico-form" onSubmit={this.registerUser}>
                <label className="ico-cardLabel">
                  {t('user.labels.firstName')}
                  <input
                    ref={firstName => (this.firstName = firstName)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="firstName"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.lastName')}
                  <input
                    ref={lastName => (this.lastName = lastName)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="lastName"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.email')}
                  <input
                    ref={email => (this.email = email)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="email"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.password')}
                  <input
                    ref={password => (this.password = password)}
                    placeholder=""
                    type="password"
                    className="ico-cardInput"
                    name="password"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.phone')}
                  <input
                    ref={phone => (this.phone = phone)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="phone"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.source')}
                  <input
                    ref={source => (this.source = source)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="source"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.gender')}
                  <select
                    ref={gender => (this.gender = gender)}
                    className="ico-cardInput"
                  >
                    <option value="mr">Mister</option>
                    <option value="mrs">Miss</option>
                  </select>
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.birthDate')}
                  <input
                    ref={birthDate => (this.birthDate = birthDate)}
                    placeholder=""
                    type="date"
                    className="ico-cardInput"
                    name="birthDate"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.birthCity')}
                  <input
                    ref={birthCity => (this.birthCity = birthCity)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="birthCity"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.citizenship')}
                  <input
                    ref={citizenship => (this.citizenship = citizenship)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="citizenship"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.country')}
                  <input
                    ref={country => (this.country = country)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="country"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.address')}
                  <input
                    ref={address => (this.address = address)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="address"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.zipCode')}
                  <input
                    ref={zipCode => (this.zipCode = zipCode)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="zipCode"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.city')}
                  <input
                    ref={city => (this.city = city)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="city"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.state')}
                  <input
                    ref={state => (this.userState = state)}
                    placeholder=""
                    type="text"
                    className="ico-cardInput"
                    name="state"
                  />
                </label>
                <label className="ico-cardLabel">
                  {t('user.labels.optIn')}
                  <input
                    ref={optIn => (this.optIn = optIn)}
                    placeholder=""
                    type="checkbox"
                    className="ico-cardInput"
                    name="optIn"
                  />
                </label>
                <Button
                  className="login-button"
                  bsStyle="success"
                  type="submit"
                >
                  {t('login.button')}
                </Button>
              </form>
              <p className="login-errorMessage">{this.state.errors}</p>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default Register;
