import React, { Component } from "react";
import {Button} from "reactstrap"

class NextButton extends Component {
  render() {
    return (
      <Button color="primary" size="lg" onClick={this.props.onClick} >&gt;</Button>
    );
  }
}
export default NextButton