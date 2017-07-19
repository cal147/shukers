import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Input, Menu} from "semantic-ui-react";

export default class SiteLayout extends Component{

    state = {activeItem: 'home'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});


    render(){

        const {activeItem} = this.state;

        return(
            <Menu inverted color={'red'} stackable>
                <Menu.Item name='home' active={activeItem === 'home' } onClick={this.handleItemClick} as={Link} to='/'/>
                <Menu.Item name='about' active={activeItem === 'about' } onClick={this.handleItemClick} as={Link} to='/about'/>
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



        );

    }
}