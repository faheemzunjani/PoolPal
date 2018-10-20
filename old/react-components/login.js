import React from "react";
import { render } from "react-dom";
import {
  MediaBox,
  Button,
  Icon,
  Row,
  Input,
  Card,
  CardTitle,
  Col
} from "react-materialize";
import Modal from "./Modal.js";
import Child from "./Child.js";
import "./style.css";

const parent = {
  display: "flex",
  flexFlow: "column",
  width: "190px"
};
const body = {
  display: "none"
};

const rowHeight1 = {
  height: "15%"
};

const rowHeight2 = {
  height: "7%"
};

<div className="blue-grey lighten-5">
        <Row style={rowHeight1} />
        <Row>
          <Col s={4} offset="s4" className="blue-grey lighten-5 center-align">
            <MediaBox
              src="https://github.com/faheemzunjani/PoolPal/blob/master/images/icon.png?raw=true"
              className="circle valign-wrapper responsive-img"
            />
          </Col>
        </Row>
        <Row style={rowHeight2} />
        <form>
          <Row>
            <Col s={8} offset="s2">
              <Input
                s={12}
                placeholder=" Google ID"
                id="id"
                type="text"
                className="validate"
              />
            </Col>
            <Col s={8} offset="s2">
              <Input
                s={12}
                placeholder=" Password"
                id="password"
                type="password"
                className="validate"
              />
            </Col>
          </Row>
          <Row>
            <p className="center-align">
              <Button waves="light" className="grey darken-4">
                LOGIN<Icon left>lock_open</Icon>
              </Button>
            </p>
          </Row>
        </form>
      </div>