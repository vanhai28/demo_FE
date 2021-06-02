import React, { Component } from "react";

import ChartQuiz from './chartQuiz'

export default class ThankYou extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                 
                        <h1 className="display-3">
                            Cảm ơn bạn!
                       </h1>
                        <p className="lead"><strong>Đã tham gia khảo sát</strong>Bạn đã góp phần đánh bại Covid 19</p>
                        <hr></hr>
                        <p className="lead">
                            <a className="btn btn-primary btn-sm" href="/" role="button">Continue to homepage</a>
                        </p>
                       <ChartQuiz/>
                </div>
            </div>)
    }
}