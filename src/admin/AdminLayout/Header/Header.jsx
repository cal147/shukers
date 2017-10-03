import React, {Component} from 'react';
import {Menu, Header, Search} from 'semantic-ui-react';

import * as AdminUserAction from '../../AdminActions/AdminUserAction';
import adminUserStore from '../../AdminStores/AdminUserStore';


export default class HeaDer extends Component{

    constructor(){
        super();
        this.state = {
            activeItem: 'home',
            user: adminUserStore.getUser(),
            color:'red'
        }
    }


    handleItemClick(e, data){
        AdminUserAction.logoutUser();
    }//End

    render(){


        return(
            <Menu secondary inverted color={this.state.color} className="fixed">
                <Menu.Item> <Header style={{color:"white"}} size={"huge"}>Shukers Butchers Staff Portal</Header> </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item><Header size="medium" style={{color:"white"}}>Logged in as {this.state.user.firstName + " " + this.state.user.surName}</Header></Menu.Item>

                    <Menu.Item name='logout' onClick={this.handleItemClick.bind(this)} />
                </Menu.Menu>
            </Menu>
        );
    }//End of render

}//End of class