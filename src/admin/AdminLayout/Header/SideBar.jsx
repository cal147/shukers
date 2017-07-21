import React, {Component} from 'react';
import { Menu, Icon,} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class SideBar extends Component{


    constructor(){
        super();
        this.state = {
            activeItem: "dashboard",
        }


    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render(){
        const { activeItem } = this.state;

        // inverted color={"red"} vertical style={{position:"fixed", top:"62px"}} className="left fixed menu"
        return(
            <Menu pointing vertical style={{position:"fixed", top:"60px"}} inverted color={"red"} className="left fixed menu">

                <Menu.Item as={Link} to="admin/dashboard" name='dashboard' icon="dashboard" active={activeItem === 'dashboard'} onClick={this.handleItemClick}  className="menu-spacing"/>
                <Menu.Item as={Link} to="admin/orders" name='orders'  active={activeItem === 'orders'} onClick={this.handleItemClick} className="menu-spacing">
                    Orders <Icon name="info circle" />
                </Menu.Item>
                <Menu.Item as={Link} to="admin/products" name='products' icon="product hunt" active={activeItem === 'products'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="admin/customers" name='customers' icon="users" active={activeItem === 'customers'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="admin/orderhistory" name='order history' icon="archive" active={activeItem === 'order history'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="admin/offers" name='offers' icon="wizard" active={activeItem === 'offers'} onClick={this.handleItemClick} className="menu-spacing"/>
            </Menu>
        );
    }
}