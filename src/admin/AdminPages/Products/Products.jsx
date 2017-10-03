
import React, {Component} from 'react';
import {Tab} from'semantic-ui-react'
import AddPane from './Add';
import ProdEdit from './edit'
import '../../AdminMaster.css';


export default class Products extends Component {


    constructor() {
        super();
        //Add more panes in the pane array.
        this.panes = [
            {menuItem: 'Products', render: () => <ProdEdit/>},
            {menuItem: 'Add', render: () => <AddPane/>},
        ]


    }



    render(){

        return(
            <Tab panes={this.panes}/>
        );
    }
}