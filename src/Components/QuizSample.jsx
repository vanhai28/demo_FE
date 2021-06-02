import React, { Component } from "react";
import { Row, Col, Container } from 'reactstrap'
import axios from "axios";
import QuestionList from "./QuizSamples/QuestionList";
import BackButton from "./QuizSamples/BackButton";
import NextButton from "./QuizSamples/NextButton";
import FinishButton from "./QuizSamples/FinishButton"
import './QuizPage.scss'
import { trackPromise } from 'react-promise-tracker';
import { Link } from "react-router-dom";
import { Progress } from 'reactstrap';
const host = process.env.REACT_APP_COVID_API;

export default class Quiz extends Component {
  state = {
    questionList: [],
    answers: {},
    currentQuestionIndex: 0,
    renderView: 0,
    isFinish: false,
    isNextFlagOn: true,
    isBackFlagOn: false,
    finishFlagOn: false,
  };

  componentDidMount() {
    this.setState({
      questionList: [],
    });
    trackPromise(
      axios.get(`${host}/api/quiz`).then((res) => {
        this.setState({
          questionList: res.data.QuizReponses
        })
      }
      )
    )
  }


  back = () => {
    var currentQuestion = this.state.currentQuestionIndex;
    if (currentQuestion === 1) {
      this.setState({
        currentQuestionIndex: 0,
        isBackFlagOn: false,
        isNextFlagOn: true,
      })
    }
    else {
      this.setState({
        currentQuestionIndex: currentQuestion - 1,
        isBackFlagOn: true,
        isNextFlagOn: true,
      })
    }

  }

  next = () => {debugger;
    var currentQuestion = this.state.currentQuestionIndex + 1;
    if (currentQuestion === this.state.questionList.length - 1) {
      this.setState({
        currentQuestionIndex: currentQuestion,
        isNextFlagOn: false,
        isBackFlagOn: true,
        finishFlagOn: true
      })
    }
    else {
      this.setState({
        currentQuestionIndex: currentQuestion,
        isNextFlagOn: true,
        isBackFlagOn: true,

      })
    }
  }

  onAnswer = (ans) => {
    debugger;
    if (typeof ans == 'object') {
      ans = ans.target.value
    }

    this.setState(prevState => {
      let idAnswer = prevState.questionList[prevState.currentQuestionIndex]._id;
      let answers = Object.assign({}, prevState.answers);  // creating copy of state variable jasper
      answers[idAnswer] = ans;                     // update the name property, assign a new value                 
      return { answers };                                 // return new object jasper object
    })

  }

  handleFinishButton = async (event) => {
    event.preventDefault();
    axios.post(`${host}/api/UserAnswer`, {
      user_answer: this.state.answers,
      ip: "11.11"
    },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(
        window.location = window.location.origin + '/thankyou/'
      )
  }
  render() {

    let { isBackFlagOn, finishFlagOn, isNextFlagOn } = this.state
    let backButton = <BackButton onClick={this.back} />
    let nextButton = <NextButton onClick={this.next} />
    let finishButton = <FinishButton tag={Link} to='/thankyou' onClick={this.handleFinishButton} />

    if (this.state.questionList == null || typeof this.state.questionList =='undefined')
    return (<div></div>)
    
    return (
      <Container className="frame">
        <div>
          <div>Câu hỏi {this.state.currentQuestionIndex + 1} trên {this.state.questionList.length}</div>
          <Progress value={this.state.currentQuestionIndex + 1} max={this.state.questionList.length} />
        </div>

        <Row >
          <Col xs="1" className="question" >
            {isBackFlagOn ? backButton : ""}
          </Col>
          <Col xs="10" className="question">

            <QuestionList question={this.state.questionList[this.state.currentQuestionIndex]} onAnswer={this.onAnswer} userAnswer={this.state.answers} />
          </Col>

          <Col xs="1" className="question">
            {isNextFlagOn ? nextButton : ""}
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            {finishFlagOn ? finishButton : ""}
          </Col>
        </Row>
      </Container>

    );
  }
}
