import React, {Component} from 'react';
import {Tab, Grid, Button} from 'semantic-ui-react';


/**
 *   Sets up the grid system for positioning components.
 *   This class allows the user to select their task and then a form is generated.
 */
export default class AddPane extends Component{

    constructor() {
        super();
        this.state = {
            activeComp:null,
        };
    }


    //Handles the button clicks. sets the active component based on the users click
    handleClick(e,{name}){

        switch(name){
            case "cat":
                this.setState({activeComp :<Cat/>});
                break;
            case "prod":
                this.setState({activeComp :<Prod/>});
                break;
            default: this.setState({activeComp :null});
        }
    }


    render(){
        return(
            <Tab.Pane>
                <Grid columns={'equal'}>
                    <Grid.Row columns={'16'} >
                        <Grid.Column width={'8'}>
                            <Button color={'red'} style={{margin:10}} name="cat" onClick={this.handleClick.bind(this)}>Add Category</Button>
                            <Button color={'red'} style={{margin:10}} name="prod" onClick={this.handleClick.bind(this)}>Add Product</Button>
                        </Grid.Column>
                    </Grid.Row>
                    {this.state.activeComp}

                </Grid>
            </Tab.Pane>

        );
    }

}

/**
 * Component must be made with a parent tag of Grid.Row. the child components will then be rendered in that row.
 * Component must be registered in the handleClick in add pane.
 */
class Cat extends Component{

    render(){
        return(
            <Grid.Row columns={'16'}>
                <Grid.Column width={'5'}>
                    <h1>Col 1 cat</h1>
                </Grid.Column>

                <Grid.Column>
                    <h1>Col 2 cat</h1>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

/**
 * Component must be made with a parent tag of Grid.Row. the child components will then be rendered in that row.
 * Component must be registered in the handleClick in add pane.
 */
class Prod extends Component{

    render(){
        return(
            <Grid.Row columns={'16'}>
                <Grid.Column width={'8'}>
                    <h1>Col 1 prod</h1>
                </Grid.Column>

                <Grid.Column width={'8'}>
                    <h1>Col 2 prod</h1>
                </Grid.Column>
            </Grid.Row>
        );
    }
}


