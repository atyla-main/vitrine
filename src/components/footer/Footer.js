import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-container">
          <div className="footer-linkContainer">
            <a className="footer-link" href="/login">
              Connexion
            </a>
            <a className="footer-link" href="/register">
              Ouvrir un compte
            </a>
            <a className="footer-link" href="/register-pro">
              Accès professionnel
            </a>
          </div>
          <div className="footer-linkContainer">
            <a className="footer-link" href="#">
              Respect de la vie privée
            </a>
            <a className="footer-link" href="#">
              A propos
            </a>
            <a className="footer-link" href="#">
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
