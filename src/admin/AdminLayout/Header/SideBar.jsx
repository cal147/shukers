import React, {Component} from 'react';
import { Menu, Icon,} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class SideBar extends Component{


    constructor(){
        super();
        this.state = {
            activeItem: "orders",
        };

        this.handleItemClick = this.handleItemClick.bind(this)

    }

    handleItemClick(e, { name }){
        this.setState({ activeItem: name });
    }


    render(){
        const { activeItem } = this.state;
        return(
            <Menu pointing vertical style={{position:"fixed", top:"60px"}} inverted color={"red"} className="left fixed menu">

                <Menu.Item as={Link} to="/" name='orders'  active={activeItem === 'orders'} onClick={this.handleItemClick} className="menu-spacing">
                    Orders <Icon name="info circle" />
                </Menu.Item>
                <Menu.Item as={Link} to="/products" name='products' icon="product hunt" active={activeItem === 'products'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="/customers" name='customers' icon="users" active={activeItem === 'customerFilter'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="/orderhistory" name='order history' icon="archive" active={activeItem === 'order history'} onClick={this.handleItemClick} className="menu-spacing"/>
            </Menu>
        );
    }
}