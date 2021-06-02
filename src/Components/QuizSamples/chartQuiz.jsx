import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Pie } from 'react-chartjs-2';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class ChartQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData_Q1: {},
            chartData_Q2: {}
        };
    }
    componentDidMount() {
        this.props.requestAllAnswer();
    }
    static getDerivedStateFromProps(props, state) {
        if (props.dataUserAnswer && props.dataUserAnswer.length > 0) {
            const { dataUserAnswer } = props;
            const numAnswer = dataUserAnswer.length;
            const numQuestion = 4;

            // Check if data is of quiz or chart data is empty then do nothing
 
            let dataIndex = [0, 3];//contain index of rating question in data
            let dataArray = [numQuestion];

            for (let i = 0; i < dataIndex.length; i++) {
                var tempData = new Array(5).fill(0);
                dataArray[i] = (tempData);
            }

            for (let i = 0; i < numAnswer; i++) {
                let tempData = dataUserAnswer[i];

                for (let j = 0; j < dataIndex.length; j++) {
                    if (tempData && tempData.user_answer) {
                        let test = tempData.user_answer[0];
                        test = test[Object.keys(test)[dataIndex[j]]]//get value user choose
                        dataArray[j][test - 1] += 1;// increase number of user choose 
                    }
                }

            }
            //Update chart data
            return {
                chartData_Q1: {
                    labels: ['Hầu như không biết', 
                        'Biết ít thông tin', 'Biết đầy đủ thông tin'],
                    datasets: [
                        {
                            label: 'Population',
                            data: [dataArray[0][0],
                            dataArray[0][1] + dataArray[0][2],
                            dataArray[0][3]+ dataArray[0][4]
                        ],
                            backgroundColor: [
                                'rgb(243, 0, 0)',
                                'rgb(255, 159, 5)',
                                'rgb(5, 218, 255)'
                            ]
                        }
                    ]
                },
                chartData_Q2: {
                    labels: [ 'Dễ', 'Vừa',
                        'Khó', 'Rất khó'],
                    datasets: [
                        {
                            label: 'Population',
                            data: [dataArray[1][0] + dataArray[1][1],
                            dataArray[1][2],
                            dataArray[1][3],
                            dataArray[1][4]
                            ],
                            backgroundColor: [
                                'rgb(243, 0, 0)',
                                'rgb(255, 159, 5)',
                                'rgb(5, 218, 255)',
                                'rgb(4, 221, 120)',
                                'rgba(72, 245, 3, 0.8)'

                            ]
                        }
                    ]
                }

            };
        }
        return null;
    }
    render() {

        return (
            <div>
                <div className="chart">
                    <Container>
                        <Row>
                            <Col sm="1"></Col>
                            <Col sm="10">
                                <div className="pie-chart">
                                    <Pie
                                        data={this.state.chartData_Q1}
                                        options={{
                                            // maintainAspectRatio:false,
                                            title: {
                                                display: true,
                                                text: "Bạn đánh giá thế nào về kiến thức của bạn về việc ngăn chặn covid"
                                                , fontSize: 25
                                            },
                                            legend: {
                                                display: true,
                                                position: 'bottom',
                                                labels: {
                                                    fontColor: 'blue',
                                                    fontSize: 14
                                                }
                                            }
                                        }}
                                    ></Pie>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="1"></Col>
                            <Col sm="10">
                                <Pie
                                    data={this.state.chartData_Q2}
                                    options={{
                                        // maintainAspectRatio:false,
                                        title: {
                                            display: true,
                                            text: "Theo bạn việc tránh nhiễm Covid trong tình huống hiện tại là khó hay dễ"
                                            , fontSize: 25
                                        },
                                        legend: {
                                            display: true,
                                            position: 'bottom',
                                            labels: {
                                                fontColor: 'blue',
                                                fontSize: 14
                                            }
                                        }
                                    }}
                                ></Pie>
                            </Col>
                        </Row>
                    </Container>

                </div>
            </div>)

    }
}
const mapStateToProps = (state) => {
    return ({
        dataUserAnswer: state.QuizAdmin
    }
    )
};
const dispatchToProps = (dispatch, props) => {
    return {
        requestAllAnswer: () => dispatch(actions.requestAllAnswer()),
    };
};
export default connect(mapStateToProps, dispatchToProps)(ChartQuiz);
