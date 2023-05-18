// imports
import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Navbar,
  InputGroup,
  Form,
  Nav,
  Alert,
} from "react-bootstrap";
import { AccuService } from "../services";
import { Wave, Portfolio, Logo, Avatar, LogoLP } from "../img";

// component Accuracy
export default class Accuracy extends Component {
  /**
   * constructor of Accuracy
   * @param {*} props
   */
  constructor(props) {
    super(props);

    // this.handleLogin = this.handleLogin.bind(this);
    // this.onChangeUsername = this.onChangeUsername.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);
    this.handleAccuracy = this.handleAccuracy.bind(this);
    this.onChangecoin = this.onChangecoin.bind(this);
    this.onChangeBuyTimestamp = this.onChangeBuyTimestamp.bind(this);
    this.onChangeamount = this.onChangeamount.bind(this);
    this.onChangeSellTimestamp = this.onChangeSellTimestamp.bind(this);

    this.state = {
      coin: "bitcoin",
      buyTimestamp: "08-11-2015",
      sellTimestamp: "08-11-2021",
      amount: "0.1", // will be in coin units
      loading: false,
      message: "",
      coinInvalid: false,
      profitUsingAPI: 0,
      profitUsingActualData: 0,
      accuracyPercentage: 97.5,
    };
  }
  /**
   * handles change in coin-input
   * @param {Event} e
   */
  onChangecoin(e) {
    this.setState({
      message: "",
      coin: e.target.value,
      coinInvalid: false,
    });
  }

  /**
   * handles change in buyTimestamp-input
   * @param {Event} e
   */
  onChangeBuyTimestamp(e) {
    this.setState({
      message: "",
      buyTimestamp: e.target.value,
    });
  }

  /**
   * handles change in amount-input
   * @param {Event} e
   */
  onChangeamount(e) {
    this.setState({
      message: "",
      amount: e.target.value,
    });
  }

  /**
   * handles change in sellTimestamp-input
   * @param {Event} e
   */
  onChangeSellTimestamp(e) {
    this.setState({
      message: "",
      sellTimestamp: e.target.value,
    });
  }

  /**
   * handles accuracy calculation
   * @param {Event} e
   */
  handleAccuracy(e) {
    e.preventDefault();
    this.setState({
      loading: true,
      message: "",
    });
    console.log("I'm here!!");
    AccuService.getAccu(
      this.state.coin,
      this.state.buyTimestamp,
      this.state.sellTimestamp,
      this.state.amount
    ).then((response) => {
      console.log("debug1.00");
      console.log(response);
      console.log(this.state.accuracyPercentage);
      this.setState({
        profitUsingAPI: response.profitCoingecko,
        profitUsingActualData: response.profitCoinlore,
        accuracyPercentage: response.accuracy,
        loading: false,
      });
      console.log(this.state.accuracyPercentage);
      console.log(response);
    });
  }

  /**
   * render-function of Accuracy
   */
  render() {
    const {
      coin,
      buyTimestamp,
      sellTimestamp,
      amount,
      loading,
      message,
      coinInvalid,
      profitUsingAPI,
      profitUsingActualData,
      accuracyPercentage,
    } = this.state;
    console.log("I'm in render!");
    return (
      <Container fluid>
        <Image src={Wave} className="position-fixed h-100"></Image>

        <Navbar className="z-100">
          <LogoLP />
        </Navbar>

        <Row className="main-content">
          <Col className="d-flex">
            <Image
              src={Portfolio}
              className="mx-auto my-auto h-60"
              fluid
            ></Image>
          </Col>
          <Col className="d-flex">
            <div className="mx-auto my-auto w-75 d-inline jumbotron">
              {/* <div className="d-flex justify-content-center mb-3">
                <Image src={Avatar} className="w-25"></Image>
              </div> */}
              <h1 className="text-center text-dark">Check Accuracy</h1>
                <br />
                <br></br>
              <Form className="text-center" onSubmit={this.handleAccuracy}>
                <Form.Group className="mb-3">
                  <InputGroup>
                  <InputGroup.Text>Coin</InputGroup.Text>
                  {/**make a form to take input for: coin (dropdown list for 10 available coins), buyTimestamp, sellTimestamp (both will be dates, time not included), amount, and output fields will be profitUsingAPI, profitUsingActualData, Accuracy */}
                  <Form.Control
                    type="text"
                    defaultValue="bitcoin"
                    onChange={this.onChangecoin}
                    isInvalid={this.state.coinInvalid}
                  />
                  <InputGroup.Text>Amount (in coins)</InputGroup.Text>
                  <Form.Control
                    type="number"
                    defaultValue={0.1}
                    onChange={this.onChangeamount}
                    isInvalid={this.state.coinInvalid}
                  />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                  <InputGroup.Text>Buy Date</InputGroup.Text>
                  <Form.Control
                    type="date"
                    defaultValue="08-11-2015"
                    onChange={this.onChangeBuyTimestamp}
                    isInvalid={this.state.coinInvalid}
                  />
                  <InputGroup.Text>Sell Date</InputGroup.Text>
                  <Form.Control
                    type="date"
                    defaultValue="07-05-2022"
                    onChange={this.onChangeSellTimestamp}
                    isInvalid={this.state.coinInvalid}
                  />
                  </InputGroup>
                  
                </Form.Group>
                <br></br>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-50 mb-1"
                  disabled={this.state.loading}
                >
                  Calculate
                </Button>
                <br />
                <br></br>
                <br></br>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>Profit Using API</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={profitUsingAPI}
                      isInvalid={this.state.coinInvalid}
                    />
                    <InputGroup.Text>Actual Profit</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={profitUsingActualData}
                      isInvalid={this.state.coinInvalid}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>Accuracy Percentage</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={accuracyPercentage}
                      isInvalid={this.state.coinInvalid}
                    />
                  </InputGroup>
                </Form.Group>
                <br />
                <br></br>
                <Button href="./" className="w-15 ml-4">Go back</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
