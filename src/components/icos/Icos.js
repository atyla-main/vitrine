import React from 'react';
import { Button } from 'react-bootstrap';
import i18n from '../../services/i18n';
import { I18n } from 'react-i18next';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTI2MzM5NzE3LCJleHAiOjE1MjYzNDMzMTd9.BcjDptv6OUQPAx-KgRcFAEjrdaqBDp8IBMfxn2fOPt0'

class Icos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icos: [],
    }
  }

  async componentDidMount() {
    await fetch(`${process.env.REACT_APP_APIV1_URL}api/icos`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `JWT ${token}`
      }}).then(res => res.json())
      .then(data => {
        this.setState({ icos: data })
      })
  }

  render()  {
    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="icos">
              <div className="icos-cards">
                {this.state.icos.data.map(ico => {
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