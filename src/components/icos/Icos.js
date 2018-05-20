import React from 'react';
import { Button } from 'react-bootstrap';
import { I18n } from 'react-i18next';

class Icos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icos: [],
    }
  }

  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_APIV1_URL}icos`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }}).then(res => res.json())
      .then(data => {
        this.setState({ icos: data })
      })
      .catch(err => {
        window.location.href = '/';
      });
  }

  render()  {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="icos">
              <div className="icos-cards">
                {this.state.icos.data && this.state.icos.data.map(ico => {
                  return (
                    <div key={ico.id} className="icos-card">
                      <div className="icos-cardHeader">
                        {ico.attributes.name}
                      </div>
                      <div className="icos-cardContent">
                        <p className="icos-cardContentText">{ico.attributes.descriptionEn}</p>
                        <a>{ico.attributes.link}</a>
                      </div>
                      <div className="icos-cardFooter">
                        <Button
                          className='icos-cardButton'
                          bsStyle='success'
                          type='submit'>
                          More info
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default Icos;