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

class AtylaRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
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
          <PrivateRoute path="/users/:id" component={User} />
          <Route path="/icos/:id" component={Ico} />
          <Route exact path="/howitworks" component={HowItWorks} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/icos" component={Icos} />
          <Route exact path="/login" component={Login} />
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
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default AtylaRouter;
