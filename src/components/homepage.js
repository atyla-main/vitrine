import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import Emlyon from '../img/emlyon.png';
import TheFamily from '../img/the_family.png';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
      isClient: true
    };
    this.getIcos = this.getIcos.bind(this);
    this.onChange = this.onChange.bind(this);
    this.gotoIco = this.gotoIco.bind(this);
    this.onClientClick = this.onClientClick.bind(this);
    this.onProClick = this.onProClick.bind(this);
  }

  componentDidMount() {
    let script = document.createElement('script');

    script.src = `${process.env.REACT_APP_EXTERNAL_URL}javascripts/atyla.js`;
    script.async = true;

    document.body.appendChild(script);
  }

  onClientClick() {
    this.setState({
      isClient: true
    });
  }

  onProClick() {
    this.setState({
      isClient: false
    });
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
    let isClient = this.state.isClient;
    let proClases = isClient
      ? 'homepage-sectionExperienceButton'
      : 'homepage-sectionExperienceButtonActive';
    let clientClases = isClient
      ? 'homepage-sectionExperienceButtonActive'
      : 'homepage-sectionExperienceButton';

    return (
      <Grid className="homepage">
        <Row className="homepage-header">
          <div className="homepage-buySection">
            <p className="homepage-buySectionTitle">
              L’achat de token{' '}
              <span className="homepage-buySectionTitleText">simple</span> et{' '}
              <span className="homepage-buySectionTitleText">sécurisée</span>
            </p>
            <div id="atylaDiv" />
            <p className="homepage-buySectionFootText">
              Vous êtes un entrepreneur? Ouvrir un compte professionnel
            </p>
          </div>
        </Row>
        <Row className="homepage-sectionPresentation">
          <p className="homepage-sectionInvestTitle">
            atyla: la solution de paiement la plus{' '}
            <span className="homepage-buySectionTitleText">simple</span> et{' '}
            <span className="homepage-buySectionTitleText">sécurisée</span> pour
            investir dans les ICOs
          </p>
          <Grid className="homepage-buySection">
            <Row className="homepage-advantagesRow">
              <Col sm={4}>
                <i className="fa fa-check-square-o homepage-sectionPresentationIcons" />
                <p className="homepage-sectionInvestFooterTitle">Simplicité</p>
                <p className="homepage-sectionInvestFooterText">
                  Investissez en 1 clic dans l’ICO de votre choix sans
                  pré-requis techniques
                </p>
              </Col>
              <Col sm={4}>
                <i className="fa fa-key homepage-sectionPresentationIcons" />
                <p className="homepage-sectionInvestFooterTitle">
                  Tiers de confiance
                </p>
                <p className="homepage-sectionInvestFooterText">
                  Vos investissements sont 100% sécurisés et intégralement gérés
                  par atyla
                </p>
              </Col>
              <Col sm={4}>
                <i className="fa fa-thumbs-o-up homepage-sectionPresentationIcons" />
                <p className="homepage-sectionInvestFooterTitle">
                  Accessibilité
                </p>
                <p className="homepage-sectionInvestFooterText">
                  Vous avez accès à l’ensemble des ICOs vérifiées du moment
                </p>
              </Col>
            </Row>
          </Grid>
        </Row>
        <Row className="homepage-sectionExperience">
          <p className="homepage-sectionExperienceTitle">
            L’expérience atyla en{' '}
            <span className="homepage-buySectionTitleText">trois étapes</span>
          </p>
          <div className="homepage-sectionExperienceSwitcher">
            <button onClick={this.onClientClick} className={clientClases}>
              Particulier
            </button>
            <button onClick={this.onProClick} className={proClases}>
              Entrepreneur
            </button>
          </div>
          {isClient ? (
            <Grid className="homepage-buySection">
              <Row
                className="homepage-sectionExperienceFooter"
                style={{ height: '300px' }}
              >
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionTitle">
                      Nouvel acteur de la Token Economy?
                    </p>
                    <div>
                      <input
                        className="homepage-switcherSectionSearch"
                        placeholder="Dans quelle ICO souhaitez-vous investir?"
                      />
                      <i className="fa fa-check homepage-switcherSectionValidate" />
                      <span className="homepage-switcherSectionAtylaValid">
                        Validé par atyla
                      </span>
                    </div>
                    <div>
                      <input
                        className="homepage-switcherSectionCoinInput"
                        placeholder="0.00"
                      />
                      <span className="homepage-switcherSectionBuyMax">
                        EUR
                      </span>
                      <i className="fa fa-exchange homepage-switcherSectionExhangeIcon" />
                      <input
                        className="homepage-switcherSectionCoinInput"
                        placeholder="0.00"
                      />
                      <span className="homepage-switcherSectionCrypto">
                        ETH
                      </span>
                    </div>
                    <button className="homepage-switcherAtylaButton">
                      <span className="homepage-switcherAtylaButtonContent">
                        <span className="homepage-switcherAtylaButtonBrand">
                          atyla
                        </span>
                        <span className="homepage-switcherAtylaButtonText">
                          Achetez maintenant
                        </span>
                      </span>
                    </button>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionBrand">atyla</p>
                    <p className="homepage-switcherSectionTitle">
                      Enregistrer un moyen de paiement
                    </p>
                    <div className="homepage-switcherSectionBrandLogoContainer">
                      <div className="homepage-switcherSectionBrandLogoBox">
                        <i className="fa fa-university homepage-switcherSectionBrandLogo" />
                      </div>
                      <div className="homepage-switcherSectionBrandLogoBox">
                        <i className="fa fa-credit-card homepage-switcherSectionBrandLogo" />
                      </div>
                      <div className="homepage-switcherSectionBrandLogoBox last">
                        <i className="fa fa-btc homepage-switcherSectionBrandLogo" />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionBrand">atyla</p>
                    <p className="homepage-switcherSectionTitle no-margin">
                      <span className="homepage-buySectionTitleText">
                        Félicitation!
                      </span>
                    </p>
                    <p className="homepage-switcherSectionSubTitle">
                      Votre investissement dans l’ICO ’’atyla’’ est validé
                    </p>
                    <p className="homepage-switcherSectionFooterText">
                      atyla reviens vers vous rapidement pour l’émission de
                      Token
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="homepage-sectionExperienceFooter">
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">1</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Inscrivez l’ICO de votre choix Indiquez le montant de
                        l’investissement
                      </p>
                      <p className="home-switcherFooter">
                        Nous calculons le montant de tokens que vous recevrez
                      </p>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">2</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Enregistrez de manière sécurisée votre moyen de paiement
                      </p>
                      <p className="home-switcherFooter">
                        - Prélèvement automatique
                      </p>
                      <p className="home-switcherFooter">- Virement bancaire</p>
                      <p className="home-switcherFooter">
                        - Virement en cryptoactif
                      </p>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">3</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Validez votre investissement, atyla s’occupe du reste !
                      </p>
                      <p className="home-switcherFooter">
                        Nous vous remettrons les tokens sur notre plateforme
                        après la validation de votre KYC
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          ) : (
            <Grid className="homepage-buySection">
              <Row
                className="homepage-sectionExperienceFooter"
                style={{ height: '300px' }}
              >
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionBrand">atyla</p>
                    <p>
                      <input
                        className="homepage-switcherSectionCoinInput mod-alone"
                        placeholder="Adresse email"
                      />
                    </p>
                    <p>
                      <input
                        className="homepage-switcherSectionCoinInput mod-alone"
                        placeholder="Mot de passe"
                      />
                    </p>
                    <button className="homepage-switcherProCreateButton">
                      Créer un compte professionel
                    </button>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionBrand">atyla</p>
                    <div className="homepage-switcherSectionValidationLogoContainer">
                      <i className="fa fa-phone homepage-switcherSectionBrandLogo mod-margin" />
                      <i className="fa fa-long-arrow-right homepage-switcherSectionBrandLogo mod-margin" />
                      <i className="fa fa-hourglass-start homepage-switcherSectionBrandLogo mod-margin" />
                      <i className="fa fa-long-arrow-right homepage-switcherSectionBrandLogo mod-margin" />
                      <i className="fa fa-check-circle-o homepage-switcherSectionBrandLogo" />
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-switcherSection">
                    <p className="homepage-switcherSectionBrand">atyla</p>
                    <textarea cols={40} rows={5}>
                      &lt;script
                      src="http://cdn.atyla.io/javascripts/atyla.js"&gt;&lt;/script&gt;
                      &lt;div id="atylaDiv" /&gt;
                    </textarea>
                    <button className="homepage-switcherProCreateButton">
                      Copier
                    </button>
                  </div>
                </Col>
              </Row>
              <Row className="homepage-sectionExperienceFooter">
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">1</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Créer un compte professionnel
                      </p>
                      <p className="home-switcherFooter">
                        Vous êtes un entrepreneur?
                        Ouvrir un compte professionnel
                      </p>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">2</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Un conseiller vous recontacte dans la journée
                      </p>
                      <p className="home-switcherFooter">
                        Une procédure de validation de votre ICO se tiendra pour
                        pouvoir ajouter notre bouton
                      </p>
                    </div>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="homepage-sectionExperienceFooter">
                    <div className="homepage-cicle">
                      <span className="homepage-cicleNumber">3</span>
                    </div>
                    <div>
                      <p className="home-switcherFooterLegend">
                        Intégrez le bouton atyla sur votre site en moins d’1
                        heure
                      </p>
                      <p className="home-switcherFooter">
                        Rajoutez notre div à l’endroit où vous souhaitez la
                        positionner et notre tag
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          )}
        </Row>
        <Row className="homepage-sectionTechno">
          <p className="homepage-sectionTechnoTitle">
            Avec atyla, entrez dans une nouvelle ère technologique
          </p>
          <Grid className="homepage-buySection">
            <Row className="homepage-advantagesRow">
              <Col sm={4}>
                <p className="homepage-sectionTechnoSectionTitle">
                  Faites vos premiers pas dans la Token economy
                </p>
                <p className="homepage-sectionTechnoSectionText">
                  atyla vous permet d’acheter des tokens de la manière la plus
                  simple possible. Vous devenez ainsi acteur d’un écosystème ou
                  les règles de l’économie numériques sont bouleversées au
                  profit d’un nouveau paradigme fondé sur la désintermédiation.
                </p>
              </Col>
              <Col sm={4}>
                <p className="homepage-sectionTechnoSectionTitle">
                  Soutenez les projets blockchain de demain
                </p>
                <p className="homepage-sectionTechnoSectionText">
                  atyla vous facilite l’accès aux ICOs grâce à sa solution
                  d’achat rapide et sécurisée. Il paraît aujourd’hui de soutenir
                  ces technologies de rupture en faisant passer des projets du
                  stade expérimental à l’industrialisation de solutions
                  compétitives.
                </p>
              </Col>
              <Col sm={4}>
                <p className="homepage-sectionTechnoSectionTitle">
                  Investissez dans l’ensemble des ICOs de votre choix
                </p>
                <p className="homepage-sectionTechnoSectionText">
                  atyla peut vous accompagnez dans n’importe quelle ICO. Plus
                  encore, on vérifie pour vous, selon des critères bien définis,
                  la fiabilité du projet. atyla vous permet ainsi d’investir
                  sereinement dans la Token economy auprès de projets
                  répertoriés et vérifiés par nos équipes.
                </p>
              </Col>
            </Row>
          </Grid>
        </Row>
        <Row className="homepage-sectionPartner">
          <p className="homepage-sectionPartnerTitle">Ils nous aiment</p>
          <div className="homepage-sectionPartnerLogos">
            <img
              alt={'Em lyon'}
              className="homepage-sectionPartnerLogo"
              src={Emlyon}
            />
            <img alt={'The Family'} src={TheFamily} />
          </div>
        </Row>
      </Grid>
    );
  }
}

export default HomePage;
