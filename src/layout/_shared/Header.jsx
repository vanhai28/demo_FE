import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect} from 'react-redux';
import {logOutRequest} from '../../store/actions/logout.action'


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "../../assets/images/Logo.png";

class Header extends React.Component {

  state = {
    isOpen: false,
    isLoggedIn: this.props.isLogin,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };

    logoutHandle = event => {
    event.preventDefault();
    this.props.logOutRequest(localStorage.getItem('token'))
    
  }

  renderLoggedInMenu = () => {
    return (
      <Nav className="" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ margin: "0px 10px" }}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to = '/admin/dashboard'>
              Quản trị viên
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.logoutHandle}>Thoát</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  };
  renderAnnonymousMenu = () => {
    return (
      <Nav className="" navbar>
        <NavItem className="btn-login">
          <NavLink onClick={this.toggleLoggedIn} tag={Link} to="/login" >
               Đăng nhập
            <FontAwesomeIcon 
              icon={faSignInAlt}
              style={{ margin: "0px 10px" }}
            />
          </NavLink>
        </NavItem>
      </Nav>
    );
  };
  render() {

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="logo" style={{ width: "50px" }}></img>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/map">Bản đồ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/survey">Khảo sát</NavLink>
            </NavItem>
          </Nav>
          {this.props.isLogin && this.renderLoggedInMenu()}
          {!this.props.isLogin && this.renderAnnonymousMenu()}
        </Collapse>
      </Navbar>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logOutRequest: (token) => dispatch(logOutRequest(token)),
   
} 
}

export default connect(null, mapDispatchToProps)(Header);

