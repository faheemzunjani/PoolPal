import React, { Component } from 'react'
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
const rowHeight1 = {
    height: "15%"
};

const rowHeight2 = {
    height: "7%"
};
export default class Login extends Component {
    constructor() {
        super()
        this.handlesubmit2 = this.handlesubmit2.bind(this)
    }
    async handlesubmit2(e) {
        e.preventDefault()
        var id = document.getElementById('patid').value
        var pwd = document.getElementById('lpwd').value
        console.log(document.getElementById('patid').value)
        // console.log(pwd)
        // var dpwd = this.refs.dpwd.value
        // let response = await fetch(`http://localhost:5000/login/${id}/${pwd}`)
        // let response_json = await response.json();
        // let result = response_json.result;
        // console.log(result)
        // if(result!="Error")
        //{
        this.props.history.push(`/home/${id}/${pwd}`)

        //}

    }
    render() {
        return (
            <div>
                <Row style={rowHeight1} />
                <Row>
                    <Col s={4} offset="s4" className="blue-grey lighten-5 center-align">
                        <MediaBox
                            src="https://raw.githubusercontent.com/faheemzunjani/PoolPal/master/poolpal_frontend/src/images/icon.png"
                            className="circle valign-wrapper responsive-img"
                        />
                    </Col>
                </Row>
                <Row style={rowHeight2} />
                <form onSubmit={this.handlesubmit2}>
                    <Row>
                        <Col s={8} offset="s2">
                            <Input
                                s={12}
                                placeholder=" Google ID"
                                id="patid"
                                type="text"
                                className="validate"
                            />
                        </Col>
                        <Col s={8} offset="s2">
                            <Input
                                s={12}
                                placeholder=" Password"
                                id="lpwd"
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

        )
    }
}

