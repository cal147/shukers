/*
This class is the access point to the admin application. This will be responsible for rendering either the page requested.
This listens to the user action data store for changes to the user details. A user needs to be a staff member and logged
in to pass the login screen.

There is error checking in this page which stops users just entering the a url and bypassing the login system.
 */

import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import adminUserStore from './AdminStores/AdminUserStore';
import AdminLogin from './AdminPages/AdminLogin';
import AdminLayout from './AdminLayout/AdminLayout';
import AdminHome from './AdminPages/AdminHome';


//This will be the component that will be displayed when the user is loggged in.
//It routes the the user to the pages they request.
const Routes = ()=>{
        this.state = adminUserStore.getUser();

    return(
        <BrowserRouter>
                <AdminLayout>
                <Switch>
                    <Route exact path="/admin" component={AdminHome}/>


                </Switch>
                </AdminLayout>
        </BrowserRouter>
    );

};

//This class checks to see if the user is logged in or not and directs them to the correct page.
export default class MainPage extends Component{

    constructor(){
        super();

        this.getUserOnChange = this.getUserOnChange.bind(this);

        //Gets user date
        this.state ={
            user: adminUserStore.getUser(),
        };

        //Displays component based on if is logged in or not
        if(this.state.user.isLoggedIn){
            // eslint-disable-next-line
            this.state.display = <Routes />;
        }else{
            // eslint-disable-next-line
            this.state.display = <AdminLogin error={this.state.user.logInError}/>;
        }
    }


    componentWillMount(){
        //Adds listener to the data store
        adminUserStore.on("change", this.getUserOnChange);

    }


    componentWillUnmount(){
        adminUserStore.removeListener("change", this.getUserOnChange);
    }

    //This is the function the change listener calls when it catches a change.
    getUserOnChange(){
        //Updates the current state.
        this.setState({
            user: adminUserStore.getUser(),
        });

        //Sets the component which is to be displayed based on the condition of the state.
        if(this.state.user.isLoggedIn && this.state.user.Staff){
            this.setState({display : <Routes /> });
        }else if(!this.state.user.isLoggedIn || this.state.user.logInError ){
            this.setState({display: <AdminLogin error={this.state.user.logInError}/>});
        }
    }

    //Displays the required page
    render(){

        return(
            <div>
                {this.state.display}
            </div>
        );
    }
}
