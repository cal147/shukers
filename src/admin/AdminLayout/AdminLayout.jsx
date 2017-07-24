/*
    Orders the layout components on the page.
 */


import React, {Component} from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';
import HeaDer from './Header/Header';
import SideBar from './Header/SideBar';


export default class AdminLayout extends Component{

    constructor(){
        super();

    }

    componentDidMount(){

    }


    render(){

        return(
            <div>
                <SideBar/>
                <HeaDer/>

               <div className="pagePosition"> {this.props.children}</div>
            </div>
        );
    }
}

