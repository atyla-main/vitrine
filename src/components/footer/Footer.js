import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-container">
          <div className="footer-linkContainer">
            <a className="footer-link" href="/">
              Home
            </a>
            <a className="footer-link" href="/login">
              Connexion
            </a>
            <a className="footer-link" href="/register">
              Ouvrir un compte
            </a>
          </div>
          <div className="footer-linkContainer">
            <a className="footer-link" href="/register-pro">
              Accès professionnel
            </a>
            <a className="footer-link" href="/login">
              Respect de la vie privée
            </a>
            <a className="footer-link" href="/login">
              Contact
            </a>
          </div>
        </div>
        <p className="footer-credentials">
          ©2018 - atyla       10 rue Cambon - 75001 Paris
        </p>
      </div>
    );
  }
}

export default Footer;
