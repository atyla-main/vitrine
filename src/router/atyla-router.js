import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import NotFound from '../components/not-found/not-found';
import HomePage from '../components/homepage';
import Login from '../components/login/Login';
import Icos from '../components/icos/Icos';
import Ico from '../components/ico/Ico';
import Auth from '../services/Auth';
import User from '../components/user/User';
import HowItWorks from '../components/how-it-works/How-it-works';
import AboutUs from '../components/about-us/About-us';
import Register from '../components/register/Register';
import RegisterPro from '../components/register-pro/Register-pro';
import RegisterValidation from '../components/register-validation/Register-validation';
import EmailConfirmation from '../components/email-confirmation/Email-confirmation';
import 'font-awesome/css/font-awesome.min.css';
import PasswordForgotten from '../components/password-forgotten/Password-forgotten';
import ResetPassword from '../components/reset-password/Reset-password';
import { NavHashLink } from 'react-router-hash-link';
import InProgress from '../components/work-in-progress/InProgress';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated(Auth.getId()) ? (
        <Component {...props} rest={rest} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const LogOut = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      Auth.deauthenticateUser();
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

const Private = ({ match }) => (
  <div>
    <Navbar className="atylaNavBar mod-user">
      <Navbar.Header>
        <Navbar.Brand className="atylaNavBar-privateBrand">atyla</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse className="atylaNavBar-navLinks mod-user">
        <Navbar.Text>
          <NavLink
            to={`/account`}
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Accueil
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="#"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            ICOs
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="#"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Commandes
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="#"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Portefeuille
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight>
          <NavLink
            to="/logout"
            className="atylaNavBar-privateLogoutLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Déconnexion
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight className="atylaNavBar-privateIconText">
          <NavLink
            to="#"
            className="atylaNavBar-privateNormalLink mod-icon"
            exact
          >
            <i className="fa fa-user-circle" />
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight className="atylaNavBar-privateIconText">
          <NavLink
            to="#"
            className="atylaNavBar-privateNormalLink mod-icon"
            exact
          >
            <i className="fa fa-bell-o" />
          </NavLink>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <PrivateRoute path="/account" component={User} userId={Auth.getId()} />
    </Switch>
  </div>
);

const Public = ({ match }) => (
  <div>
    <Navbar className="atylaNavBar">
      <Navbar.Header>
        <Navbar.Brand>
          <div className="topLeft">
            <p>atyla</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse className="atylaNavBar-navLinks">
        <NavHashLink
          smooth
          to="/#solution"
          className="atylaNavBar-normalLink mod-hidden"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Solution
        </NavHashLink>
        <NavHashLink
          smooth
          to="/#experience"
          className="atylaNavBar-normalLink mod-hidden"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Expérience
        </NavHashLink>
        <NavHashLink
          smooth
          to="/#ecosystem"
          className="atylaNavBar-normalLink mod-hidden"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Ecosystème
        </NavHashLink>
        <NavHashLink
          smooth
          to="/#love"
          className="atylaNavBar-normalLink mod-hidden"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Ils nous aiment
        </NavHashLink>
        <NavLink
          to="/login"
          className="atylaNavBar-signInLink"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Connexion
        </NavLink>
        <NavLink
          to="/register"
          className="atylaNavBar-signUpLink"
          activeClassName="atylaNavBar-activeLink"
          exact
        >
          Ouvrir un compte
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </div>
);

class AtylaRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      // <div>
      // <Switch>
      <Route exact path="/" component={InProgress} />
      // <PrivateRoute path="/account" component={Private} />
      //           <Route path="/icos/:id" component={Ico} />
      //           <Route exact path="/howitworks" component={HowItWorks} />
      //           <Route exact path="/about" component={AboutUs} />
      //           <Route exact path="/icos" component={Icos} />
      //           <Route exact path="/login" component={Login} />
      //           <Route
      //             exact
      //             path="/password-forgotten"
      //             component={PasswordForgotten}
      //           />
      //           <Route exact path="/reset-password/:id" component={ResetPassword} />
      //           <LogOut path="/logout" component={LogOut} />
      //           <Route exact path="/register" component={Register} />
      //           <Route exact path="/register-pro" component={RegisterPro} />
      //           <Route
      //             exact
      //             path="/register-validation"
      //             component={RegisterValidation}
      //           />
      //           <Route
      //             exact
      //             path="/sign-up/confirmation/:id"
      //             component={EmailConfirmation}
      //           />
      //           <Route exact path="/not-found" component={NotFound} />
      //           <Route component={NotFound} />
      // </Switch>
      // </div>
    );
  }
}

export default AtylaRouter;
