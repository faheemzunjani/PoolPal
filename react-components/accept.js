import React from "react";
import { render } from "react-dom";
import {
  Button,
  Icon,
  Row,
  Col,
  Navbar,
  NavItem,
  Input,
  MediaBox,
  Card,
  CardTitle,
  Modal
} from "react-materialize";
import Child from "./Child.js";
import "./style.css";

const parent = {
  display: "flex",
  flexFlow: "column",
  width: "190px"
};
const body = {
  display: "none",
  color: "#fafafa"
};
const filler1 = {
  height: "20%"
};
const filler2 = {
  height: "15%"
};
const filler3 = {
  height: "5%"
};
const filler4 = {
  height: "10%"
};
const filler5 = {
  height: "2%"
};
const req_queue_style = {
  overflow: "auto"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      text: "",
      invisible: true
    };
  }

  listenName = e => {
    this.setState({
      name: e.target.value
    });
  };

  listenIngredients = e => {
    this.setState({
      text: e.target.value
    });
  };
  handleRecipe = e => {
    e.preventDefault();
    this.setState({
      name: "",
      text: "",
      data: this.state.data.concat([
        {
          message: this.state.name,
          text: this.state.text,
          id: Date.now(),
          showData: true,
          likes: 0,
          liked: false
        }
      ])
    });
  };

  delete = event => {
    var res = this.state.data.filter(function(el, id) {
      return el.id != event;
    });

    this.setState({
      data: res
    });
  };
  showForm = () => {
    this.setState({
      invisible: !this.state.invisible
    });
  };
  addLike = (event, showData, index, liked) => {
    var arr = this.state.data;
    if (!arr[index].liked) {
      arr[index].likes = arr[index].likes + 1;
      arr[index].liked = !arr[index].liked;
      this.setState({
        data: arr
      });
    } else {
      arr[index].likes = arr[index].likes - 1;
      arr[index].liked = !arr[index].liked;
      this.setState({
        data: arr
      });
    }
  };
  showData = (event, showData, index) => {
    var arr = this.state.data;
    arr[index].showData = !showData;
    this.setState({
      data: arr
    });
  };
  save = (el, id, txt) => {
    console.log(id);
    var arr = this.state.data;
    arr[id].message = el;
    arr[id].text = txt;

    this.setState({
      data: arr
    });
  };

  render() {
    const isEnabled = this.state.name.length > 0;
    return (
      <div className="blue-grey lighten-5">
        <Navbar brand="Requests" right className="grey darken-4">
          <NavItem href="#">Profile</NavItem>
          <NavItem href="#">Opened Requests</NavItem>
          <NavItem href="#">Logout</NavItem>
        </Navbar>
        <Row>
          <Col s={12} style={filler3} />
        </Row>
        <Row style={req_queue_style}>
          <Col s={8} offset="s2" className="center-align">
            <Modal
              header="Product Title"
              actions={
                <div>
                  <Button
                    flat
                    modal="close"
                    waves="light"
                    className="grey-text text-darken-4"
                  >
                    Accept
                  </Button>
                  <Button
                    flat
                    modal="close"
                    waves="light"
                    className="grey-text text-darken-4"
                  >
                    Dismiss
                  </Button>
                </div>
              }
              trigger={
                <Button className="white black-text">Product Title</Button>
              }
            >
              <p>Product Description</p>
            </Modal>
            <Row style={filler4} />
          </Col>
        </Row>
        <Row style={filler5} />
        <Row>
          <Col s={12} className="center-align">
            <Button waves="light" className="grey darken-4">
              View Accepted<Icon left>done_outline</Icon>
            </Button>
          </Col>
          <Col s={12} style={filler5} />
          <Col s={12} className="center-align">
            <Button waves="light" className="grey darken-4">
              End Trip<Icon left>location_off</Icon>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));