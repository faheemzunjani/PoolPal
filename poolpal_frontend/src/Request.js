import React, { Component } from 'react'
import styles from './css/Login.module.css';
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
        var area = document.getElementById('area').value
        console.log(time)
        console.log(item)
        console.log(area)
        fetch(`http://localhost:5000/storerequest/${this.props.match.params.id}`, {
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

    render() {
        return (
            <div>
                <Navbar brand="New Request" right className="grey darken-4">
                    <NavItem href={'/home/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>Profile</NavItem>
                    <NavItem href={'/'}>Logout</NavItem>
                    <NavItem href={'/myrequests/'+this.props.match.params.id+'/'+this.props.match.params.pwd}>My Requests</NavItem>
                </Navbar>
                <Row style={rowHeight3} />
                <form onSubmit={this.requestsend}>
                    <Row>
                        <Col s={10} offset="s1">
                            <Col s={12}>
                                <label>Area</label>
                            </Col>
                            <Input s={12} type="select" defaultValue="" id="area">
                                <option value="" disabled>
                                    Pick Area
                                </option>
                                <option value="Civil Lines">Civil Lines</option>
                                <option value="Zero Road">Zero Road</option>
                                <option value="Jhalwa">Jhalwa</option>
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
                                id="time"
                                onChange={function (e, value) { }}
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

