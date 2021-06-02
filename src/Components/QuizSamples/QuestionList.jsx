import React, { Component } from "react";
import Rating from "react-rating"
import "../QuizPage.scss"
import { Input, Col, Row, Container } from "reactstrap";

export default class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: null,
      onAnswer: null,
      dataUserAnswer: null,

    }
  }


  renderAnswer = () => {
    debugger;
    switch (this.state.question.display_type) {
      case ("SCALE_ANSWER"):
        {
          return (
            <Container>
              <Row>
                <Col><p className="scale-left">{typeof this.state.question.ext_data == 'undefined' ? "" : this.state.question.ext_data.scale_left_tag}</p></Col>
                <Rating className="scale-size" onClick={this.state.onAnswer} stop={this.state.question.ext_data.max_scale} initialRating={(typeof this.state.dataUserAnswer != 'undefined' && typeof this.state.dataUserAnswer[this.state.question._id] != 'undefined') ? this.state.dataUserAnswer[this.state.question._id] : "4"} />
                <Col><p className="scale-right">{typeof this.state.question.ext_data == 'undefined' ? "" : this.state.question.ext_data.scale_right_tag}</p></Col>
              </Row>
            </Container>
          )
        }
      case ("SHORT_ANSWER"): return ([<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
        <Input type="text" placeholder="Nhập câu trả lời" value={(typeof this.state.dataUserAnswer != 'undefined' && typeof this.state.dataUserAnswer[this.state.question._id] != 'undefined') ? this.state.dataUserAnswer[this.state.question._id] : ""} onChange={this.state.onAnswer} style={{ width: "600px", height: "60px" }} />
      </div>
      ]);
      default: return <Rating className="scale-size" onClick={this.state.onAnswer} stop={this.state.question.ext_data.max_scale} initialRating={(typeof this.state.dataUserAnswer != 'undefined' && typeof this.state.dataUserAnswer[this.state.question._id] != 'undefined') ? this.state.dataUserAnswer[this.state.question._id] : "4"} />;
    }
  }
  render() {
    this.state = {
      question: this.props.question,
      onAnswer: this.props.onAnswer,
      dataUserAnswer: this.props.userAnswer,
    }
    if (this.state.question == null)
      return (<div></div>)
    return ([
      <h1 >{this.state.question.text}</h1>,
      <Container className="answerUser"><this.renderAnswer></this.renderAnswer></Container>
      
    ]
    );
  }
}
