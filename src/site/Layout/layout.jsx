import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Menu, Search, Sidebar} from "semantic-ui-react";
import Header from "./Header/Header"
import Footer from "./Footer/Footer"


export default class SiteLayout extends Component {
    state = {activeItem: 'home', visible: false};

    toggleVisibility = () => this.setState({visible: !this.state.visible});


    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    constructor() {
        super();
        this.state = {
            width: 800
        }
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

        let winWidth = window.innerWidth;
        if (winWidth > 800) {

            const {activeItem} = this.state;

            return (
                <div>


                    <Header/>


                    <Menu inverted color={'red'} stackable>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link}
                                   to='/'/>
                        <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} as={Link}
                                   to='/about'/>
                        <Dropdown item text={'Products'}>
                            <Dropdown.Menu>
                                <Dropdown.Item>Pork</Dropdown.Item>
                                <Dropdown.Item>Beef</Dropdown.Item>
                                <Dropdown.Item>Game</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Search placeholder='Search...'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    {this.props.children}

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
                                 stackable>
                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}
                                       as={Link}
                                       to='/'/>
                            <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick}
                                       as={Link}
                                       to='/about'/>
                            <Dropdown item text={'Products'}>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Pork</Dropdown.Item>
                                    <Dropdown.Item>Beef</Dropdown.Item>
                                    <Dropdown.Item>Game</Dropdown.Item>
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


                    <Footer/>

                </div>
            );

        }
    }

}

