import React, { Component } from 'react';
import styles2 from './css/HospitalRecords.module.css'
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
export default class HospitalRecords extends Component {
    constructor(props) {
        super(props)
        //this.getPatientList = this.getPatientList.bind(this)
        this.getRequests = this.getRequests.bind(this)
        this.tripEnd = this.tripEnd.bind(this)
        this.state = {

        }
    }

    async getRequests() {
        console.log("fetching requests")
        let response = await fetch(`http://localhost:5000/getRequests/${this.props.match.params.id}`)
        console.log("data received")
        let response_json = await response.json()
        var arr = response_json.requests;
        console.log(arr)
        this.setState({
            list: arr
        })
    }
    componentDidMount() {
        this.getRequests()
        setInterval(async () => {
            let response = await fetch(`http://localhost:5000/confirmations/${this.props.match.params.id}`)
            let response_json = await response.json()
            var arr = response_json.result;
            // console.log(arr)
            if (arr.length != 0) {
                alert(`Payment Received for ${arr[0].item}`)
            }
        }, 100)
    }

    modifylist = async (item) => {
        console.log("in modifylist")
        var rec = JSON.stringify(item)
        let response = await fetch(`http://localhost:5000/requestAccepted/${this.props.match.params.id}/${rec}`)
        let respons = await fetch(`http://localhost:5000/getRequests/${this.props.match.params.id}`)
        console.log("data received")
        let respons_json = await respons.json()
        var arr = respons_json.requests;
        console.log(arr)
        this.setState({
            list: arr
        })
    }

    renderList(record) {
        return (
            // <div>
            // <button onClick={()=>this.modifylist(record)}>{record.item}</button>
            // </div>
            <div>
                <Modal
                    header={record.item}
                    actions={
                        <div>
                            <Button
                                onClick={() => this.modifylist(record)}
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
                        <Button className="white black-text">{record.item}</Button>
                    }
                >
                    <p>Requester Name:{record.id}</p>
                </Modal>
                <Row style={filler4} />
            </div>

        )
    }
    tripEnd() {
        this.props.history.push(`/tripend/${this.props.match.params.id}`)
    }
    render() {
        // if (this.state.list != null) {
        //     return (
        //         <div>
        //             <div>
        //                 <ul>
        //                     {this.state.list.map((record) => this.renderList(record))}
        //                 </ul>
        //                 <button onClick={this.tripEnd}>End Trip</button>
        //             </div>
        //         </div>
        //     )
        // }
        // return (
        //     <div className={styles2.hospRecords}>
        //         <button onClick={this.tripEnd}>End trip</button>
        //     </div>
        // )
        if (this.state.list != null) {
            return (
                <div>
                    <Navbar brand="Requests" right className="grey darken-4">
                        <NavItem href="#">Profile</NavItem>
                        <NavItem href="#">Logout</NavItem>
                    </Navbar>
                    <Row>
                        <Col s={12} style={filler3} />
                    </Row>
                    <Row style={req_queue_style}>
                        <Col s={8} offset="s2" className="center-align">
                            <ul>
                                {this.state.list.map((record) => this.renderList(record))}
                            </ul>
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
                            <Button onClick={this.tripEnd} waves="light" className="grey darken-4">
                                End Trip<Icon left>location_off</Icon>
                            </Button>
                        </Col>
                    </Row>
                </div>)
        }
        return (
            <div>
                <Navbar brand="Requests" right className="grey darken-4">
                    <NavItem href="#">Profile</NavItem>
                    <NavItem href="#">Logout</NavItem>
                </Navbar>
                <Row>
                    <Col s={12} className="center-align">
                        <Button waves="light" className="grey darken-4">
                            View Accepted<Icon left>done_outline</Icon>
                        </Button>
                    </Col>
                    <Col s={12} style={filler5} />
                    <Col s={12} className="center-align">
                        <Button onClick={this.tripEnd} waves="light" className="grey darken-4">
                            End Trip<Icon left>location_off</Icon>
                        </Button>
                    </Col>
                </Row>
            </div>)
    }
}
