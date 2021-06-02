import React, { Component } from "react";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import Bao from "../assets/images/Bao.jpeg";
import Dung from "../assets/images/dung.jpg";
import Hai from "../assets/images/avatar_hai.jpg";
class HomePage extends Component {
  render() {
    return (
      <Container fluid="fluid" className="p-0">
        <Row>
          <Col lg="12">
            <div className="banner-fluid"></div>
            <Container>
              <div class="animated-title">
                <div class="text-top">
                  <div>
                    <span>Against COVID-19</span>
                    <span>A BEEHEXA INTERN PROJECT</span>
                  </div>
                  <div className="strike"></div>
                </div>
                <div class="text-bottom">
                  <div>ISOCOVID</div>
                </div>
              </div>
            </Container>
          </Col>
          <Col lg="12">
            <Container>
              <Row>
                <Col lg="3">
                  <div className="about-team">
                    <span>About Our Team</span>
                    <h2>Simple Perfect Shit?</h2>
                    <p>Always starting from the simplest things.</p>
                    <code>Make it Simple, Make it Work!</code>
                    <div class="fb-page"
                      data-href="https://www.facebook.com/isocovid"
                      data-width="380"
                      data-hide-cover="false"
                      data-show-facepile="false"></div>
                  </div>
                </Col>
                <Col lg="9">
                  <Jumbotron className="jumbotron-homepage">
                    <Row>
                      <Col lg="4">
                        <Card>
                          <CardBody>
                            <img
                              className="jumbotron_avatar"
                              src={Dung}
                              alt=""
                            />
                            <h4>Đoàn Xuân Dũng</h4>
                            <code>COVID MAP</code>
                            <p>
                              My desire is to create a tool that helps people
                              track disease situation in the most intuitive and
                              easy way. And that is exactly why the&nbsp;
                              <b>COVID MAP</b>
                              &nbsp;was created.
                            </p>
                            <div className="card_rules"></div>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col lg="4">
                        <Card>
                          <CardBody>
                            <img
                              className="jumbotron_avatar"
                              src={Bao}
                              alt=""
                            />
                            <h4>Bảo</h4>
                            <code>Quiz Page</code>
                            <p>Thánh tạo Bug cho team :3 ahihi.</p>
                            <div className="card_rules"></div>
                          </CardBody>
                        </Card>
                      </Col>

                      <Col lg="4">
                        <Card>
                          <CardBody>
                            <img
                              className="jumbotron_avatar"
                              src={Hai}
                              alt=""
                            />
                            <h4>Hải</h4>
                            <code>Login page</code>
                            <p>
                              I don't like to learn without knowing what we
                              really do on the real project. For me, learn by
                              doing is the best way
                            </p>
                            <div className="card_rules"></div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Jumbotron>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
