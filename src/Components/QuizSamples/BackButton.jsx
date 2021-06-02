import React, { Component } from "react";
import {Button} from "reactstrap"

class BackButton extends Component {
  render() {
    return (
      <Button color="primary" size="lg" onClick={this.props.onClick} >&lt;</Button>
    )
  }
}
export default BackButton