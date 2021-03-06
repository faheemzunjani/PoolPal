import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
import Rating from "react-rating";

const filler1 = {
    height: "10vh"
};
const filler2 = {
    height: "8vh"
};
export default class Home extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.requestClick = this.requestClick.bind(this)
        this.initiateTrip = this.initiateTrip.bind(this)
        this.pooling = this.pooling.bind(this)

    }
    componentDidMount() {
        setInterval(async () => {
            let response = await fetch(`http://192.168.0.2:5000/notifications/${this.props.match.params.id}`)
            let response_json = await response.json()
            let result = response_json.result;
            // console.log(result.length)
            // console.log(result)
            if (result.length != 0) {
                var value = prompt("Your request has been accepted.Please make the required payment.")
                let resp = await fetch(`http://192.168.0.2:5000/payment/${this.props.match.params.id}/${value}/${JSON.stringify(result[0])}`)
                let resp_json = await resp.json();
                let rel = resp_json.result;
                if (rel != undefined) {
                    alert("Payment Successful.")
                }
            }

        }, 100)
    }

    requestClick(e) {
        e.preventDefault();
        this.props.history.push(`/request/${this.props.match.params.id}/${this.props.match.params.pwd}`)
    }
    initiateTrip(e) {
        e.preventDefault();
        this.props.history.push(`/tripview/${this.props.match.params.id}`)
    }
    pooling(e)
    {
        e.preventDefault()
        this.props.history.push(`/cabpool/${this.props.match.params.id}`)

    }
    render() {
        
        return (
            <div >
                <Navbar brand="Profile" right className="grey darken-4">
                <NavItem href={'/home/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>Profile</NavItem>
                    <NavItem href={'/'}>Logout</NavItem>
                    <NavItem href={'/myrequests/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>My Requests</NavItem>
                </Navbar>
                <Row>
                    <Col s={12} style={filler1} />
                </Row>
                <Row>
                    <Col s={4} offset="s4" className="center-align">
                        <MediaBox
                            src="https://raw.githubusercontent.com/faheemzunjani/PoolPal/master/poolpal_frontend/src/images/user.png"
                            caption="User"
                            className="circle responsive-img"
                        />
                    </Col>
                    <Col s={8} offset="s2" className="center-align">
                        <h5 className="grey-text text-darken-4">{this.props.match.params.id}</h5>
                    </Col>
                    <Col s={8} offset="s2" className="center-align">
                    <Rating 
                        initialRating={2.5}
                        readonly
                    />
                    </Col>
                </Row>
                <Row style={filler2} />
                <Row>
                    <Col s={12} className="center-align">
                        <Col s={6}>
                        <Button onClick={this.requestClick} waves="light" className="grey darken-4">
                            Request<Icon left>add_circle_outline</Icon>
                        </Button>
                        </Col>
                        <Col s={6}>
                        <Button onClick={this.initiateTrip} waves="light" className="grey darken-4">
                            New Trip<Icon right>done_outline</Icon>
                        </Button>
                        </Col>
                    </Col>
                </Row>
                <Row>    
                    <Col s={12} />
                    <p align="center">
                        <Button onClick={this.pooling} floating large className='grey darken-4' waves='light' icon='directions_car' />
                    </p>
                </Row>
            </div>
        )
    }
}
