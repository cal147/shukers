import React, {Component} from "react";
import "./App.css";
import {HashRouter, Route, Switch} from "react-router-dom";
import home from "./site/Pages/Home/Home";
import findUs from "./site/Pages/findUs/findUs";
import basket from "./site/Pages/basket/basket";
import login from "./site/Pages/Login/login";
import signUp from "./site/Pages/Login/SignUp";
import ForgottenPassword from "./site/Pages/Login/ForgottenPassword";
import product from "./site/Pages/products/products";
import myAccount from "./site/Pages/account/account";
import confirmation from "./site/Pages/confirmation/confirmation";
import SiteLayout from './site/Layout/layout'
import MainPage from './admin/index';
import "./site/Layout/Layout.css"

const Site = () => {

    return (
        <HashRouter>
            <div className="publicPageLayout">
                <SiteLayout>
                    <Switch>
                        <Route exact path="/" component={home}/>
                        <Route path="/findUs" component={findUs}/>
                        <Route path="/basket" component={basket}/>
                        <Route path="/products" component={product}/>
                        <Route path="/login" component={login}/>
                        <Route path="/signUp" component={signUp}/>
                        <Route path="/ForgottenPassword" component={ForgottenPassword}/>
                        <Route path="/myAccount" component={myAccount}/>
                        <Route path="/confirmation" component={confirmation}/>
                    </Switch>
                </SiteLayout>
            </div>
        </HashRouter>
    );

};


export default class App extends Component {

    constructor() {
        super();
        if (document.location.hash.indexOf('/admin') !== -1) { //Had to change to indexOf instead of include as IE doesnt support include.
            this.state = {siteToShow: <MainPage/>}; //The MainPage is the admin application.
        } else {
            this.state = {siteToShow: <Site/>}
        }


    }

    render() {


        return (
            <div>{this.state.siteToShow}</div>
        );

    }

}