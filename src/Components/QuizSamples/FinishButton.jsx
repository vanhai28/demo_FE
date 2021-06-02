import React, { Component } from "react";
import {Button} from "reactstrap"

class FinishButton extends Component {
  render() {
    return (
        <Button color="danger" size="lg" onClick={this.props.onClick}>Finish</Button>
    )
  }
}
export default FinishButton