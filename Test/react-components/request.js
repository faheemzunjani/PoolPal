import React from "react";
import { render } from "react-dom";
import {
  MediaBox,
  Navbar,
  NavItem,
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

const rowHeight3 = {
  height: "2%"
};

const rowHeight4 = {
  height: "24%"
};


<div className="blue-grey lighten-5">
        <Navbar brand="New Request" right className="grey darken-4">
          <NavItem href="#">Profile</NavItem>
          <NavItem href="#">Opened Requests</NavItem>
          <NavItem href="#">Logout</NavItem>
        </Navbar>
        <Row style={rowHeight3} />
        <form>
          <Row>
            <Col s={10} offset="s1">
              <Col s={12}>
                <label>Area</label>
              </Col>
              <Input s={12} type="select" defaultValue="" id="area">
                <option value="" disabled>
                  Pick Area
                </option>
                <option value="1">Civil Lines</option>
                <option value="2">Zero Road</option>
                <option value="3">Jhalwa</option>
              </Input>
            </Col>

            <Col s={10} offset="s1">
              <Col s={12}>
                <label>Request expires after</label>
              </Col>
              <Input
                s={12}
                name="on"
                type="time"
                id="exptime"
                onChange={function(e, value) {}}
              />
            </Col>
            <Col s={10} offset="s1">
              <Col s={12}>
                <label>Item Required</label>
              </Col>
              <Input
                s={12}
                id="item"
                type="text"
                className="validate"
                placeholder="Enter item required"
              />
            </Col>
            <Col s={10} offset="s1">
              <Col s={12}>
                <label>Additional Instructions</label>
              </Col>
              <Input
                s={12}
                id="description"
                type="text"
                className="validate"
                placeholder="Enter additional instructions"
              />
            </Col>
          </Row>
          <Row style={rowHeight4}>
            <Col s={10} offset="s1" />
          </Row>
          <Row>
            <p className="center-align">
              <Button waves="light" className="grey darken-4">
                Create Request<Icon left>add_circle_outline</Icon>
              </Button>
            </p>
          </Row>
        </form>
      </div>