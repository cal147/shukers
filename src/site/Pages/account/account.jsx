import React, {Component} from "react";
import {Button, Checkbox, Dimmer, Form, Loader, Message, Modal, Segment, Tab, Table} from "semantic-ui-react";

import publicUserStore from '../UserStore/PublicUserStore'
import {serverScriptsPublic} from "../../../shared/urls";

export default class myAccount extends Component {

    state = {
        fName: '', lName: '', uName: '', contactNumber: '',
        currentPassword: '', newPassword: '', confPassword: '',
        SalesDetails: [], PurchaseHistory: [], PurchaseSalesHistory: [],
        counter: 0, deliveryAddressChecked: false, deliveryAddress: null
    };

    formChangeUserDetails = e => {

        if (this.state.firstName === undefined) {
            this.setState({firstName: this.state.user.firstName})
        }
        if (this.state.lastName === undefined) {
            this.setState({lastName: this.state.user.surName})
        }
        if (this.state.userName === undefined) {
            this.setState({userName: this.state.user.userName})
        }
        if (this.state.contactNumber === undefined) {
            this.setState({contactNumber: this.state.user.contactNum})
        }
        if (this.state.email === undefined) {
            this.setState({email: this.state.user.email})
        }
        if (this.state.houseNum === undefined) {
            this.setState({houseNum: this.state.user.houseNum})
        }
        if (this.state.address1 === undefined) {
            this.setState({address1: this.state.user.addressL1})
        }
        if (this.state.address2 === undefined) {
            this.setState({address2: this.state.user.addressL2})
        }
        if (this.state.postCode === undefined) {
            this.setState({postCode: this.state.user.postcode})
        }
        if (this.state.DelhouseNum === undefined) {
            this.setState({DelhouseNum: this.state.user.DelhouseNum})
        }
        if (this.state.Deladdress1 === undefined) {
            this.setState({Deladdress1: this.state.user.DeladdressL1})
        }
        if (this.state.Deladdress2 === undefined) {
            this.setState({Deladdress2: this.state.user.DeladdressL2})
        }
        if (this.state.DelpostCode === undefined) {
            this.setState({DelpostCode: this.state.user.Delpostcode})
        }

        console.log('firstName - ' + this.state.firstName);
        console.log('lastName - ' + this.state.lastName);
        console.log('userName - ' + this.state.userName);
        console.log('contactNumber - ' + this.state.contactNumber);
        console.log('email - ' + this.state.email);
        console.log('houseNum - ' + this.state.houseNum);
        console.log('address1 - ' + this.state.address1);
        console.log('address2 - ' + this.state.address2);
        console.log('postCode - ' + this.state.postCode);
        console.log('DelhouseNum - ' + this.state.DelhouseNum);
        console.log('Deladdress1 - ' + this.state.Deladdress1);
        console.log('Deladdress2 - ' + this.state.Deladdress2);
        console.log('DelpostCode - ' + this.state.DelpostCode);
        console.log('deliveryAddressChecked - ' + this.state.deliveryAddressChecked);

        setTimeout(() =>
                fetch(serverScriptsPublic + "Controllers/productsController.php", {
                    method: 'POST',
                    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    body: JSON.stringify({
                        action: "NEW_USER",
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        userName: this.state.userName,
                        contactNumber: this.state.contactNumber,
                        email: this.state.email,
                        houseNum: this.state.houseNum,
                        address1: this.state.address1,
                        address2: this.state.address2,
                        postCode: this.state.postCode,
                        DelhouseNum: this.state.DelhouseNum,
                        Deladdress1: this.state.Deladdress1,
                        Deladdress2: this.state.Deladdress2,
                        DelpostCode: this.state.DelpostCode,
                        deliveryAddressChecked: this.state.deliveryAddressChecked,
                        homeAddressChecked: this.state.homeAddressChecked,
                    }),
                    mode: 'cors'
                }).then(response => response.json()).then(data => {
                    this.setState({passwordChangeConfirmation: data});
                    this.setState({Loader: null});
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
            this.setState({Loader: null})
        }).catch((err) => {
            console.error(err);
        });

        setTimeout(() => this.loadingState(), 3000);

    };

    constructor() {
        super();
        this.state = {
            deliveryAddressChecked: false,
            user: publicUserStore.getUser(),
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

            /*{// TODO - check other orders work well  //// TODO - maybe use segment instead of GRID

                menuItem: 'Order History', render: () =>
                <Tab.Pane>
                    {this.state.PurchaseSalesHistory != null ? this.state.PurchaseSalesHistory.map((Sales, i) =>

                        <div>
                            <Modal
                                // dimmer='blurring'
                                onOpen={this.salesDetails(Sales.id)}
                                trigger={
                                    <Button fluid>
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
                                    </Button>}>
                                <Modal.Header>
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
                                </Modal.Header>
                                <Modal.Content scrolling>
                                    <Table unstackable celled striped color='orange' verticalAlign='middle'>
                                        <Table.Header>
                                            <Table.HeaderCell width={13}>Name</Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                                            <Table.HeaderCell textAlign="center">Sub Total</Table.HeaderCell>
                                        </Table.Header>
                                        <Table.Body>

                                            {this.state.SalesDetails != null ? this.state.SalesDetails.map((product, i) =>

                                                <Table.Row key={i}>
                                                    <Table.Cell>{product.name}{product.id}{Sales.id}</Table.Cell>
                                                    <Table.Cell textAlign="center">{product.qty}</Table.Cell>
                                                    <Table.Cell textAlign="center">£{product.price}</Table.Cell>
                                                    <Table.Cell textAlign="center">£{product.subPrice}</Table.Cell>
                                                </Table.Row>
                                            ) : null}
                                        </Table.Body>

                                    </Table><br/>
                                </Modal.Content>

                            </Modal>
                        </div>
                    ) : <h3>You do not have any recent orders.</h3>}

                </Tab.Pane>
            },*/
            {
                menuItem: 'Personal Details', render: () =>
                <Tab.Pane>
                    <div>
                        <h2>Please enter all the information required</h2>
                        <Segment inverted color="red">
                            <Form onSubmit={this.formChangeUserDetails}>
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
                                                value={this.state.contactNumber} width={3}
                                                onChange={this.handelChangeCNum.bind(this)}/>
                                    <Form.Input label='Email Address*' placeholder={this.state.user.email}
                                                value={this.state.email} width={5} type="email"
                                                onChange={this.handleChangeEmail.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='House Number*' placeholder={this.state.user.houseNum}
                                                value={this.state.houseNum}
                                                width={2} type='number'
                                                onChange={this.handleChangeHNum.bind(this)}/>
                                    <Form.Input label='Address 1*' placeholder={this.state.user.addressL1}
                                                value={this.state.address1}
                                                width={6} onChange={this.handleChangeAdd1.bind(this)}/>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Address 2' placeholder={this.state.user.addressL2}
                                                value={this.state.address2}
                                                width={6} onChange={this.handleChangeAdd2.bind(this)}/>
                                    <Form.Input label='Post Code*' placeholder={this.state.user.postcode}
                                                value={this.state.postCode}
                                                width={2} type="postcode" onChange={this.handleChangePCode.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Checkbox label="Delivery Address"
                                              defaultChecked={this.state.user.isDelivery == true ? true : false}
                                              onChange={() => this.setState({deliveryAddressChecked: !this.state.deliveryAddressChecked})}/>
                                </Form.Group>
                                {console.log('delivery address - ' + this.state.deliveryAddressChecked)}
                                {this.state.deliveryAddressChecked == false ? <Segment inverted tertiary>
                                    <h4>Delivery Address</h4>
                                    <Form.Group>
                                        <Form.Input label='House Number' placeholder='Number'
                                                    value={this.state.DelhouseNum}
                                                    width={2}
                                                    onChange={this.handleChangeDelHNum.bind(this)} type='number'/>
                                        <Form.Input label='Address 1' placeholder='Address 1'
                                                    value={this.state.Deladdress1}
                                                    width={6}
                                                    onChange={this.handleChangeDelAdd1.bind(this)}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input label='Address 2' placeholder='Address 2'
                                                    value={this.state.Deladdress2}
                                                    width={6} onChange={this.handleChangeDelAdd2.bind(this)}/>
                                        <Form.Input label='Post Code' placeholder='Post Code'
                                                    value={this.state.DelpostCode}
                                                    width={2}
                                                    onChange={this.handleChangeDelPCode.bind(this)} type="postcode"/>
                                    </Form.Group>
                                </Segment> : null}


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

    handleChangeEmail(e) {
        this.setState({email: e.target.value})
    }

    handleChangeHNum(e) {
        this.setState({houseNum: e.target.value})
    }

    handleChangeAdd1(e) {
        this.setState({address1: e.target.value})
    }

    handleChangeAdd2(e) {
        this.setState({address2: e.target.value})
    }

    handleChangePCode(e) {
        this.setState({postCode: e.target.value})
    }

    handleChangeDelHNum(e) {
        this.setState({DelhouseNum: e.target.value})
    }

    handleChangeDelAdd1(e) {
        this.setState({Deladdress1: e.target.value})
    }

    handleChangeDelAdd2(e) {
        this.setState({Deladdress2: e.target.value})
    }

    handleChangeDelPCode(e) {
        this.setState({DelpostCode: e.target.value})
    }


    salesDetails(saleId) {
        console.log(saleId)
        // fetch(serverScriptsPublic + "Controllers/productsController.php", {
        //     method: 'POST',
        //     headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
        //     body: JSON.stringify({
        //         action: "GET_USERORDERHISTORY",
        //         User: saleId
        //     }),
        //     mode: 'cors'
        // }).then(response => response.json()).then(data => {
        //     this.setState({SalesDetails: data});
        // }).catch((err) => {
        //     console.error(err);
        // });
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
        this.purchaseSalesHistory();
    }

    componentDidMount() {
        if (this.state.user.isDelivery == true) {
            this.setState({deliveryAddressChecked: true})
        } else if (this.state.user.isDelivery == false) {
            this.setState({deliveryAddressChecked: false})
        }
    }

    render() {

        return (
            <Tab panes={this.panes}/>

        )
    }
}