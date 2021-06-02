import React from "react";
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class AdminSubNav extends React.Component {
    constructor(props)
    {
      super(props);
      this.state = {
        dashboard: 300,
        map : 300,
        survey: 300
      }
    }

    componentWillMount(){
      if(window.location.pathname.includes('dashboard'))this.setState((state, props) => {
        return {dashboard: 700};
      });
      if(window.location.pathname.includes('map'))this.setState((state, props) => {
        return {map: 700};
      });
      if(window.location.pathname.includes('survey'))this.setState((state, props) => {
        return {survey: 700};
      });
    }

    render () {
        return <Navbar color="faded" expand="xs">
        <Collapse isOpen = {true} navbar style={{'color': 'blue'}}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink  style={{ 'fontWeight':this.state.dashboard }} href="/admin/dashboard"> Quản trị viên</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ 'fontWeight':this.state.map }} href="/admin/map">Thông tin bệnh nhân</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{ 'fontWeight':this.state.survey }} href="/admin/survey">Câu hỏi khảo sát</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    }
}

export default AdminSubNav;