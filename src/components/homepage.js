import React from 'react';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import CustomAsync from './custom-async/Custom-async';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ''
    };
    this.getIcos = this.getIcos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.gotoIco = this.gotoIco.bind(this);
  }

  getIcos(input) {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`${process.env.REACT_APP_APIV1_URL}icos?search=${input}`, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        let options = [];
        json.data.forEach(ico => {
          options.push({ value: ico.id, label: ico.attributes.name });
        });
        return { options: options };
      });
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }

  gotoIco(value, event) {
    window.location.href = `icos/${value.value}`;
  }

  render() {
    return (
      <Grid>
        <Row className="homepage-header">
          <Col sm={6}>
            <h2 className="homepage-sectionTitle">
              The easiest way to participate in ICO s
            </h2>
            <br />
            <ul>
              <li>Browse projects</li>
              <li>Pay those you stand for</li>
              <li>Get your token</li>
            </ul>
          </Col>
          <Col sm={6}>
            <div className="homepage-calculator">
              <p>Calculettes tokens</p>
              <p>Page des workflow de paiement</p>
              <Button
                bsStyle="danger"
                className="icos-button homepage-calculatorButton"
              >
                Buy now
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="homepage-searchBar">
          <CustomAsync
            value={this.state.value}
            onChange={this.onChange}
            className="homepage-searchInput"
            loadOptions={this.getIcos}
            onValueClick={this.gotoIco}
            placeholder="Search for an Ico…"
          />
        </Row>
        <Row className="homepage-section">
          <h2 className="homepage-sectionTitle">Advantages</h2>
          <Grid className="homepage-advantages">
            <Row className="homepage-advantagesRow">
              <Col sm={4}>
                <p>1. Simple</p>
                <ul>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                </ul>
              </Col>
              <Col sm={4}>
                <p>1. Compte unique</p>
                <ul>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                </ul>
              </Col>
              <Col sm={4}>
                <p>1. Anti-scam</p>
                <ul>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                  <li>Xxxx</li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </Row>
        <Row className="homepage-section">
          <h2 className="homepage-sectionTitle">Presentation du produit</h2>
          <div className="homepage-product">
            <p>1. Teasing: How it works</p>
            <p>2. Teasing: About us</p>
          </div>
        </Row>
        <Row className="homepage-section">
          <h2 className="homepage-sectionTitle">Social proof</h2>
        </Row>
        <Row className="homepage-section mod-last">
          <Col sm={6}>
            <h2>KPIS</h2>
          </Col>
          <Col sm={6}>
            <h2>Twitter field</h2>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
