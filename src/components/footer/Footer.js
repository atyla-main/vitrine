import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Grid className="footer-container">
          <Row className="show-grid">
            <Col sm={4} md={4}>
              <p className="footer-elementTitle">Our mission</p>
              <p>
                This is a bit of space where you expose your vision and the
                purpose of your enterprise. This is equivalent to the why part
                of a good comunication content set.
              </p>
            </Col>
            <Col sm={4} md={4}>
              <p className="footer-elementTitle">Navigate</p>
              <p>
                <a className="footer-link" href="/">
                  - Homepage
                </a>
                <a className="footer-link" href="/icos">
                  - Explore ICO’s
                </a>
                <a className="footer-link" href="/howitworks">
                  - How it works
                </a>
                <a className="footer-link" href="/about">
                  - About us
                </a>
                <a className="footer-link" href="/login">
                  - Sign-in / Sign-up
                </a>
                <a className="footer-link" href="/icos/1">
                  - Add an ICO
                </a>
              </p>
            </Col>
            <Col sm={4} md={4}>
              <p className="footer-elementTitle">Contact us</p>
              <div>
                <p>Our team is based in Paris !</p>
                <p>
                  Feel free to drop us an email at anytime:
                  <a href="mailto:contact@atyla.io"> contact@atyla.io</a>
                </p>
              </div>
            </Col>
          </Row>
          <Row className="footer-credentials">
            <p>© atyla 2018</p>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Footer;
