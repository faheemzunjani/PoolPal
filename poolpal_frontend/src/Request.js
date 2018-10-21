import React, { Component } from 'react'
import styles from './css/Login.module.css';
import './index.css'
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
export default class Login extends Component {
    constructor() {
        super()
        this.requestsend = this.requestsend.bind(this)
    }
    requestsend(e) {
        e.preventDefault();
        var time = document.getElementById('time').value
        var item = document.getElementById('item').value
        var area = document.getElementById('pac-input').value
        console.log(time)
        console.log(item)
        console.log(area)
        fetch(`http://192.168.0.2:5000/storerequest/${this.props.match.params.id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "item": item,
                "area": area,
                "duration": time
            })
        })
        this.props.history.goBack()
    }
    componentDidMount() {
        console.log(document.getElementById('map'))
        let map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 25.4358, lng: 81.8463 },
            zoom: 13,
            mapTypeId: 'roadmap',
        });

        // var directionsService = new window.google.maps.DirectionsService();
        // var directionsDisplay = new window.google.maps.DirectionsRenderer();
        // var chicago = new window.google.maps.LatLng(41.850033, -87.6500523);
        // var mapOptions = {
        //   zoom:7,
        //   center: chicago
        // }
        // let map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        // directionsDisplay.setMap(map);

        // this.calculateAndDisplayRoute(directionsService, directionsDisplay);


        map.addListener('zoom_changed', () => {
            this.setState({
                zoom: map.getZoom(),
            });
        });

        map.addListener('maptypeid_changed', () => {
            this.setState({
                maptype: map.getMapTypeId(),
            });
        });

        let marker = new window.google.maps.Marker({
            map: map,
            position: { lat: 25.4358, lng: 81.8463 },
        });

        // initialize the autocomplete functionality using the #pac-input input box
        let inputNode = document.getElementById('pac-input');
        // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
        let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace();
            let location = place.geometry.location;

            this.setState({
                place_formatted: place.formatted_address,
                place_id: place.place_id,
                place_location: location.toString(),
            });

            console.log(this.state.place_formatted + " " + this.state.place_id + " " + this.state.place_location)

            // bring the selected place in view on the map
            map.fitBounds(place.geometry.viewport);
            map.setCenter(location);

            marker.setPlace({
                placeId: place.place_id,
                location: location,
            });
        });
    }
    render() {
        return (
            <div id="app">
                <Navbar brand="New Request" right className="grey darken-4">
                    <NavItem href={'/home/' + this.props.match.params.id + '/' + this.props.match.params.pwd}>Profile</NavItem>
                    <NavItem href={'/'}>Logout</NavItem>
                    <NavItem href={'/myrequests/' + this.props.match.params.id + '/' + this.props.match.params.pwd}>My Requests</NavItem>
                </Navbar>
                <Row style={rowHeight3} />
                <form onSubmit={this.requestsend}>
                    <Row>
                        {/* <Col s={10} offset="s1">
                            <Input s={12} type="select" defaultValue="" id="area">
                                <option value="" disabled>
                                    Pick Area
                                </option>
                                <option value="Civil Lines">Civil Lines</option>
                                <option value="Zero Road">Zero Road</option>
                                <option value="Jhalwa">Jhalwa</option>
                            </Input>
                        </Col> */}

                        
                        <Col s={10} offset="s1">
                            <Input
                                s={12}
                                id="item"
                                type="text"
                                className="validate"
                                placeholder="Enter item required"
                            />
                        </Col>
                        <Col s={10} offset="s1">
                            <Input
                                s={12}
                                name="on"
                                type="time"
                                id="time"
                                placeholder="Request expires after"
                                onChange={function (e, value) { }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={10} offset="s1">
                            <Col s={12}>
                            <div id='pac-container'>
                                <input id='pac-input' type='text' placeholder='Enter a location' />
                            </div>
                            </Col>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col s={10} offset="s1">
                            <Col s={12}>
                                <div id="map"></div>
                            </Col>  
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

        )
    }
}



{/* <div className={styles.signup}>
<div></div>
<div></div>
<div></div>    
<div></div>
<div className={styles.form}>           
    <form className={styles.insideform} onSubmit={this.requestsend}>
       <select className={styles.loginpageinput} id = "dropdown" ref = {(input)=> this.area = input}>
       <option value="Civil Lines">Civil Lines</option>
       <option value="Zero Road">Zero Road</option>
       <option value="Jhalwa">Jhalwa</option>
        </select>
        <input ref="time" className={styles.loginpageinput} type="text" placeholder="Enter time" />
        <input ref="item" className={styles.loginpageinput} type="text" placeholder="Enter item" />
        <button className={styles.signuppagebutton}>Send Request</button>
    </form>
</div>
<div></div> */}

