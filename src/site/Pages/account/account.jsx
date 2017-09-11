import React, {Component} from "react";
import {Button, Dimmer, Form, Loader, Message, Segment, Tab, Table} from "semantic-ui-react";

import publicUserStore from '../UserStore/PublicUserStore'
import {serverScriptsPublic} from "../../../shared/urls";

export default class myAccount extends Component {

    state = {
        fName: '', lName: '', uName: '', contactNumber: '',
        currentPassword: '', newPassword: '', confPassword: '',
        OrderHistory: [], PurchaseHistory: [], PurchaseSalesHistory: []
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

        setTimeout(() =>
                fetch(serverScriptsPublic + "Controllers/productsController.php", {
                    method: 'POST',
                    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    body: JSON.stringify({
                        action: "USEREXIST",
                        userName: this.state.userName
                    }),
                    mode: 'cors'
                }).then(response => response.json()).then(data => {
                    this.setState({usernameExist: data});
                }).catch((err) => {
                    console.error(err);
                })
            , 3000);

    };

    formChangePassword = e => {
        this.setState({Loader: <Dimmer active><Loader>Changing Password</Loader></Dimmer>});


        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "CHANGE_PASSWORD",
                userID: this.state.user.id,
                currPass: this.state.currentPassword,
                pass: this.state.newPassword,
                conPass: this.state.confirmPassword
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({passwordChangeConfirmation: data});
        }).catch((err) => {
            console.error(err);
        });

        setTimeout(() => this.loadingState(), 3000);

    };

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser()
        };
        let confirmPasswordChange = null;
        let form =
            <Form onSubmit={this.formChangePassword}>
                <Form.Input label='Current Password*' placeholder='Current Password'
                            value={this.state.currentPassword} width={8} type="password"
                            required onChange={this.handelChangeCPass.bind(this)}/>
                <Form.Input label='New Password*' placeholder='New Password'
                            value={this.state.newPassword} type="password"
                            width={8} required onChange={this.handelChangeNPass.bind(this)}/>
                <Form.Input label='Confirm New Password*' placeholder='Confirm Password'
                            value={this.state.confPassword} width={8} type="password"
                            required onChange={this.handelChangeCNPass.bind(this)}/>
                <Button type='submit' color="black">Change Password</Button>
            </Form>;
        if (this.state.passwordChangeConfirmation === 0) {
            confirmPasswordChange = <Message error>
                <Message.Header>Passwords do not match</Message.Header>
                Please check that you have entered both new passwords in the same</Message>
        }
        form =
            <Form onSubmit={this.formChangePassword}>
                <Form.Input label='Current Password*' placeholder='Current Password'
                            value={this.state.currentPassword} width={8} type="password"
                            required onChange={this.handelChangeCPass.bind(this)}/>
                <Form.Input label='New Password*' placeholder='New Password'
                            value={this.state.newPassword} type="password"
                            width={8} required onChange={this.handelChangeNPass.bind(this)}/>
                <Form.Input label='Confirm New Password*' placeholder='Confirm Password'
                            value={this.state.confPassword} width={8} type="password"
                            required onChange={this.handelChangeCNPass.bind(this)}/>
                {confirmPasswordChange}
                <Button type='submit' color="black">Change Password</Button>

            </Form>;
        if (this.state.passwordChangeConfirmation >= 1) {
            form = <Message success>
                <Message.Header>Password Changed!</Message.Header>
                Please log in to your account now!</Message>
        }
        this.panes = [

            {// TODO - check other orders work well  //// TODO - maybe use segment instead of GRID

                menuItem: 'Order History', render: () =>
                <Tab.Pane>
                    {this.state.PurchaseSalesHistory != null ? this.state.PurchaseSalesHistory.map((Sales, i) =>

                        <div>
                            <Table unstackable color='red'>
                                <Table.Header key={i}>
                                    <Table.HeaderCell textAlign="center" width='5'>Order Number
                                        - {Sales.id}</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center" width='5'>Order Date
                                        - {Sales.saleDate}</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center" width='5'>Total Price -
                                        £{Sales.totalPrice}</Table.HeaderCell>
                                </Table.Header>
                            </Table>
                            <Table unstackable celled striped color='orange' verticalAlign='middle'>
                                <Table.Header>
                                    <Table.HeaderCell width={13}>Name</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Sub Total</Table.HeaderCell>
                                </Table.Header>
                                <Table.Body>

                                    {/*TODO - SORT this out*/}

                                    {this.state.OrderHistory != null ? this.state.OrderHistory.map((product, i) =>

                                        <Table.Row key={i}>
                                            <Table.Cell>{product.name}{product.id}{Sales.id}</Table.Cell>
                                            <Table.Cell textAlign="center">{product.qty}</Table.Cell>
                                            <Table.Cell textAlign="center">£{product.price}</Table.Cell>
                                            <Table.Cell textAlign="center">£{product.subPrice}</Table.Cell>
                                        </Table.Row>
                                    ) : null}
                                </Table.Body>

                            </Table><br/>
                        </div>
                    ) : <h3>You do not have any recent orders.</h3>}

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
                                <Button type='submit' color="black">Change Details</Button>
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
                            {this.state.Loader}
                            {form}
                        </Segment>
                    </div>
                </Tab.Pane>
            },
            /*{
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
            },*/
            // this will be to show the customer what products they have bought in the past
        ]
    }

    loadingState() {
        this.setState({Loader: null})
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

    purchaseSalesHistory() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_USERSALESHISTORY",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({PurchaseSalesHistory: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    componentWillMount() {
        this.orderHistory();
        this.purchaseSalesHistory();
    }

    render() {

        return (
            <Tab panes={this.panes}/>

        )
    }
}