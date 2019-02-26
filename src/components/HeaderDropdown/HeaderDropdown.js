import React from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';

let open = false;

const toggle = () => {
  open = true;
};

const HeaderDropdown = () => (
  <Dropdown nav isOpen={open} toggle={toggle}>
    <DropdownToggle nav>
      <img src="./../public/img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
    </DropdownToggle>
    <DropdownMenu right>
      <DropdownItem header tag="div" className="text-center">
        <strong>Account</strong>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-bell-o" />Updates<Badge color="info">42</Badge>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-envelope-o" />Messages<Badge color="success">42</Badge>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-tasks" />Tasks<Badge color="danger">42</Badge>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-comments" />Comments<Badge color="warning">42</Badge>
      </DropdownItem>
      <DropdownItem header tag="div" className="text-center">
        <strong>Settings</strong>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-user" />Profile
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-wrench" />Settings
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-usd" />Payments<Badge color="secondary">42</Badge>
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-file" />Projects<Badge color="primary">42</Badge>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>
        <i className="fa fa-shield" />Lock Account
      </DropdownItem>
      <DropdownItem>
        <i className="fa fa-lock" />Logout
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default HeaderDropdown;
