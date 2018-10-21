import React , {Component} from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Home from './Home'
import Login from './Login'
import Request from './Request'
import TripView from './TripView'
import TripEnd from './TripEnd'
import CabPool from './CabPool'
import MyRequests from './MyRequests'
import AcceptedRequests from './AcceptedRequests'


export default class Search extends Component {
    constructor(){
        super()
        //this.getRecords = this.getRecords.bind(this)
        // this.getAllRecords = this.getAllRecords.bind(this)
    }
    // getRecords(hash,records)
    // {
    //     console.log(hash)
    //     console.log(records)
    //     this.setState({
    //         hash:hash,
    //         records:records
    //     })
    // }
    // getAllRecords(hash,records)
    // {
    //     console.log(hash)
    //     console.log(records)
    //     this.setState({
    //         all_records:records
    //     })
    // }
    render(){
        return(
            <div>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home/:id/:pwd' component={Home}/>
            <Route exact path='/request/:id/:pwd' component={Request}/>
            <Route exact path='/tripview/:id' component={TripView} />
            <Route exact path='/tripend/:id' component={TripEnd} />
            <Route exact path='/cabpool/:id' component={CabPool} />
            <Route exact path='/myrequests/:id/:pwd' component={MyRequests}/>
            <Route exact path='/acceptedrequests/:id/:pwd' component={AcceptedRequests}/>
            </div>
        )
    }
}