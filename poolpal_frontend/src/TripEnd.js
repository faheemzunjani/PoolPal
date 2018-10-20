import React,{Component} from 'react';
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
export default class HospitalRecords extends Component{
    constructor(props)
    {
        super(props)
        //this.getPatientList = this.getPatientList.bind(this)
        this.getAcceptedRequests = this.getAcceptedRequests.bind(this)
        this.state = {

        }
    }

    async getAcceptedRequests()
    {
        console.log("fetching requests")
        let response = await fetch(`http://localhost:5000/getAcceptedRequests/${this.props.match.params.id}`)
        console.log("data received")
        let response_json = await response.json()
        var arr = response_json.result;
        console.log(arr)
        this.setState({
            list:arr
        })
    }
    componentDidMount()
    {
        this.getAcceptedRequests()
        let resp = fetch(`http://localhost:5000/endtrip/${this.props.match.params.id}`)

    }

    modifylist=(item)=>{
        console.log("in modifylist")
        var rec = JSON.stringify(item)
        let response = fetch(`http://localhost:5000/requestAccepted/${this.props.match.params.id}/${rec}`)
    }

    renderList(record){
        return(
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
                                Finish
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
                    <p>
                    <form onSubmit={this.requestsend}>
                        <Row>
                        <Col s={10} offset="s1">
                            <Col s={12}>
                                <label>Amount Paid</label>
                            </Col>
                            <Input
                                s={12}
                                id="item"
                                type="text"
                                className="validate"
                                placeholder="Enter amount paid"
                            />
                        </Col>
                        <Col s={10} offset="s1">
                            <Col s={12}>
                                <label>OTP</label>
                            </Col>
                            <Input
                                s={12}
                                id="description"
                                type="text"
                                className="validate"
                                placeholder="Enter OTP"
                            />
                        </Col>
                        </Row>
                    </form>
                    </p>
                </Modal>
                <Row style={filler4} />
            </div>
        )
    }
    tripEnd()
    {
        this.history.push(`/tripend/${this.props.match.params.id}`)
    }
    render(){
    //     if(this.state.list!=null)
    //     {
    //         return(
    //             <div>
    //                 <div>
    //                 <ul>
    //             {this.state.list.map((record)=>this.renderList(record))}
    //             </ul>
    //                 </div>
    //             </div>
    //         )
    //     }
    //     return(
    //         <div className={styles2.hospRecords}>
    //             <p>LOADING</p>
    //         </div>
    //     )
    // }
    if (this.state.list != null) {
        return (
            <div>
                <Navbar brand="Accepted Requests" right className="grey darken-4">
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
            </div>)
    }
    return (
        <div>
            <Navbar brand="Accepted Requests" right className="grey darken-4">
                <NavItem href="#">Profile</NavItem>
                <NavItem href="#">Logout</NavItem>
            </Navbar>
            <Row>
                <Col s={12} style={filler5} />
            </Row>
        </div>)
}
}











                // <form onSubmit={this.requestsend}>
                //     <Row>
                //         <Col s={10} offset="s1">
                //             <Col s={12}>
                //                 <label>Amount Paid</label>
                //             </Col>
                //             <Input
                //                 s={12}
                //                 id="item"
                //                 type="text"
                //                 className="validate"
                //                 placeholder="Enter amount paid"
                //             />
                //         </Col>
                //         <Col s={10} offset="s1">
                //             <Col s={12}>
                //                 <label>OTP</label>
                //             </Col>
                //             <Input
                //                 s={12}
                //                 id="description"
                //                 type="text"
                //                 className="validate"
                //                 placeholder="Enter OTP"
                //             />
                //         </Col>
                //     </Row>
                // </form>