/*
    Orders the layout components on the page.
 */


import React, {Component} from 'react';
import HeaDer from './Header/Header';
import SideBar from './Header/SideBar';


export default class AdminLayout extends Component{


    render(){

        return(
            <div>
                <HeaDer/>
                <SideBar/>
                <div className="pagePosition"> {this.props.children}</div>
            </div>
        );
    }
}

