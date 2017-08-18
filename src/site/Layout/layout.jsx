import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu, Search, Sidebar} from "semantic-ui-react";
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import {serverScriptsPublic} from '../../shared/urls'

import publicUserStore from '../../site/Pages/UserStore/PublicUserStore'

export default class SiteLayout extends Component {
    state = {activeItem: 'home', visible: false};

    toggleVisibility = () => this.setState({visible: !this.state.visible});


    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            width: 800,
            user: publicUserStore.getUser()
        }
    }

    componentWillMount() {
        this.getMenuCategory();
    }

    getMenuCategory() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_MENUCATEGORY"
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        if (window.innerWidth < 500) {
            this.setState({width: 450});
        } else {
            let update_width = window.innerWidth - 100;
            this.setState({width: update_width});
        }
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }


    render() {

        if(this.state.user.isLoggedIn === true){console.log('logged in')}

        let winWidth = window.innerWidth;
        if (winWidth > 800) {

            const {activeItem} = this.state;

            return (
                <div>


                    <Header/>


                    <Menu className="publicNavBar" inverted color={'red'} stackable>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link}
                                   to='/'/>
                        <Menu.Item name='findUs' active={activeItem === 'findUs'} onClick={this.handleItemClick}
                                   as={Link} to='/findUs'/>
                        <Dropdown item text={'Products'}>
                            <Dropdown.Menu>
                                {this.state.Productsdata.map((product, i) => <Dropdown.Item
                                    key={product.cat} name='products' as={Link} to={"/products/" + product.cat}>
                                    {product.cat}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Menu position='right'>
                            <Menu.Item name='basket' active={activeItem === 'basket'} onClick={this.handleItemClick}
                                       as={Link} to='/basket'/>
                            <Menu.Item name='Login' active={activeItem === 'login'} onClick={this.handleItemClick}
                                       as={Link} to='/login'/>
                            <Menu.Item name='Sign Up' active={activeItem === 'signUp'} onClick={this.handleItemClick}
                                       as={Link} to='/signUp'/>
                            <Menu.Item>
                                <Search placeholder='Search...'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <div>{this.props.children}</div>
                    {/*TODO - WORKING TO DEGREE - footer currently on top of grid - Price*/}
                    <Footer/>


                </div>
            );
        } else {
            const {visible} = this.state;
            const {activeItem} = this.state;
            return (
                <div>

                    <Header/>


                    <Button onClick={this.toggleVisibility} icon="content" content="Menu" labelPosition="left"/>
                    <Sidebar.Pushable>
                        <Sidebar as={Menu} animation='scale down' width='wide' visible={visible} icon='labeled'
                                 stackable inverted color={"red"}>
                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}
                                       as={Link}
                                       to='/'/>
                            <Menu.Item name='findUs' active={activeItem === 'findUs'} onClick={this.handleItemClick}
                                       as={Link}
                                       to='/findUs'/>
                            <Dropdown item text={'Products'}>
                                <Dropdown.Menu>
                                    {this.state.Productsdata.map((product, i) => <Dropdown.Item
                                        key={product.cat} name='products' as={Link} to={"/products/" + product.cat}>
                                        {product.cat}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Item>
                                <Search placeholder="Search..."/>
                            </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            {this.props.children}
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                    <Footer className="siteFooter"/>

                </div>
            );
        }
    }
}