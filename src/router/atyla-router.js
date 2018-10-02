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
import ContractForm from '../containers/ContractForm';
import ContractsMenu from '../containers/ContractsMenu';
import AtylaLogo from '../img/atyla-design-v1/logo.png';
import Head from '../img/atyla-design-v1/05_ICON_HEAD.png';
import Bell from '../img/atyla-design-v1/05_ICON_BELL.png';

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
    <Navbar className="">
      <Navbar.Header>
        <Navbar.Brand className="">
          <img src={AtylaLogo} height={46} width={123} alt="" />
        </Navbar.Brand>
      </Navbar.Header>
      <div className="atylaNavBar-menu">
        <Navbar.Text pullRight className="atylaNavBar-buttonText">
          <NavLink
            to="/logout"
            className="atylaNavBar-button"
            activeClassName="atylaNavBar-button"
            exact
          >
            Déconnexion
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight className="atylaNavBar-navText">
          <NavLink to="#" className="" exact>
            <img src={Bell} height={39} width={34} alt="" />
          </NavLink>
        </Navbar.Text>
        <Navbar.Text pullRight className="atylaNavBar-navText">
          <NavLink to="#" className="atylaNavBar-headText" exact>
            <img
              src={Head}
              height={39}
              width={40}
              alt=""
              className={'atylaNavBar-head'}
            />
            Bonjour !
          </NavLink>
        </Navbar.Text>
      </div>
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
        path="/dashboard/contracts/new"
        component={ContractForm}
        userId={Auth.getId()}
      />
      <PrivateRoute
        path="/dashboard/contracts"
        component={ContractsMenu}
        userId={AtylaRouter}
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
