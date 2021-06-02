import React, { Component } from "react"
import { Container, Row, Col, Card, CardHeader, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import QuizChart from "../QuizSamples/chartQuiz";
import QuizAdmin from "./QuizAdmin";
class QuizAdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCollapse: false,
        }
    }
    handleToggleCollapes = () => {
        this.setState({
            openCollapse: !this.state.openCollapse,
        });
        window.scrollTo(0, document.body.scrollHeight);
    };

    scrollToBottom = () => {
        if (this.state.openCollapse)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <QuizAdmin />
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <Card >
                            <CardHeader >
                                Danh sách quiz
                         <FontAwesomeIcon
                                    icon={this.state.openCollapse ? faMinus : faPlus}
                                    onClick={this.handleToggleCollapes}
                                    style={{ cursor: "pointer", margin: "0 1rem" }}
                                />
                            </CardHeader>
                            <Collapse isOpen={this.state.openCollapse}>

                                {" "}
                                <QuizChart />{" "}

                            </Collapse>
                        </Card>
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default QuizAdminPage;
