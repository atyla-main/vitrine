import React from 'react';
import { I18n } from 'react-i18next';
import Auth from '../../services/Auth';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      user: {},
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIV1_URL}api/users/${this.state.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `JWT ${Auth.getToken()}`
      }}).then(res => res.json())
      .then(data => {
        this.setState({ user: data.data })
      })
      .catch(err => {
        window.location.href = '/';
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="ico">
              <div className="ico-headerBar">
                { this.state.user.id &&
                  <p className="ico-title">{this.state.user.attributes.lastName}</p>
                }
              </div>
              <div className="ico-card">
                <p className="ico-cardTitle">{t("ico.informations")}</p>
                { this.state.user.id &&
                  <form className="ico-form">
                    <label className="ico-cardLabel">
                      {t("user.labels.firstName")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.user.attributes.firstName} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("user.labels.lastName")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.user.attributes.lastName} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("user.labels.email")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.user.attributes.email} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("user.labels.token")}
                      <textarea
                        className="ico-cardInput"
                        rows={4}
                        defaultValue={this.state.user.attributes.token}></textarea>
                    </label>
                  </form>
                }
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default User;
