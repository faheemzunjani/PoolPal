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
        alert("Seems like we ran out of time")
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
    componentDidMount() {
        var El_chico = {lat: 25.45072529999999, lng: 81.8436951};
        var b = {lat: 25.4494528, lng: 81.83953629999996};
        var c = {lat: 25.45127089999999, lng: 81.81293490000005};
        var d = {lat: 25.4545927, lng: 81.83478179999997};
        var e = {lat: 25.4595927, lng: 81.85478179999997};
        
        var place = new window.google.maps.LatLng(25.45072529999999, 81.8336951);
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 25.45072529999999, lng: 81.8336951},
          zoom: 13,
          mapTypeId: 'roadmap',
          clickableIcons: false
        });
    
    
        let marker = new window.google.maps.Marker({
          map: map,
          position: El_chico,
        });
        
        marker = new window.google.maps.Marker({
          map: map,
          position: b,
        });
    
        marker = new window.google.maps.Marker({
          map: map,
          position: c,
        });
    
        marker = new window.google.maps.Marker({
          map: map,
          position: d,
        });
    
        marker = new window.google.maps.Marker({
          map: map,
          position: e,
        });
      }
    
    render() {
        
        return (
            <div >
                <Navbar brand="Cab Pool" right className="grey darken-4">
                <NavItem href={'/home/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>Profile</NavItem>
                    <NavItem href={'/'}>Logout</NavItem>
                    <NavItem href={'/myrequests/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>My Requests</NavItem>
                </Navbar>
                
                <Row>
                    <Col s={12} className="center-align">
                        <div id='app'>
                            <div id='map' />
                        </div>
                    </Col>
                </Row>
                <Row style={filler2} />
                <Row>
                    <Col s={12} className="center-align">
                        <Button onClick={this.requestClick} waves="light" className="grey darken-4">
                            Request Pool<Icon left>directions_car</Icon>
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
