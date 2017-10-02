import React, {Component} from 'react';
import { Menu, Icon, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import salesStore from '../../AdminStores/SalesStore'

export default class SideBar extends Component{

    constructor(){
        super();
        this.state = {
            activeItem: "orders",
            salesCount: salesStore.getSalesCount(),
        };

        this.handleItemClick = this.handleItemClick.bind(this)

    }

    componentWillMount(){
        //Adds listener to the data store
        salesStore.on("change", this.saleStoreChange.bind(this));

    }

    componentWillUnmount(){
        salesStore.removeListener("change", this.saleStoreChange.bind(this));
    }

    saleStoreChange(){
        this.setState({
            salesCount: salesStore.getSalesCount(),
        });
    }

    handleItemClick(e, { name }){
        this.setState({ activeItem: name });
    }


    render(){
        const { activeItem } = this.state;
        return(
            <Menu pointing vertical style={{position:"fixed", top:"53px"}} inverted color={"red"} className="left fixed menu">

                <Menu.Item as={Link} to="/" name='orders'  active={activeItem === 'orders'} onClick={this.handleItemClick} className="menu-spacing">
                    Orders <Icon name="info circle" />{this.state.salesCount == 0?null:<Label color='teal' floating>{this.state.salesCount}</Label>}
                </Menu.Item>
                <Menu.Item as={Link} to="/products" name='products' icon="product hunt" active={activeItem === 'products'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="/customers" name='customers' icon="users" active={activeItem === 'customerFilter'} onClick={this.handleItemClick} className="menu-spacing"/>
                <Menu.Item as={Link} to="/orderhistory" name='order history' icon="archive" active={activeItem === 'order history'} onClick={this.handleItemClick} className="menu-spacing"/>
            </Menu>
        );
    }
}