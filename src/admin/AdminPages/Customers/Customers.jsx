import React, {Component} from 'react';
import {Tab} from'semantic-ui-react';
import AddCustomers from './AddCustomers';
import CustomerSearch from './CustomerSearch';
import '../../AdminMaster.css';


export default class Products extends Component {

    constructor() {
        super();
        //Add more panes in the pane array.
        this.panes = [
            {menuItem: 'Search', render: () => <CustomerSearch />},
            {menuItem: 'Add New', render: () => <AddCustomers/>},
        ]


    }

    render(){

        return(
            <Tab panes={this.panes}/>
        );
    }
}