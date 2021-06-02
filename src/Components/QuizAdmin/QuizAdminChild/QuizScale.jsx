import React, { Component } from "react";
import { FormFeedback, Col, FormGroup, Label, Input, Row } from "reactstrap"

export default class QuizScale extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col lg="4">
                        <FormGroup>
                            <Label for="scaleMax">Nhập scale Max</Label>
                            <Input
                                type="number"
                                name="scaleMax"
                                id="scaleMax"
                                placeholder="Nhập scale Max"
                                value={this.props.extData != null ? this.props.extData.max_scale : ""}
                                onChange={this.props.Change}
                            />
                            <FormFeedback>Không được bỏ trống</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg="6">
                        <FormGroup>
                            <Label for="scaleLeft">Nhập tag trái</Label>
                            <Input
                                type="text"
                                name="scaleLeft"
                                id="scaleLeft"
                                placeholder="Nhập tag trái"
                                 value={this.props.extData != null ? this.props.extData.scale_left_tag : ""}
                                onChange={this.props.Change.bind(this)}
                            />
                            <FormFeedback>Không được bỏ trống</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg="6">
                        <FormGroup>
                            <Label for="scaleRight">Nhập tag phải</Label>
                            <Input
                                type="text"
                                name="scaleRight"
                                id="scaleRight"
                                placeholder="Nhập tag phải"
                                value={this.props.extData != null ? this.props.extData.scale_right_tag : ""}
                                onChange={this.props.Change.bind(this)}
                            />
                            <FormFeedback>Không được bỏ trống</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
            </div>

        )
    }
}