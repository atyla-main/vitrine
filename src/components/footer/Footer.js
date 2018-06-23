import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-container">
          <a className="footer-link" href="/">
            Connexion
          </a>
          <a className="footer-link" href="/icos">
            Ouvrir un compte
          </a>
          <a className="footer-link" href="/howitworks">
            Accès professionnel
          </a>
          <a className="footer-link" href="/about">
            Respect de la vie privée
          </a>
          <a className="footer-link" href="/login">
            A propos
          </a>
          <a className="footer-link" href="/icos/1">
            Contact
          </a>
        </div>
        <p className="footer-credentials">©2018 - atyla</p>
      </div>
    );
  }
}

export default Footer;
