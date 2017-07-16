import React, {Component} from "react";
import "./App.css";
import {BrowserRouter, Link, Route} from "react-router-dom";

import {Dropdown, Input, Menu} from "semantic-ui-react";

import home from "./Pages/Home/Home";
import About from "./Pages/About/About";

export default class App extends Component {

    state = {activeItem: 'home'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;


        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Menu inverted color={'red'} stackable>
                            <Menu.Item name='home' active={activeItem === 'home' } onClick={this.handleItemClick}
                                       as={Link} to='/'/>
                            <Menu.Item name='about' active={activeItem === 'about' } onClick={this.handleItemClick}
                                       as={Link} to='/about'/>
                            <Dropdown item text={'Products'}>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Pork</Dropdown.Item>
                                    <Dropdown.Item>Beef</Dropdown.Item>
                                    <Dropdown.Item>Game</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Input icon='search' placeholder='Search...'/>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>

                        <hr/>

                        <Route exact path="/" component={home}/>
                        <Route path="/about" component={About}/>
                    </div>
                </BrowserRouter>
            </div>
        );

    }


}


