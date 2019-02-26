import React from 'react';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Badge
} from 'reactstrap';
import HeaderDropdown from 'components/HeaderDropdown';

const sidebarToggle = (e) => {
  e.preventDefault();
  document.body.classList.toggle('sidebar-minimized'); // eslint-disable-line no-undef
};

const mobileSidebarToggle = (e) => {
  e.preventDefault();
  document.body.classList.toggle('sidebar-mobile-show'); // eslint-disable-line no-undef
};

const Header = () => (
  <header className="app-header navbar">
    <NavbarToggler className="d-lg-none" onClick={mobileSidebarToggle}>
      <span className="navbar-toggler-icon" />
    </NavbarToggler>
    <NavbarBrand href="#" />
    <NavbarToggler className="d-md-down-none" onClick={sidebarToggle}>
      <span className="navbar-toggler-icon" />
    </NavbarToggler>
    <Nav className="ml-auto" navbar>
      <NavItem className="d-md-down-none">
        <NavLink href="#"><i className="icon-bell" /><Badge pill color="danger">5</Badge></NavLink>
      </NavItem>
      <HeaderDropdown />
    </Nav>
  </header>
);

export default Header;
