import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import NotFound from '../components/not-found/not-found';
import HomePage from '../components/homepage';
import Login from '../components/login/Login';
import Icos from '../components/icos/Icos';
import Ico from '../components/ico/Ico';
import Auth from '../services/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
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
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    }
  />
);

class AtylaRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              atyla
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse className="atylaNavBar-navLinks">
            <NavLink to="/icos" className="atylaNavBar-normalLink" activeClassName="atylaNavBar-activeLink" exact>Icos</NavLink>
            <NavLink to="/login" className="atylaNavBar-normalLink" activeClassName="atylaNavBar-activeLink" exact>Login</NavLink>
            <NavLink to="/protected" className="atylaNavBar-normalLink" activeClassName="atylaNavBar-activeLink" exact>Protected</NavLink>
            <NavLink to="/logout" className="atylaNavBar-normalLink" activeClassName="atylaNavBar-activeLink" exact>Logout</NavLink>
            <NavLink to="/" className="atylaNavBar-normalLink mod-last" activeClassName="atylaNavBar-activeLink mod-last" exact>Home</NavLink>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/icos/:id" component={Ico} />
          <Route exact path='/icos' component={Icos} />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute path="/protected" component={NotFound} />
          <LogOut path="/logout" component={LogOut} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default AtylaRouter;
