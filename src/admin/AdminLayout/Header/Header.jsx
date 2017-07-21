import React, {Component} from 'react';
import {Menu, Input, Icon, Header, Search} from 'semantic-ui-react';

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

    //This checks to see if the enter key has been pressed. If so you can do the required process in here.
    handleKeyPress(e){
        if(e.key === 'Enter'){
            let searchQuery = document.getElementById('searchBar');
            console.log('You entered: ' + searchQuery.value)
            //Code after the enter key has been pressed to go in here.
        }
    }//End

    render(){


        return(
            <Menu secondary inverted color={this.state.color} className="fixed">
                <Menu.Item>
                    <Search placeholder='Search...' id="searchBar" onKeyPress={this.handleKeyPress.bind(this)}/>


                </Menu.Item>
                <Menu.Item> <Header style={{color:"white"}} size={"huge"}>Shukers Butchers staff portal</Header> </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item><Header size="medium" style={{color:"white"}}>Logged in as {this.state.user.userName}</Header></Menu.Item>

                    <Menu.Item name='logout' onClick={this.handleItemClick.bind(this)} />
                </Menu.Menu>
            </Menu>
        );
    }//End of render


}//End of class