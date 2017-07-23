import React, {Component} from "react";
import "./App.css";
import {HashRouter, Route, Switch} from "react-router-dom";

import home from "./site/Pages/Home/Home";
import About from "./site/Pages/About/About";
import SiteLayout from './site/Layout/layout'
import MainPage from './admin/index';
import "./site/Layout/Layout.css"


//This component will do the routing for the public side of the app.
const Site = ()=>{
                            //******************************************************
                            //          Chris put your routes in here              *
                            //******************************************************
  return(
      <HashRouter>
        <div className="publicPageLayout" >
            <SiteLayout>
                <Switch>
                    <Route exact path="/" component={home}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </SiteLayout>
        </div>
    </HashRouter>
  );

};



export default class App extends Component {

    constructor(){
        super();
        if(document.location.hash.indexOf('/admin') !== -1){ //Had to change to indexOf instead of include as IE doesnt support include.
            this.state = {siteToShow: <MainPage/>}; //The MainPage is the admin application.
        }else{
            this.state = {siteToShow: <Site/>}
        }


    }

    render() {


        return (
            <div>{this.state.siteToShow}</div>
        );

    }

}


