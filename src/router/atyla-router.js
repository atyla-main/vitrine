import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Route, Switch, NavLink } from 'react-router-dom';
import NotFound from '../components/not-found/not-found';
import HomePage from '../components/homepage';

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
            <NavLink to="/" className="atylaNavBar-normalLink" activeClassName="atylaNavBar-activeLink" exact>Home</NavLink>
            <NavLink to="/" className="atylaNavBar-normalLink mod-last" activeClassName="atylaNavBar-activeLink mod-last" exact>Home</NavLink>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default AtylaRouter;
