
import React, {Component} from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import adminUserStore from './AdminStores/AdminUserStore';
import AdminLogin from './AdminPages/AdminLogin';
import AdminLayout from './AdminLayout/AdminLayout';
import OrderHistory from './AdminPages/OrderHistory';
import Products from './AdminPages/Products/Products';
import Customers from './AdminPages/Customers/Customers';
import Orders from './AdminPages/Orders';

const Routes = ()=>{
    this.state = adminUserStore.getUser();

    return(
        <HashRouter basename="/admin">
            <AdminLayout>
                <Switch>
                    <Route exact path="/" component={Orders}/>
                    <Route exact path="/products" component={Products}/>
                    <Route exact path="/customers" component={Customers}/>
                    <Route exact path="/orderhistory" component={OrderHistory}/>
                </Switch>
            </AdminLayout>
        </HashRouter>
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