import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem } from 'reactstrap';
import sidebarMenuItems from 'services/sidebarMenuItems';
import { withRouter } from 'react-router';

class Sidebar extends Component {
  constructor (props) {
    super(props);
    console.log(props.items);
  }
  handleClick = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute = (routeName, props) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // simple wrapper for nav-title item
    const wrapper = item => { return (!item.wrapper ? item.name : (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name))) };

    // nav list section title
    const title =  (title, key) => {
      const classes = "nav-title";
      return (<li key={key} className={ classes }>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => (<li key={key} className="divider"></li>);

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = "nav-link";
      return (
        <NavItem key={key}>
          <NavLink exact to={item.url} className={ classes } activeClassName="active">
            <i className={"icon-" + item.iconClass}></i>{item.name}
          </NavLink>
        </NavItem>
      )
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle" href="#" onClick={handleClick.bind(this)}><i className={"icon-" + item.iconClass}></i> {item.name}</a>
          <ul className="nav-dropdown-items">
            {navList(item.nodes)}
          </ul>
        </li>)
    };

    // nav link
    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
      item.divider ? divider(item, idx) :
      item.nodes ? navDropdown(item, idx)
        : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map( (item, index) => { if (item.hasPermissions) return navLink(item, index) } );
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>
            {navList(this.props.items)}
          </Nav>
        </nav>
        <button className="sidebar-minimizer brand-minimizer" type="button" onClick={() => { document.body.classList.toggle('sidebar-minimized'); document.body.classList.toggle('brand-minimized'); }} />
      </div>
    )
  }
}

export default Sidebar;
