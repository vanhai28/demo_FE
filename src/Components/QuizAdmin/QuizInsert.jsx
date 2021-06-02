import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimesCircle,
    faUserPlus,
    faEraser,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import {
    Container,
    Row,
    Col,
    CardTitle,
    CardHeader,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
    CardBody,
} from "reactstrap";
import QuizScale from "./QuizAdminChild/QuizScale"
import QuizShort from "./QuizAdminChild/QuizShort"
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class QuizInsert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: null,
            display_type: null,
            ext_data: null,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!props.dataEdit._id) {
            return null;
        }
        if (props.dataEdit._id !== state._id) {
            console.log(props.dataEdit.ext_data)
            return {
                _id: props.dataEdit._id,
                text: props.dataEdit.text,
                display_type: props.dataEdit.display_type,
                ext_data: props.dataEdit.ext_data
            };
        }

    }

    handleOnChange = (e) => {
        // console.log(e.target.value)
        if (e.target.name === "loaicauhoi")
            return this.setState({
                display_type: e.target.value
            });
        if (e.target.name === "questiontext")
            return this.setState({
                text: e.target.value
            });
        if (e.target.name === "scaleMax")
            return this.setState({
                ext_data: {
                    max_scale: e.target.value
                }
            });
        if (e.target.name === "scaletype")
            return this.setState({
                ext_data: {
                    scale_type: e.target.value
                }
            });
        if (e.target.name === "scaleLeft") {
            var temp = e.target.value
            this.setState(prevState => {
                debugger;
                let ext_data = Object.assign({}, prevState.ext_data);
                ext_data.scale_left_tag = temp;
                return { ext_data };
            })
        }
        if (e.target.name === "scaleRight") {debugger;
            var temp = e.target.value
            this.setState(prevState => {
                let ext_data = Object.assign({}, prevState.ext_data);
                ext_data.scale_right_tag = temp;
                return { ext_data };
            })
        }

        if (e.target.name === "shorttag") {
            var arrWordTag = String(e.target.value)
            arrWordTag = arrWordTag.toLowerCase()
            arrWordTag = arrWordTag.split(" ")
            return this.setState({
                ext_data: {
                    tag: arrWordTag
                }
            });
        }
        console.log(this.state)
    };

    handleClearData = () => {
        this.setState({
            display_type: null,
            text: null,
            ext_data: null,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state._id) {
            this.props.createQuiz(this.state);
        } else if (this.state._id) {
            this.props.updateQuiz(this.state._id, this.state);
        }
        this.handleClearData();
        return this.props.onAnswer();
    };
  
    renderQuestionType = () => {
        switch (this.state.display_type) {
            case "SCALE_ANSWER":
                return (<QuizScale extData={this.state.ext_data} Change={this.handleOnChange}></QuizScale>)

            case "SHORT_ANSWER":
                return (<QuizShort extData={this.state.ext_data} Change={this.handleOnChange} ></QuizShort>)

            default: return (<QuizShort extData={this.state.ext_data} Change={this.handleOnChange} ></QuizShort>)
        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <CardHeader>
                            <CardTitle className="space-between">
                                <strong> {this.state._id ? "Sửa câu hỏi" : "Thêm câu hỏi"} </strong>
                                <Button id="btnCloseForm" color="danger" onClick={this.props.onAnswer}>
                                    Đóng form <FontAwesomeIcon icon={faTimesCircle} />
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form
                                onSubmit={this.handleSubmit}
                                method="post"
                                encType="multipart/form-data"
                            >
                                <Row>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Label for="loaicauhoi">Loại câu hỏi</Label>
                                            <Input
                                                type="select"
                                                name="loaicauhoi"
                                                id="loaicauhoi"
                                                value={this.state.display_type}
                                                onChange={this.handleOnChange}
                                            >
                                                <option value="DEFAULT" disabled selected value> -- select an option -- </option>
                                                <option value="SCALE_ANSWER">Scale Answer</option>
                                                <option value="SHORT_ANSWER">Short Answer</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg="12">
                                        <FormGroup>
                                            <Label for="questiontext">Nhập câu hỏi</Label>
                                            <Input
                                                type="text"
                                                name="questiontext"
                                                id="questiontext"
                                                placeholder="Nhập câu hỏi"
                                                value={this.state.text}
                                                onChange={this.handleOnChange}
                                            />
                                            <FormFeedback>Không được bỏ trống</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {this.renderQuestionType()}

                                {/* Button fisish and clear */}
                                <Row >
                                    <Col lg="2" >
                                        <Button
                                            color="success"
                                            type="submit"
                                        >
                                            {this.state._id ? "Sửa" : "Thêm"}
                                            {this.state._id ? (
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    style={{ margin: "0px 7px" }}
                                                />
                                            ) : (
                                                    <FontAwesomeIcon
                                                        icon={faUserPlus}
                                                        style={{ margin: "0px 10px" }}
                                                    />
                                                )}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Col>
                </Row>
            </Container >
        )
    }
}
const quizStateToProps = (state) => {
    return { dataEdit: state.EditQuiz };
};
const quizDispatchToProps = (dispatch, props) => {
    return {
        closeForm: () => dispatch(actions.closeFormQuiz()),
        updateQuiz: (id, quiz) =>
            dispatch(actions.UpdateQuiz(id, quiz)),
        createQuiz: (quiz) => dispatch(actions.CreateQuiz(quiz)),
        clearEditForm: () => dispatch(actions.ClearEditQuiz()),
    };
};
export default connect(quizStateToProps, quizDispatchToProps)(QuizInsert);