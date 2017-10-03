import React, {Component} from "react";
import {Button, Checkbox, Dimmer, Form, Loader, Message, Segment, Tab} from "semantic-ui-react";

import publicUserStore from '../UserStore/PublicUserStore';
import {serverScriptsPublic} from "../../../shared/urls";

export default class myAccount extends Component {

    state = {
        currentPassword: '',
        newPassword: '',
        confPassword: '',
        SalesDetails: [],
        PurchaseHistory: [],
        PurchaseSalesHistory: [],
        counter: 0,
        deliveryAddress: []
    };

    formChangeUserDetails = e => {
        this.setState({Loader: <Dimmer active><Loader>Changing your address</Loader></Dimmer>});


        console.log('firstName - ' + this.state.fName);
        console.log('lastName - ' + this.state.lName);
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
        console.log('IS deliveryAddressChecked - ' + !this.state.deliveryAddressChecked);

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "UPDATE_ADDRESS",
                userID: this.state.user.id,
                firstName: this.state.fName,
                lastName: this.state.lName,
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
                deliveryAddressChecked: !this.state.deliveryAddressChecked,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "Address Updated") {
                alert('Your address have been changed')
            } else {
                alert('something went wrong!')
            }
            this.setState({Loader: null});
        }).then(

        ).catch((err) => {
            console.error(err);
        })

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
            this.setState({passwordChangeConfirmation: data}, () => this.setState({Loader: null}));
        }).catch((err) => {
            console.error(err);
        });

    };

    constructor() {
        super();

        this.state = {
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

            /*{// TODO - check other orders work well  //// TODO - maybe use segment instead of GRID ///// think about remove

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
                            {this.state.Loader}
                            <Form onSubmit={this.formChangeUserDetails}>

                                <Form.Group>
                                    <Form.Input label='First Name'
                                                placeholder={this.state.user.firstName}
                                                value={this.state.fName}
                                                width={4}
                                                onChange={this.handelChangeFName.bind(this)}/>
                                    <Form.Input label='Last Name'
                                                placeholder={this.state.user.surName}
                                                value={this.state.lName} width={4}
                                                onChange={this.handelChangeLName.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Contact Number'
                                                placeholder={this.state.user.contactNum}
                                                value={this.state.contactNumber} width={3}
                                                onChange={this.handelChangeCNum.bind(this)}/>
                                    <Form.Input label='Email Address'
                                                placeholder={this.state.user.email}
                                                value={this.state.email} width={5} type="email"
                                                onChange={this.handleChangeEmail.bind(this)}/>
                                </Form.Group>
                                {this.state.changeAddress}
                                <Form.Group>

                                    {this.state.DelCheck}

                                </Form.Group>
                                {this.state.deliveryAddressChecked === true ? null :
                                    <Segment inverted tertiary>
                                        <h4>Delivery Address</h4>
                                        {this.state.changeDeliveryAddress}
                                    </Segment>}

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
            }
        ]
    }

    componentWillMount() {
        // this.purchaseSalesHistory();
        this.checkForAddress();

    }

    checkForAddress() {
        this.setState({Loader: <Dimmer active><Loader>Changing Password</Loader></Dimmer>});
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_ADDRESS",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Address: data}, () => {
                data[0].deliveryAddress === false ?
                    this.setState({
                        Loader: null, deliveryAddressChecked: data[0].deliveryAddress,
                        DelCheck:
                            <Checkbox label="Delivery address same as home address"
                                      defaultChecked={data[0].deliveryAddress}
                                      onChange={() => this.setState({deliveryAddressChecked: !this.state.deliveryAddressChecked})}/>,
                        changeAddress:
                            <div>
                                <Form.Group>
                                    <Form.Input label='House Number'
                                                placeholder={data[0].houseNum}
                                                value={this.state.houseNum}
                                                width={2} type='number'
                                                onChange={this.handleChangeHNum.bind(this)}/>
                                    <Form.Input label='Address 1'
                                                placeholder={data[0].firstLine}
                                                value={this.state.address1}
                                                width={6}
                                                onChange={this.handleChangeAdd1.bind(this)}/>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Address 2'
                                                placeholder={data[0].secondLine}
                                                value={this.state.address2}
                                                width={6}
                                                onChange={this.handleChangeAdd2.bind(this)}/>
                                    <Form.Input label='Post Code'
                                                placeholder={data[0].postCode}
                                                value={this.state.postCode}
                                                width={2} type="postcode"
                                                onChange={this.handleChangePCode.bind(this)}/>
                                </Form.Group>
                            </div>,
                        changeDeliveryAddress:
                            <div>
                                <Form.Group>
                                    <Form.Input label='House Number'
                                                placeholder={data[1].delhouseNum}
                                                value={this.state.DelhouseNum}
                                                width={2}
                                                onChange={this.handleChangeDelHNum.bind(this)} type='number'/>
                                    <Form.Input label='Address 1'
                                                placeholder={data[1].delfirstLine}
                                                value={this.state.Deladdress1}
                                                width={6}
                                                onChange={this.handleChangeDelAdd1.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Address 2'
                                                placeholder={data[1].delsecondLine}
                                                value={this.state.Deladdress2}
                                                width={6}
                                                onChange={this.handleChangeDelAdd2.bind(this)}/>
                                    <Form.Input label='Post Code'
                                                placeholder={data[1].delpostCode}
                                                value={this.state.DelpostCode}
                                                width={2}
                                                onChange={this.handleChangeDelPCode.bind(this)}
                                                type="postcode"/>
                                </Form.Group>
                            </div>
                    }) : this.setState({
                        Loader: null, deliveryAddressChecked: data[0].deliveryAddress,
                        DelCheck:
                            <Checkbox label="Delivery address same as home address"
                                      defaultChecked={data[0].deliveryAddress}
                                      onChange={() => this.setState({deliveryAddressChecked: !this.state.deliveryAddressChecked})}/>,
                        changeAddress:
                            <div>
                                <Form.Group>
                                    <Form.Input label='House Number'
                                                placeholder={data[0].houseNum}
                                                value={this.state.houseNum}
                                                width={2} type='number'
                                                onChange={this.handleChangeHNum.bind(this)}/>
                                    <Form.Input label='Address 1'
                                                placeholder={data[0].firstLine}
                                                value={this.state.address1}
                                                width={6}
                                                onChange={this.handleChangeAdd1.bind(this)}/>

                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Address 2'
                                                placeholder={data[0].secondLine}
                                                value={this.state.address2}
                                                width={6}
                                                onChange={this.handleChangeAdd2.bind(this)}/>
                                    <Form.Input label='Post Code'
                                                placeholder={data[0].postCode}
                                                value={this.state.postCode}
                                                width={2} type="postcode"
                                                onChange={this.handleChangePCode.bind(this)}/>
                                </Form.Group>
                            </div>,
                        changeDeliveryAddress:
                            <div>
                                <Form.Group>
                                    <Form.Input label='House Number'
                                                value={this.state.DelhouseNum}
                                                width={2}
                                                onChange={this.handleChangeDelHNum.bind(this)} type='number'/>
                                    <Form.Input label='Address 1'
                                                value={this.state.Deladdress1}
                                                width={6}
                                                onChange={this.handleChangeDelAdd1.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input label='Address 2'
                                                value={this.state.Deladdress2}
                                                width={6}
                                                onChange={this.handleChangeDelAdd2.bind(this)}/>
                                    <Form.Input label='Post Code'
                                                value={this.state.DelpostCode}
                                                width={2}
                                                onChange={this.handleChangeDelPCode.bind(this)}
                                                type="postcode"/>
                                </Form.Group>
                            </div>
                    })
            });
        }).catch((err) => {
            console.error(err);
        });
    }

    handelChangeFName(e) {
        this.setState({fName: e.target.value})
    }

    handelChangeLName(e) {
        this.setState({lName: e.target.value})
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


    /*salesDetails(saleId) {
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
    }*/

    /*purchaseSalesHistory() {
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
    }*/


    render() {

        return (
            <div>
                <Tab panes={this.panes}/>
                {this.state.redirect}
                {console.log(this.state.deliveryAddressChecked)}
            </div>
        )
    }
}