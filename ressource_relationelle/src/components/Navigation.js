import React, { useState } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';
import auth from '../auth';
import './Navigation.css';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">Re:Relationnelle</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/categories">Catégories</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="">Ressources</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <button 
                onClick={() => {
                    auth.loggedout(() => {
                        console.log('callback in test');
                        props.history.push('/login');
                    });
            }}>Logout</button>
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
          <NavbarText>Autre</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(Navigation);
