import React, { Component } from "react";
import { FormFeedback, Col, FormGroup, Label, Input, Row } from "reactstrap"

export default class QuizScale extends Component {
    render() {
        return (
            <Row>
                <Col lg="6">
                    <FormGroup>
                        <Label for="shorttag">Nhập tag </Label>
                        <Input
                            type="text"
                            name="shorttag"
                            id="shorttag"
                            placeholder="Nhập Tag"                         
                            value={ this.props.extData==null?"": 
                            (this.props.extData===[])?"":
                            this.props.extData.tag}  
                            onChange={this.props.Change}
                        />
                        <FormFeedback>Không được bỏ trống</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}