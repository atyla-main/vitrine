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
import RegisterValidation from '../components/register-validation/Register-validation';
import EmailConfirmation from '../components/email-confirmation/Email-confirmation';
import 'font-awesome/css/font-awesome.min.css';
import PasswordForgotten from '../components/password-forgotten/Password-forgotten';
import ResetPassword from '../components/reset-password/Reset-password';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
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
    <Navbar style={{ paddingTop: '5px' }}>
      <Navbar.Header>
        <Navbar.Brand className="atylaNavBar-privateBrand">atyla</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Text>
          <NavLink
            to="/users/1"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Accueil
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/icos"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            ICOs
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/howitworks"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Commandes
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/about"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Portefeuille
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight>
          <NavLink
            to="/register"
            className="atylaNavBar-privateLogoutLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
            pullRight
          >
            Déconnexion
          </NavLink>
        </Navbar.Text>
        <Navbar.Text className="atylaNavBar-privateIconText" pullRight>
          <NavLink
            to="/users/1"
            className="atylaNavBar-privateNormalLink mod-icon"
            exact
          >
            <i className="fa fa-user-circle" ariaHidden="true" />
          </NavLink>
        </Navbar.Text>
        <Navbar.Text className="atylaNavBar-privateIconText" pullRight>
          <NavLink
            to="/users/1"
            className="atylaNavBar-privateNormalLink mod-icon"
            exact
          >
            <i className="fa fa-bell-o" ariaHidden="true" />
          </NavLink>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Switch>
      <PrivateRoute path="/users/:id" component={User} />
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
        <Navbar.Collapse className="atylaNavBar-navLinks">
          <NavLink
            to="/"
            className="atylaNavBar-normalLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            Home
          </NavLink>
          <NavLink
            to="/icos"
            className="atylaNavBar-normalLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            Explore ICOs
          </NavLink>
          <NavLink
            to="/howitworks"
            className="atylaNavBar-normalLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            How it works
          </NavLink>
          <NavLink
            to="/about"
            className="atylaNavBar-normalLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            About us
          </NavLink>
          <NavLink
            to="/users/1"
            className="atylaNavBar-normalLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            Account
          </NavLink>
          <NavLink
            to="/login"
            className="atylaNavBar-signInLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            Sign-in
          </NavLink>
          <NavLink
            to="/register"
            className="atylaNavBar-signUpLink"
            activeClassName="atylaNavBar-activeLink"
            exact
          >
            Sign-up
          </NavLink>
        </Navbar.Collapse>
      </Navbar.Header>
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
      <div>
        <Switch>
          <Route exact path="/" component={Public} />
          <PrivateRoute path="/users/:id" component={Private} />
          <Route path="/icos/:id" component={Ico} />
          <Route exact path="/howitworks" component={HowItWorks} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/icos" component={Icos} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/password-forgotten"
            component={PasswordForgotten}
          />
          <Route exact path="/reset-password/:id" component={ResetPassword} />
          <LogOut path="/logout" component={LogOut} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/register-validation"
            component={RegisterValidation}
          />
          <Route
            exact
            path="/sign-up/confirmation/:id"
            component={EmailConfirmation}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default AtylaRouter;
