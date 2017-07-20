import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Input, Menu} from "semantic-ui-react";

export default class SiteLayout extends Component {
    state = {activeItem: 'home'};
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
                                <Input icon='search' placeholder='Search...'/>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </div>
            );
        } else {
            return (
                <div><h1>Mobile Menu</h1></div>
            );

        }
    }

}

