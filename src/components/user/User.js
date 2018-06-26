import React from 'react';
import { I18n } from 'react-i18next';
import Auth from '../../services/Auth';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      user: {}
    };
  }

  componentDidMount() {
    if (this.state.id !== Auth.getId()) {
      window.location.href = '/';
      return;
    }

    fetch(`${process.env.REACT_APP_APIV1_URL}api/users/${this.state.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `JWT ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ user: data.data });
      })
      .catch(err => {
        window.location.href = '/';
      });
  }

  render() {
    return (
      <I18n ns="translations">
        {(t, { i18n }) => (
          <div className="user">
            <div className="user-headerBar">
              <div className="user-title">
                <div className="user-titleTriangle" />
                {this.state.user.id && (
                  <p>Bonjour {this.state.user.attributes.firstName}</p>
                )}
              </div>
            </div>
            <div className="user-section">
              <div className="user-switcherSection">
                <p className="user-switcherSectionTitle">
                  Nouvel acteur de la Token Economy?
                </p>
                <div>
                  <input
                    className="user-switcherSectionSearch"
                    placeholder="Nom do token"
                  />
                  <i className="fa fa-check user-switcherSectionValidate" />
                  <div className="user-switcherSectionValidateLegend">
                    <p className="user-switcherSectionAtylaValid">
                      Validé par atyla
                    </p>
                    <p className="user-switcherSectionAtylaValid mod-bottom">
                      En savoir plus
                    </p>
                  </div>
                </div>
                <div className="user-switcherSectionCalc">
                  <div className="user-switcherSectionInput">
                    <input
                      className="user-switcherSectionCoinInput"
                      placeholder="0.00"
                    />
                    <span className="user-switcherSectionCrypto">EUR</span>
                  </div>
                  <i className="fa fa-exchange user-switcherSectionExhangeIcon" />
                  <div className="user-switcherSectionInput">
                    <input
                      className="user-switcherSectionCoinInput"
                      placeholder="0.00"
                    />
                    <span className="user-switcherSectionCrypto">ETH</span>
                  </div>
                </div>
                <button className="user-switcherAtylaButton">
                  <span className="user-switcherAtylaButtonContent">
                    <span className="user-switcherAtylaButtonBrand">atyla</span>
                    <span className="user-switcherAtylaButtonText">
                      Achetez maintenant
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

export default User;
