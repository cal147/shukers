import React, {Component} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import home from "./site/Pages/Home/Home";
import About from "./site/Pages/About/About";
import SiteLayout from './site/Layout/layout'
import MainPage from './admin/index';



const Site = ()=>{
  return(
      <BrowserRouter>
        <div>
            <SiteLayout/>
            <hr/>
            <Switch>
                <Route exact path="/" component={home}/>
                <Route path="/about" component={About}/>
            </Switch>
        </div>
    </BrowserRouter>
  );

};

const Admin = ()=>{
    return(
        <BrowserRouter>
                <Switch>
                    <Route exact path="/admin" component={MainPage}/>
                </Switch>
        </BrowserRouter>
    );
};



export default class App extends Component {

    constructor(){
        super();

        if(document.location.pathname === '/admin'){
            this.state = {siteToShow: <Admin/>};
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


