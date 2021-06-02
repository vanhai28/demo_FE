import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Table, Button, Pagination, PaginationItem, PaginationLink, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, } from "@fortawesome/free-solid-svg-icons";
import QuizInsert from "./QuizInsert"
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class QuizAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataQuiz: [],
            currentPage: 0,
            pageSize: 5,
            modalStatus: false,
            dataEdit: [],
            idDel: "",
        };
    }
    //load data at first time

    async componentDidMount() {
        this.props.requestAllQuiz()
    }

    handleToggleForm = () => {
        if (this.props.dataEdit && this.props.isShowForm) {
            this.props.clearEditForm();
        }
        this.props.openForm();
    };
    handleClickPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index,
        });
    }
    //Delete Quiz

    handleDeleteData = () => {
        this.handleModalDel();
        this.props.deleteQuiz(this.state.idDel);
        this.props.closeForm();
    };
    handleModalDel = () => {
        this.setState({
            modalStatus: !this.state.modalStatus,
        });
    };
    handleModalDelGetId = (id) => {
        this.setState({
            modalStatus: !this.state.modalStatus,
            idDel: id,
        });
    };
    // only show form

    handleShowEditForm = (id) => {
        this.props.editQuiz(id);
        this.props.openForm();
    };

    handleShowForm = () => {
        this.setState({
            isShowForm: true,
            dataEdit: null,
        });
    };

    // only close form

    handleCloseForm = () => {
        this.setState({
            isShowForm: false,
            dataEdit: null,
        });

    };

    handleShowEditForm = (id) => {
        this.props.editQuiz(id);
        this.setState({
            isShowForm: true,
        });
    };

    render() {
        let { currentPage, isShowForm } = this.state;
        let { dataQuiz } = this.props
        this.pagesCount = Math.ceil(dataQuiz.length / this.state.pageSize);
        return (
            <Container fluid={true}>
                <Row>
                    <Col lg="12">
                        <Card >
                            <CardHeader>
                                Danh sách câu hỏi
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg={isShowForm ? "6" : ""}>{isShowForm ? <QuizInsert onAnswer={this.handleCloseForm} /> : ""}</Col>
                                    <Col lg={isShowForm ? "6" : "12"}>
                                        <Row className="mt-2">
                                            <Col lg="6" xs="6">
                                                <Button
                                                    color="success"
                                                    onClick={this.handleShowForm}
                                                >
                                                    Thêm câu hỏi
                                            </Button>                                             
                                            </Col>
                                        </Row>
                                        <Row className="mt-2">
                                            <Col lg="12">
                                                <Table style={{ overflowX: "hidden" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Câu hỏi</th>
                                                            <th className="hiddenStatusRes">Loại câu hỏi</th>
                                                            <th>Hành động</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataQuiz
                                                            .slice(
                                                                currentPage * this.state.pageSize,
                                                                (currentPage + 1) * this.state.pageSize
                                                            )
                                                            .map((Quiz, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{Quiz.text}</td>
                                                                        <td>{Quiz.display_type}</td>
                                                                        <td>
                                                                            <Row>
                                                                                <Col lg="6" className="p-0">
                                                                                    <Button
                                                                                        className="mb-2"
                                                                                        color="warning"
                                                                                        onClick={() => this.handleShowEditForm(Quiz._id)}
                                                                                    >
                                                                                        <FontAwesomeIcon
                                                                                            icon={faEdit}
                                                                                            style={{}}
                                                                                        />
                                                                                    </Button>

                                                                                </Col>
                                                                                <Col lg="6" className="p-0">
                                                                                    <Button
                                                                                        color="danger"
                                                                                        onClick={() => this.handleModalDelGetId(
                                                                                            Quiz._id
                                                                                        )}
                                                                                    >
                                                                                        <FontAwesomeIcon
                                                                                            icon={faTrash}
                                                                                            style={{}}

                                                                                        />
                                                                                    </Button>
                                                                                    <Modal
                                                                                        isOpen={this.state.modalStatus}
                                                                                        toggle={this.handleModalDel}
                                                                                    >
                                                                                        <ModalHeader
                                                                                            toggle={this.handleModalDel}
                                                                                        >
                                                                                            Cảnh báo
                                                                                         </ModalHeader>
                                                                                        <ModalBody>
                                                                                            Bạn muốn xoá câu hỏi này?
                                                                                         </ModalBody>
                                                                                        <ModalFooter>
                                                                                            <Button
                                                                                                color="primary"
                                                                                                onClick={
                                                                                                    this.handleDeleteData
                                                                                                }
                                                                                            >
                                                                                                Vơn
                                                                                                 </Button>{" "}
                                                                                            <Button
                                                                                                color="secondary"
                                                                                                onClick={this.handleModalDel}
                                                                                            >
                                                                                                Không
                                                                                            </Button>
                                                                                        </ModalFooter>
                                                                                    </Modal>
                                                                                </Col>
                                                                            </Row>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col lg="12">
                                                <Pagination className="paginationMap">
                                                    <PaginationItem disabled={currentPage <= 0}>
                                                        <PaginationLink
                                                            onClick={(e) =>
                                                                this.handleClickPagination(e, currentPage - 1)
                                                            }
                                                            previous
                                                            href="#"
                                                        />
                                                    </PaginationItem>

                                                    {[...Array(this.pagesCount)].map((page, i) => (
                                                        <PaginationItem
                                                            active={i === currentPage}
                                                            key={i}
                                                        >
                                                            <PaginationLink
                                                                onClick={(e) =>
                                                                    this.handleClickPagination(e, i)
                                                                }
                                                                href="#"
                                                            >
                                                                {i + 1}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    ))}

                                                    <PaginationItem
                                                        disabled={currentPage >= this.pagesCount - 1}
                                                    >
                                                        <PaginationLink
                                                            onClick={(e) =>
                                                                this.handleClickPagination(e, currentPage + 1)
                                                            }
                                                            next
                                                            href="#"
                                                        />
                                                    </PaginationItem>
                                                </Pagination>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        )
    }
}
const quizStateToProps = (state) => {
    return {
        isShowForm: state.FormQuiz,
        dataQuiz: state.QuizAdmin,
        dataEdit: state.EditQuiz,
    };
};
const quizDispatchToProps = (dispatch, props) => {
    return {
        openForm: () => dispatch(actions.openFormQuiz()),
        closeForm: () => dispatch(actions.closeFormQuiz()),
        deleteQuiz: (id) => dispatch(actions.deleteQuiz(id)),
        requestAllQuiz: () => dispatch(actions.requestAllQuiz()),
        receiveAllQuiz: () => dispatch(actions.getAllQuiz()),
        editQuiz: (quiz) => dispatch(actions.EditQuiz(quiz)),
        clearEditForm: () => dispatch(actions.ClearEditQuiz()),
    };
};
export default connect(quizStateToProps, quizDispatchToProps)(QuizAdmin);