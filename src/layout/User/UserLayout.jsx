import React, { Component } from "react";
import Header from "../_shared/Header";
import { Container } from "reactstrap";

class UserLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Header isLogin={this.props.isLogin} />
        {this.props.children}
        <footer>
          <Container fluid="1" className="footer-container">
            <p>© 2020 Beehexa All rights reserved</p>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default UserLayout;
