import React, {Component} from 'react';
import '../../AdminMaster.css';

import {Tab, Grid, Button, Label, Checkbox, Input} from 'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';

export default class AddCustomers extends Component{


    constructor() {
        super();
        this.state = {
            activeComp: null,
            user: adminUserStore.getUser(),
            postcode: "",
            street: "",
            houseNumber: "",
            email:"",
            surname:"",
            firstName:"",
            loginName:"",
            password:"",
            errorState: false,
            passwordMatch: "",
        };
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        //Code for client validation

        if(!this.state.errorState){
            //Code for the subnit in here
        }

    }

    takeInput(e, {id}){
        if(id != null){
            this.setState({[id]: e.target.value});
        }else{
            let pass2 = e.target.value;
            if (this.state.password === pass2){
                this.setState({passwordMatch: "Passwords Match \u2714", errorState: false});
            }else{
                this.setState({passwordMatch: "Passwords dont Match \u2716", errorState: true});
            }
        }


    }

    render() {
        return (
            <Tab.Pane>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Grid style={{marginTop:"20px", marginBottom:"20px"}}>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Login Name </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="loginName" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Forename </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="firstName" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                        <Grid.Column width={2} >
                            <Label basic pointing='right'>Surname </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input fluid id="surname" onChange={this.takeInput.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Email Address </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="email" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Staff Member</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Checkbox  />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>House Number </Label>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input fluid id="houseNumber" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Street </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="street" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Postcode </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="postcode" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Home Address</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Checkbox />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Delivery Address</Label>
                            </Grid.Column>
                            <Grid.Column >
                                <Checkbox />
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Button color={'red'} name="deliveryAddress">Delivery Address</Button>{/*TODO Add fields to enter a delivery address*/}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Password</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid type="password" id="password" onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Confirm Password</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid type="password" id={null} onChange={this.takeInput.bind(this)}/>
                                <span> {this.state.passwordMatch} </span>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row >
                            <Grid.Column >
                                <Button color={'red'} type="submit" className="ui button">Submit</Button>
                            </Grid.Column>
                        </Grid.Row>


                    </Grid>
                </form>
            </Tab.Pane>

        );
    }
}
