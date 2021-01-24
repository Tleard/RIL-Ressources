import React, { useState } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';
import { Link } from 'react-router-dom';
import auth from '../auth';
import './Navigation.css';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar light expand="md" className="navbar-color">
        <NavbarBrand href="/home">Re:Relationnelle</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/home" className="navbar-item">Accueil</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/" className="navbar-item">Fil d'actualité</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/categories" className="navbar-item">Catégories</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/" className="navbar-item">Publier</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/" className="navbar-item">Aide</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/login" className="navbar-item">Login</Link></NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink><Link className="navbar-item" onClick={() => {
                      auth.loggedout(() => {
                          console.log('callback in test');
                          props.history.push('/login');
                      });
              }}>Logout</Link></NavLink >
            </NavItem>
            {/* <NavItem>
              <button 
                  onClick={() => {
                      auth.loggedout(() => {
                          console.log('callback in test');
                          props.history.push('/login');
                      });
              }}>Logout</button>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          {/* <NavbarText>Autre</NavbarText> */}
        </Collapse>
      </Navbar>
    </>
  );
}

export default withRouter(Navigation);
