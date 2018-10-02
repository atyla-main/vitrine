import React, { Component } from 'react';
import Home from '../../home.css';
import AtylaLogo from '../../img/Logo1_Blanc.png';
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
        <body className={'homeAtyla-body'}>
          <header className={'homeAtyla-header'}>
            <a href="#" className="homeAtyla-a">
              <img src={Logo} alt="logo" className="logo" />
            </a>
            <a className="homeAtyla-a" href="./register">
              <button className="inscription homeAtyla-button">
                M INSCRIRE
              </button>
            </a>
            <a className="homeAtyla-a" href="./login">
              <button className="connexion homeAtyla-button">
                ME CONNECTER
              </button>
            </a>
          </header>

          <div id="part0">
            <div className="titre-main">
              La solution <span className="gras">simple</span> et{' '}
              <span className="gras">intuitive</span> <br />pour créer vos
              <span className="rw-words rw-words-1">
                <span>mandats de vente</span>
                <span>compromis de vente</span>
                <span>mandats de gestion</span>
                <span>contrats de location</span>
                <span>baux commerciaux</span>
              </span>
              <br />
              <br />
              <a href="./register" className="homeAtyla-a">
                <button className="cta-main homeAtyla-button">
                  Créez votre contrat
                </button>
              </a>
            </div>
            <img src={HommeDessin} alt="home-dessin" className="home-dessin" />
            <img src={NuageGauche} alt="nuage-dessin" id="nuage-0-1" />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-0-2" />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-0-3" />
          </div>

          <div id="part1">
            <div className="titre-partie" id="1">
              Gérez vos contrats en <span className="gras">quelques clics</span>
            </div>
            <div className="souligne" />

            <img
              src={DessinThree}
              alt="Screenshot"
              className="dessin_3"
              id="d-3"
            />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-3-1" />
            <img src={NuageDroite} alt="nuage-dessin" id="nuage-3-2" />

            <div className="partie-3">
              <img src={ThreeIcon} alt="icone 3" className="icone_3" id="i-3" />
              <br />

              <div className="titre-bas" id="t-3-1">
                Gestion <span className="blue">complète</span>
              </div>
              <p id="p-3-1">de vos processus administratifs</p>

              <div className="titre-bas" id="t-3-2">
                <span className="blue">100%</span> fiable
              </div>
              <p id="p-3-2">grâce à nos formulaires pré-remplis</p>

              <div className="titre-bas" id="t-3-3">
                <span className="blue">100%</span> connecté
              </div>
              <p id="p-3-3">à l ensemble de vos logiciels</p>

              <div className="titre-bas" id="t-3-4">
                <span className="blue">2x</span> moins de temps
              </div>
              <p id="p-3-4">dans la génération de vos contrats</p>

              <div className="titre-bas" id="t-3-5">
                Conformité loi <span className="blue">Alur</span>
              </div>
              <p id="p-3-5">de vos documents juridiques</p>
            </div>

            <div id="part2">
              <div className="titre-partie" id="2">
                Simplifiez vos <span className="gras">tâches quotidiennes</span>
              </div>
              <div className="souligne" />

              <div className="partie-2">
                <img
                  src={CompletTwo}
                  alt="dessin 2"
                  className="dessin_2"
                  id="d-2"
                />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-2-1-1" />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-2-1-2" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-2-2-1" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-2-2-2" />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-2-3-1" />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-2-3-2" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-2-4-1" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-2-4-2" />

                <div className="sous-partie-2" id="part2-1">
                  <div className="numero" id="n-2-1">
                    1
                  </div>
                  <div className="titre-sous-partie2">
                    Remplissez le formulaire
                  </div>
                  <p id="p-2-1" className="homeAtyla-textField">
                    Un contrat numérique <br />rempli en moins de 5 minutes
                  </p>
                </div>

                <div className="sous-partie-2" id="part2-2">
                  <div className="numero" id="n-2-2">
                    2
                  </div>
                  <div className="titre-sous-partie2">
                    Téléchargez le en PDF
                  </div>
                  <p id="p-2-2" className="homeAtyla-textField">
                    Un PDF personnalisé <br />selon vos besoins
                  </p>
                </div>

                <div className="sous-partie-2" id="part2-3">
                  <div className="numero" id="n-2-3">
                    3
                  </div>
                  <div className="titre-sous-partie2">
                    Signez électroniquement
                  </div>
                  <p id="p-2-3" className="homeAtyla-textField">
                    Courrier recommandé ou signature <br />électronique légal et
                    sécurisé
                  </p>
                </div>

                <div className="sous-partie-2" id="part2-4">
                  <div className="numero" id="n-2-4">
                    4
                  </div>
                  <div className="titre-sous-partie2">Gérez tout en ligne</div>
                  <p id="p-2-4" className="homeAtyla-textField">
                    Une gestion 100% digitale <br />sans contrainte
                    administrative
                  </p>
                </div>
              </div>
            </div>

            <div id="part3">
              <div className="titre-partie" id="3">
                Concentrez-vous sur <span className="gras">l essentiel</span>
              </div>
              <div className="souligne" />

              <div className="sous-partie-1" id="part1-1">
                <img
                  src={DessinOneOne}
                  alt="dessin 1_1"
                  className="dessin_1"
                  id="d-1-1"
                />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-1-1-1" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-1-1-2" />
                <img
                  src={OneOneIcon}
                  alt="icone 1_1"
                  className="icon_1"
                  id="i-1-1"
                />
                <div className="titre-sous-partie" id="t-1-1">
                  Gagnez du temps dans <br />la gestion de vos contrats
                </div>
                <p id="p-1-1" className="homeAtyla-textField">
                  Générez un contrat immobilier automatiquement <br />via un
                  formulaire pré-rempli, simple et intuitif
                </p>
                <a href="./register" className="homeAtyla-a">
                  <button className="cta-savoir homeAtyla-button" id="cta-1-1">
                    En savoir plus sur atyla
                  </button>
                </a>
              </div>

              <div className="sous-partie-1" id="part1-2">
                <img
                  src={DessinOneTwo}
                  alt="dessin 1_2"
                  className="dessin_1"
                  id="d-1-2"
                />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-1-2-1" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-1-2-2" />
                <img
                  src={OneTwoIcon}
                  alt="icone 1_2"
                  className="icon_1"
                  id="i-1-2"
                />
                <div className="titre-sous-partie" id="t-1-2">
                  Simplifiez votre <br />processus de vente
                </div>
                <p id="p-1-2" className="homeAtyla-textField">
                  Débarassez-vous de vos contraintes <br />administratives en
                  gérant tout en ligne
                </p>
                <a href="./register" className="homeAtyla-a">
                  <button className="cta-savoir homeAtyla-button" id="cta-1-2">
                    En savoir plus sur atyla
                  </button>
                </a>
              </div>

              <div className="sous-partie-1" id="part1-3">
                <img
                  src={DessinOneThree}
                  alt="dessin 1_1"
                  className="dessin_1"
                  id="d-1-3"
                />
                <img src={NuageGauche} alt="nuage-dessin" id="nuage-1-3-1" />
                <img src={NuageDroite} alt="nuage-dessin" id="nuage-1-3-2" />
                <img
                  src={OneThreeIcon}
                  alt="icone 1_1"
                  className="icon_1"
                  id="i-1-3"
                />
                <div className="titre-sous-partie" id="t-1-3">
                  Adaptez la solution en <br />fonction de vos besoins
                </div>
                <p id="p-1-3" className="homeAtyla-textField">
                  Personnalisez l outil sur-mesure en <br />paramétrant vos
                  préférences d utilisation
                </p>
                <a href="./register" className="homeAtyla-a">
                  <button className="cta-savoir homeAtyla-button" id="cta-1-3">
                    En savoir plus sur atyla
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div id="part4">
            <a href="./register" className="homeAtyla-a">
              <button className="homeAtyla-button cta-experience " id="cta-4">
                Commencez avec atyla
              </button>
            </a>
            <div className="titre-bas2">Vivez une nouvelle expérience</div>
            <br />
            <p className="homeAtyla-textField">
              Vous utilisez déjà atyla ?{' '}
              <a href="./login" className="homeAtyla-a">
                Connectez-vous
              </a>
            </p>
          </div>

          <footer className="homeAtyla-footer">
            <a href="" className="homeAtyla-a">
              <img src={LogoBlanc} alt="logo" className="footer_logo" />
            </a>

            <div id="footer-1">
              <h6>Découvrez atyla</h6>
              <a href="./about" className="homeAtyla-a">
                À propos
              </a>
              <br />
              <a href="./team" className="homeAtyla-a">
                Équipe
              </a>
              <br />
              <a href="./terms" className="homeAtyla-a">
                Mentions légales
              </a>
            </div>

            <div id="footer-3">
              <img
                src={FooterFb}
                alt="Lien vers Facebook"
                className="footer_reseaux"
              />
              <img
                src={FooterLn}
                alt="Lien vers Linkedin"
                className="footer_reseaux"
              />
              <img
                src={FooterTw}
                alt="Lien vers Twitter"
                className="footer_reseaux"
              />
            </div>

            <div id="footer-2">
              <h6>Contactez-nous</h6>
              10 rue Cambon <br />
              75001 Paris <br />
              <a
                href="mailto:contact@atyla.io"
                target="_blank"
                className="homeAtyla-a"
              >
                contact@atyla.io
              </a>
            </div>
          </footer>

          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js.hs-scripts.com/4866139.js"
          />
        </body>
      </div>
    );
  }
}

export default InProgress;
