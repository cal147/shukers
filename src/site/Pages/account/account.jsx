import React, {Component} from "react";
import {Button, Form, Grid, Segment, Tab} from "semantic-ui-react";

import publicUserStore from '../UserStore/PublicUserStore'
import {serverScriptsPublic} from "../../../shared/urls";

export default class myAccount extends Component {

    state = {
        fName: '', lName: '', uName: '', contactNumber: '',
        currentPassword: '', newPassword: '', confPassword: '',
        OrderHistory: [], PurchaseHistory: []
    };

    formUserDetails = e => {

        if (this.state.fName === undefined) {
            this.setState({fName: this.state.user.firstName})
        }
        if (this.state.lName === undefined) {
            this.setState({lName: this.state.user.surName})
        }
        if (this.state.uName === undefined) {
            this.setState({uName: this.state.user.userName})
        }
        if (this.state.contactNumber === undefined) {
            this.setState({contactNumber: this.state.user.contactNum})
        }

    };

    // handel changes to input fields

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser()
        };
        this.panes = [
            // TODO - put finishing touches on eg. colour AND sort orders into individual sales
            {
                menuItem: 'Order History', render: () =>
                <Tab.Pane>
                    <Grid celled verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                Name
                            </Grid.Column>
                            <Grid.Column floated="right" textAlign="center">
                                Quantity
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                Price
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.OrderHistory != null ? this.state.OrderHistory.map((product, i) =>
                                <Grid.Row key={i}>
                                    <Grid.Column width={6}>
                                        {product.name}
                                    </Grid.Column>
                                    <Grid.Column floated="right" textAlign="center">
                                        {product.qty}
                                    </Grid.Column>
                                    <Grid.Column textAlign="center">
                                        £{product.price}
                                    </Grid.Column>
                                </Grid.Row>
                            ) :
                            <Grid.Column width={6} as='h3' textAlign="center">
                                You do not have any recent orders.
                            </Grid.Column>}
                    </Grid>
                </Tab.Pane>
            },
            {
                menuItem: 'Personal Details', render: () =>
                <Tab.Pane>
                    <div>
                        <h2>Please enter all the information required</h2>
                        <Segment inverted color="red">
                            <Form onSubmit={this.formUserDetails}>
                                <Form.Group>
                                    <Form.Input label='First Name' placeholder={this.state.user.firstName}
                                                value={this.state.fName}
                                                width={4} onChange={this.handelChangeFName.bind(this)}/>
                                    <Form.Input label='Last Name' placeholder={this.state.user.surName}
                                                value={this.state.lName} width={4}
                                                onChange={this.handelChangeLName.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='User Name' placeholder={this.state.user.userName}
                                                value={this.state.uName} width={8}
                                                onChange={this.handelChangeUName.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Contact Number' placeholder={this.state.user.contactNum}
                                                value={this.state.contactNumber} width={8}
                                                onChange={this.handelChangeCNum.bind(this)}/>
                                </Form.Group>
                                <Button type='submit' color="black">Sign Up</Button>
                            </Form>
                        </Segment>
                    </div>
                </Tab.Pane>
            },
            {
                menuItem: 'Change Password', render: () =>
                <Tab.Pane>
                    <div>
                        <h2>Please enter all the information required</h2>
                        <Segment inverted color="red">
                            <Form onSubmit={this.formUserDetails}>
                                <Form.Input label='Current Password*' placeholder='Current Password'
                                            value={this.state.currentPassword} width={8} type="password"
                                            required onChange={this.handelChangeCPass.bind(this)}/>
                                <Form.Input label='New Password*' placeholder='New Password'
                                            value={this.state.newPassword}
                                            width={8} required onChange={this.handelChangeNPass.bind(this)}/>
                                <Form.Input label='Confirm New Password*' placeholder='Confirm Password'
                                            value={this.state.confPassword} width={8}
                                            required onChange={this.handelChangeCNPass.bind(this)}/>
                                <Button type='submit' color="black">Sign Up</Button>
                            </Form>
                        </Segment>
                    </div>
                </Tab.Pane>
            },
            {
                menuItem: 'Previous Purchases', render: () =>
                <Tab.Pane>
                    <Grid celled verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                Name
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.PurchaseHistory != null ? this.state.PurchaseHistory.map((product, i) =>
                                <Grid.Row key={i}>
                                    <Grid.Column width={6}>
                                        {product.name}
                                    </Grid.Column>
                                </Grid.Row>
                            ) :
                            <Grid.Column width={6} as='h3' textAlign="center">
                                You do not have any recent purchases
                            </Grid.Column>}
                    </Grid>
                </Tab.Pane>
            },
            // this will be to show the customer what products they have bought in the past
        ]
    }

    handelChangeFName(e) {
        this.setState({fName: e.target.value})
    }

    handelChangeLName(e) {
        this.setState({lName: e.target.value})
    }

    handelChangeUName(e) {
        this.setState({uName: e.target.value})
    }

    handelChangeCNum(e) {
        this.setState({contactNumber: e.target.value})
    }

    handelChangeCPass(e) {
        this.setState({currentPassword: e.target.value})
    }

    handelChangeNPass(e) {
        this.setState({newPassword: e.target.value})
    }

    handelChangeCNPass(e) {
        this.setState({confPassword: e.target.value})
    }

    orderHistory() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_USERORDERHISTORY",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({OrderHistory: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    purchaseHistory() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_USERPURCHASEHISTORY",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({PurchaseHistory: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    componentWillMount() {
        this.orderHistory();
        this.purchaseHistory()
    }

    render() {

        return (
            <Tab panes={this.panes}/>

        )
    }
}