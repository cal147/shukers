import React, {Component} from 'react';
import { Menu} from 'semantic-ui-react';


export default class SideBar extends Component{


    constructor(){
        super();
        this.state = {
            activeItem: "",
        }


    }

    handleItemClick(name){
        this.setState({ activeItem: name });
    }


    render(){
        const { activeItem } = this.state || {};

        return(
            <Menu inverted color={"red"} vertical style={{position:"fixed", top:"55px"}} className="left fixed menu">
                <Menu.Item>
                    <div style={{marginBottom:'40px'}}></div>
                    <Menu.Header>Products</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='enterprise' ref="Ent" active={activeItem === 'enterprise'} onClick={this.handleItemClick.bind(this)} />
                        <Menu.Item name='consumer' active={activeItem === 'consumer'} onClick={this.handleItemClick.bind(this)} />
                    </Menu.Menu>
                </Menu.Item>



            </Menu>
        );
    }
}