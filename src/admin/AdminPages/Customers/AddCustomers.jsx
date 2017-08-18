import React, {Component} from 'react';
import '../../AdminMaster.css';

import {Tab, Grid, Button, Label, Checkbox, Input} from 'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts, imgResource} from '../../../shared/urls';

export default class AddCustomers extends Component{


    constructor() {
        super();
        this.state = {
            activeComp: null,
            user: adminUserStore.getUser()
        };
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
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
                                <Input fluid/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Forename </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                        <Grid.Column width={2} >
                            <Label basic pointing='right'>Surname </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input fluid/>
                        </Grid.Column>
                    </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Email Address </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Staff Member</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Checkbox />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>House Number </Label>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input fluid/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Street </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Postcode </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid/>
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
                                <Input fluid type="password"/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Confirm Password</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid type="password"/>
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
