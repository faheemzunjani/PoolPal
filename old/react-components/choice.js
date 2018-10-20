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
  CardTitle
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
  display: "none",
  color: "#fafafa"
};
const filler1 = {
  height: "20%"
};
const filler2 = {
  height: "15%"
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
        <Navbar brand="Profile" right className="grey darken-4">
          <NavItem href="#">Profile</NavItem>
          <NavItem href="#">Opened Requests</NavItem>
          <NavItem href="#">Logout</NavItem>
        </Navbar>
        <Row>
          <Col s={12} style={filler1} />
        </Row>
        <Row>
          <Col s={4} offset="s4" className="center-align">
            <MediaBox
              src="https://raw.githubusercontent.com/faheemzunjani/PoolPal/master/images/user.png"
              caption="A demo media box1"
              className="circle responsive-img"
            />
          </Col>
          <Col s={8} offset="s2" className="center-align">
            <h5 className="grey-text text-darken-4">John Doe</h5>
          </Col>
        </Row>
        <Row style={filler2} />
        <Row>
          <Col s={12} className="center-align">
            <Button waves="light" className="grey darken-4">
              button<Icon left>add_circle_outline</Icon>
            </Button>
            <Button waves="light" className="grey darken-4">
              button<Icon right>done_outline</Icon>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

