import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import NotFound from '../components/not-found/not-found';
import Login from '../components/login/Login';
import Auth from '../services/Auth';
import User from '../components/user/User';
import Register from '../components/register/Register';
import RegisterValidation from '../components/register-validation/Register-validation';
import EmailConfirmation from '../components/email-confirmation/Email-confirmation';
import 'font-awesome/css/font-awesome.min.css';
import PasswordForgotten from '../components/password-forgotten/Password-forgotten';
import ResetPassword from '../components/reset-password/Reset-password';
import InProgress from '../components/work-in-progress/InProgress';
import Parameters from '../containers/Parameters';
import Offices from '../containers/Offices';
import Contacts from '../containers/Contacts';
import Properties from '../containers/Properties';
import Contracts from '../containers/Contracts';

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
            to="/dashboard/contracts"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Contrats
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/dashboard/offices"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Agences
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/dashboard/properties"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Biens
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/dashboard/contacts"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Contacts
          </NavLink>
        </Navbar.Text>
        <Navbar.Text>
          <NavLink
            to="/dashboard/parameters"
            className="atylaNavBar-privateNormalLink"
            activeClassName="atylaNavBar-activeLink mod-private"
            exact
          >
            Paramètres
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
      <PrivateRoute
        path="/dashboard/parameters"
        component={Parameters}
        userId={Auth.getId()}
      />
      <PrivateRoute
        path="/dashboard/properties"
        component={Properties}
        userId={Auth.getId()}
      />
      <PrivateRoute
        path="/dashboard/offices"
        component={Offices}
        userId={Auth.getId()}
      />
      <PrivateRoute
        path="/dashboard/contacts"
        component={Contacts}
        userId={Auth.getId()}
      />
      <PrivateRoute
        path="/dashboard/contracts"
        component={Contracts}
        userId={Auth.getId()}
      />
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
          <Route exact path="/" component={InProgress} />
          <PrivateRoute path="/dashboard" component={Private} />
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
