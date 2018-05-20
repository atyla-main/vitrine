import React from 'react';
import { I18n } from 'react-i18next';

class Ico extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      ico: {},
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_APIV1_URL}icos/${this.state.id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }}).then(res => res.json())
      .then(data => {
        this.setState({ ico: data.data })
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
                { this.state.ico.id &&
                  <p className="ico-title">{this.state.ico.attributes.name}</p>
                }
              </div>
              <div className="ico-card">
                <p className="ico-cardTitle">{t("ico.informations")}</p>
                { this.state.ico.id &&
                  <form className="ico-form">
                    <label className="ico-cardLabel">
                      {t("ico.labels.name")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.ico.attributes.name} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("ico.labels.link")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.ico.attributes.link} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("ico.labels.blockchain")}
                      <input
                        className="ico-cardInput"
                        type="text"
                        defaultValue={this.state.ico.attributes.blockchain} />
                    </label>
                    <label className="ico-cardLabel">
                      {t("ico.labels.descriptionEn")}
                      <textarea
                        className="ico-cardInput"
                        rows={4}
                        defaultValue={this.state.ico.attributes.descriptionEn}></textarea>
                    </label>
                    <label className="ico-cardLabel">
                      {t("ico.labels.descriptionFr")}
                      <textarea
                        className="ico-cardInput"
                        rows={4}
                        defaultValue={this.state.ico.attributes.descriptionFr}></textarea>
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

export default Ico;
