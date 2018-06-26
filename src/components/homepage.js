import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import Emlyon from '../img/emlyon.jpg';
import TheFamily from '../img/the_family.jpeg';
import Ey from '../img/ey.jpeg';
import Newsletter from '../components/newsletter/Newsletter';

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
      <div>
        <Grid className="homepage">
          <Row className="homepage-header homepage-rowOverride">
            <div className="homepage-buySection">
              <p className="homepage-buySectionTitle mod-firstLine">
                L’achat de tokens{' '}
              </p>
              <p className="homepage-buySectionTitle mod-secondLine">
                <span className="homepage-buySectionTitleText">simple</span> et{' '}
                <span className="homepage-buySectionTitleText">sécurisé</span>
              </p>
              <a href="/login">
                <div className="homepage-atylaDiv" id="atylaDiv" />
              </a>
              <p className="homepage-buySectionFootText">
                Vous êtes un entrepreneur?{' '}
                <a href="/register-pro" className="homepage-openProLinkWhite">
                  Ouvrir un compte professionnel
                </a>
              </p>
            </div>
          </Row>
          <Row className="homepage-sectionPresentation homepage-rowOverride">
            <p className="homepage-sectionInvestTitle">
              atyla: la solution la plus{' '}
              <span className="homepage-buySectionTitleText">simple</span> et{' '}
              <span className="homepage-buySectionTitleText">sécurisée</span>{' '}
              pour investir dans les ICOs
            </p>
            <Grid className="homepage-buySection">
              <Row className="homepage-advantagesRow homepage-rowOverride homepage-sectionSimpleAndSecure">
                <Col className="homepage-advantagesSection" sm={4}>
                  <i className="fa fa-check-square-o homepage-sectionPresentationIcons" />
                  <p className="homepage-sectionInvestFooterTitle">
                    Simplicité
                  </p>
                  <p className="homepage-sectionInvestFooterText">
                    Vos achats de tokens en 1 seul clic et sans pré-requis
                    techniques
                  </p>
                </Col>
                <Col className="homepage-advantagesSection" sm={4}>
                  <i className="fa fa-key homepage-sectionPresentationIcons" />
                  <p className="homepage-sectionInvestFooterTitle">
                    Tiers de confiance
                  </p>
                  <p className="homepage-sectionInvestFooterText">
                    Vos investissements 100% sécurisés et intégralement gérés
                    par atyla
                  </p>
                </Col>
                <Col
                  className="homepage-advantagesSection"
                  id="solution"
                  sm={4}
                >
                  <i className="fa fa-thumbs-o-up homepage-sectionPresentationIcons" />
                  <p className="homepage-sectionInvestFooterTitle">
                    Accessibilité
                  </p>
                  <p className="homepage-sectionInvestFooterText">
                    Votre accès à l’ensemble des ICOs vérifiées du moment
                  </p>
                </Col>
              </Row>
            </Grid>
          </Row>
          <Row className="homepage-sectionExperience homepage-rowOverride">
            <p className="homepage-sectionExperienceTitle mod-underline">
              L’expérience atyla en{' '}
              <span className="homepage-buySectionTitleText">trois étapes</span>
            </p>
            <div className="homepage-sectionExperienceSwitcher">
              <button onClick={this.onClientClick} className={clientClases}>
                Particulier
              </button>
              <button onClick={this.onProClick} className={proClases}>
                Professionnel
              </button>
            </div>
            <div id="experience" />
            <Grid className="homepage-buySection">
              {isClient ? (
                <Row className="homepage-sectionExperienceFooter homepage-rowOverride">
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
                      <div className="homepage-switcherSection">
                        <p className="homepage-switcherSectionTitle">
                          Dans quelle ICO souhaitez vous invesitr ?
                        </p>
                        <div>
                          <input
                            className="homepage-switcherSectionSearch"
                            placeholder="EOS"
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
                          <i className="fa fa-exchange homepage-switcherSectionExhangeIcon" />
                          <input
                            className="homepage-switcherSectionCoinInput"
                            placeholder="0.00"
                          />
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
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">1</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Inscrivez l’ICO de votre choix
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Indiquez le montant de l’investissement
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Nous calculons le nombre de tokens équivalent
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
                      <div className="homepage-switcherSection">
                        <p className="homepage-switcherSectionBrand">atyla</p>
                        <p className="homepage-switcherSectionTitle">
                          Enregistrez un moyen de paiement
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
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">2</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Choix du moyen de paiement
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Prélèvement ou virement bancaire
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Virement en cryptoactif
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
                      <div className="homepage-switcherSection">
                        <p className="homepage-switcherSectionBrand">atyla</p>
                        <p className="homepage-switcherSectionTitle no-margin">
                          <span className="homepage-buySectionTitleText">
                            Félicitations !
                          </span>
                        </p>
                        <p className="homepage-switcherSectionSubTitle">
                          Votre investissement dans l’ICO EOS est validé
                        </p>
                        <p className="homepage-switcherSectionFooterText">
                          atyla reviens vers vous rapidement pour l’émission de
                          Token
                        </p>
                      </div>
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">3</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Validez votre investissement
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            atyla s’occupe du reste !
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Réception des tokens après KYC
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row className="homepage-sectionExperienceFooter homepage-rowOverride">
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
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
                          Créez un compte professionel
                        </button>
                      </div>
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">1</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Créez un compte professionnel
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Vous êtes un entrepreneur ?
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            <a
                              href="/register-pro"
                              className="homepage-openProLink"
                            >
                              Ouvrir un compte professionnel
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
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
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">2</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Un conseiller va vous recontacter
                          </p>
                          <p className="home-switcherFooter mod-normargin">
                            Une procédure de validation de votre ICO se tiendra
                            pour pouvoir ajouter notre bouton
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} className=" homepage-rowOverrideCol">
                    <div className="homepage-cardAndFooterSection">
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
                      <div className="homepage-sectionExperienceFooter mod-bottom">
                        <div className="homepage-cicle">
                          <span className="homepage-circleNumber">3</span>
                        </div>
                        <div>
                          <p className="home-switcherFooterLegend">
                            Intégrez notre bouton sur votre site
                          </p>
                          <p className="home-switcherFooter mod-nomargin">
                            Rajoutez en quelques minutes notre div à l’endroit
                            où vous souhaitez la positionner et notre tag
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Grid>
          </Row>
          <Row className="homepage-sectionTechno homepage-rowOverride">
            <p className="homepage-sectionTechnoTitle">
              Avec atyla, entrez dans une nouvelle ère technologique
            </p>
            <Grid className="homepage-buySection">
              <Row
                id="ecosystem"
                className="homepage-advantagesRow homepage-rowOverride homepage-sectionSimpleAndSecure"
              >
                <Col sm={4}>
                  <p className="homepage-sectionTechnoSectionTitle">
                    Entrez dans la Token economy
                  </p>
                  <p className="homepage-sectionTechnoSectionText">
                    atyla vous permet d’acheter des tokens de la manière la plus
                    simple possible. Vous devenez ainsi acteur d’un écosystème
                    ou les règles de l’économie numériques sont bouleversées au
                    profit d’un nouveau paradigme fondé sur la désintermédiation
                  </p>
                </Col>
                <Col sm={4}>
                  <p className="homepage-sectionTechnoSectionTitle">
                    Soutenez les projets blockchain de demain
                  </p>
                  <p className="homepage-sectionTechnoSectionText">
                    atyla vous facilite l’accès aux ICOs grâce à sa solution
                    d’achat rapide et sécurisée. Il paraît aujourd’hui de
                    soutenir ces technologies de rupture en faisant passer des
                    projets du stade expérimental à l’industrialisation de
                    solutions compétitives.
                  </p>
                </Col>
                <Col sm={4}>
                  <p className="homepage-sectionTechnoSectionTitle">
                    Investissez dans les ICOs de votre choix
                  </p>
                  <p className="homepage-sectionTechnoSectionText">
                    atyla peut vous accompagner dans n’importe quelle ICO. La
                    fiabilité des projets est analysée selon des critères bien
                    définis. Investissez sereinement dans la Token economy dans
                    des projets répertoriés et vérifiés par nos équipes.
                  </p>
                </Col>
              </Row>
            </Grid>
          </Row>
          <Row className="homepage-sectionPartner homepage-rowOverride">
            <p id="love" className="homepage-sectionPartnerTitle">
              Ils nous aiment
            </p>
            <Grid className="homepage-buySection">
              <Row className="homepage-loveLogos homepage-rowOverride">
                <Col className="homepage-rowOverrideCol" sm={4}>
                  <img
                    className="homepage-loveLogo mod-ey"
                    alt={'Ey'}
                    src={Ey}
                  />
                </Col>
                <Col className="homepage-rowOverrideCol" sm={4}>
                  <img
                    className="homepage-loveLogo"
                    alt={'The Family'}
                    src={TheFamily}
                  />
                </Col>
                <Col className="homepage-rowOverrideCol" sm={4}>
                  <img
                    className="homepage-loveLogo"
                    alt={'Em lyon'}
                    src={Emlyon}
                  />
                </Col>
              </Row>
            </Grid>
          </Row>
        </Grid>
        <Newsletter />
      </div>
    );
  }
}

export default HomePage;
