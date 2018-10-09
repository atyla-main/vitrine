import React, { Component } from 'react';
// eslint-disable-next-line
import Home from '../../home.css';
import Logo from '../../img/atyla-design-v1/logo.png';
import HommeDessin from '../../img/atyla-design-v1/home_dessin.png';
import NuageGauche from '../../img/atyla-design-v1/nuage_gauche.png';
import NuageDroite from '../../img/atyla-design-v1/nuage_droite.png';
import DessinThree from '../../img/atyla-design-v1/3_dessin.png';
import CompletTwo from '../../img/atyla-design-v1/2_complet.png';
import DessinOneOne from '../../img/atyla-design-v1/1_1_dessin.png';
import DessinOneTwo from '../../img/atyla-design-v1/1_2_dessin.png';
import DessinOneThree from '../../img/atyla-design-v1/1_3_dessin.png';
import FooterFb from '../../img/atyla-design-v1/footer_fb.png';
import FooterLn from '../../img/atyla-design-v1/footer_ln.png';
import FooterTw from '../../img/atyla-design-v1/footer_tw.png';
import OneOneIcon from '../../img/atyla-design-v1/1_1_icone.png';
import OneTwoIcon from '../../img/atyla-design-v1/1_2_icone.png';
import OneThreeIcon from '../../img/atyla-design-v1/1_3_icone.png';
import ThreeIcon from '../../img/atyla-design-v1/3_icone.png';
import LogoBlanc from '../../img/atyla-design-v1/logo_blanc.png';

class InProgress extends Component {
  render() {
    return (
      <div>
        <div className={'homeAtyla-body'}>
          <header className={'homeAtyla-header'}>
            <a className="homeAtyla-a">
              <img src={Logo} alt="logo" className="logo" />
            </a>
          </header>

          <div id="part0">
            <div className="titre-main">
              <br />
              <br />
              Atyla est en cours de{' '}
              <span style={{ color: '#3d25c8' }}>construction</span>
              <br />
              <br />
              <br />
            </div>
            <img src={HommeDessin} alt="home-dessin" className="home-dessin" />
            <img src={NuageGauche} alt="nuage-dessin" id="nuage-0-1" />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-0-2" />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-0-3" />
          </div>
        </div>
      </div>
    );
  }
}

export default InProgress;
