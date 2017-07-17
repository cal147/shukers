import React, {Component} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import home from "./site/Pages/Home/Home";
import About from "./site/Pages/About/About";
import SiteLayout from './site/Layout/layout'



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




export default class App extends Component {

    constructor(){
        super();

        if(document.location.pathname === '/admin'){
            //this.setState({siteToShow: null});
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


