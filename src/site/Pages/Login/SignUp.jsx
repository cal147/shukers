import React, {Component} from "react";
import {Button, Checkbox, Dimmer, Form, Loader, Message, Segment} from 'semantic-ui-react';
import {Link, Redirect} from "react-router-dom";
import {serverScriptsPublic} from "../../../shared/urls";

export default class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
        email: '',
        houseNum: '',
        address1: '',
        address2: '',
        postCode: '',
        DelhouseNum: '',
        Deladdress1: '',
        Deladdress2: '',
        DelpostCode: '',
        message: null,
        deliveryAddressChecked: true,
        homeAddressChecked: true
    };

    formSubmitUser = e => {
        if (this.state.password.length < 6 || this.state.password !== this.state.confirmPassword ||
            !this.state.password.match(/^[A-Za-z0-9\-!"£$%^&*()]{6,20}$/) ||
            !this.state.postCode.match(/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/)) {
            if (this.state.password.length < 6) {
                this.setState({
                    message: <Message error><Message.Header>Password not long enough</Message.Header>Password must be 6
                        letters or longer</Message>
                })
            }

            if (this.state.password !== this.state.confirmPassword) {
                this.setState({
                    message: <Message error><Message.Header>Passwords do not match</Message.Header>Check both passwords
                        match</Message>
                })
            }

            if (!this.state.password.match(/^[A-Za-z0-9\-!"£$%^&*()]{6,20}$/)) {
                this.setState({
                    message: <Message error><Message.Header>Password does not meet complexity
                        requirements</Message.Header>Password must have at least 1 capital letter,
                        1 lower case letter and 1 of the following symbols - ! £ $ % ^ & * ( )</Message>
                })
            }

            if (!this.state.postCode.match(/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/)) {
                this.setState({
                    message: <Message error><Message.Header>Post Code is incorrect</Message.Header>Please check you have
                        entered your postcode and address in correctly</Message>
                })
            }
        } else {
            this.setState({Loader: <Dimmer active><Loader>Checking Sign Up Details</Loader></Dimmer>});
            this.setState({message: null});

            fetch(serverScriptsPublic + "Controllers/productsController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "NEW_USER",
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    userName: this.state.userName,
                    password: this.state.password,
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
                if (data.Message === "ok") {
                    this.setState({
                        message: <Message success><Message.Header>User successfully signed up</Message.Header>Please
                            go to the login page to purchase our products</Message>
                    });
                    this.setState({
                        passwordChangeConfirmation: data,
                        Loader: null,
                        redirect: <Redirect to={"/login"}/>
                    });
                }
            });

        }
    }
    ;

    // handle changes to input fields

    handleChangeFName(e) {
        this.setState({firstName: e.target.value})
    }

    handleChangeLName(e) {
        this.setState({lastName: e.target.value})
    }

    handleChangeUName(e) {
        this.setState({userName: e.target.value});


        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "CHECK_USER_NAME",
                userName: e.target.value,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "ok") {
                this.setState({userTaken: "\u2714", userTakenColour: "green"});
            } else {
                this.setState({userTaken: data.Message, userTakenColour: "blue"});
            }
        });

    }

    handleChangePWord(e) {
        this.setState({password: e.target.value})
    }

    handleChangeCPWord(e) {
        this.setState({confirmPassword: e.target.value})
    }

    handleChangeCNum(e) {
        this.setState({contactNumber: e.target.value})
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

    render() {
        let deliveryAddress = null;
        if (this.state.deliveryAddressChecked === false) {
            deliveryAddress =
                <Segment inverted tertiary>
                    <h4>Delivery Address</h4>
                    <Form.Group>
                        <Form.Input label='House Number' placeholder='Number' value={this.state.DelhouseNum}
                                    width={2}
                                    required onChange={this.handleChangeDelHNum.bind(this)} type='number'/>
                        <Form.Input label='Address 1' placeholder='Address 1' value={this.state.Deladdress1}
                                    width={6}
                                    required onChange={this.handleChangeDelAdd1.bind(this)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Address 2' placeholder='Address 2' value={this.state.Deladdress2}
                                    width={6} onChange={this.handleChangeDelAdd2.bind(this)}/>
                        <Form.Input label='Post Code' placeholder='Post Code' value={this.state.DelpostCode}
                                    width={2}
                                    required onChange={this.handleChangeDelPCode.bind(this)} type="postcode"/>
                    </Form.Group>
                </Segment>;
        }
        return (
            <div>
                <Segment inverted color="red">
                    {this.state.Loader}
                    <h2>Please enter all the information required</h2>
                    <Form onSubmit={this.formSubmitUser} error>
                        <Form.Group>
                            <Form.Input label='First Name*' placeholder='First Name' value={this.state.firstName}
                                        width={4} required onChange={this.handleChangeFName.bind(this)}/>
                            <Form.Input label='Last Name*' placeholder='Last Name' value={this.state.lastName}
                                        width={4}
                                        required onChange={this.handleChangeLName.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='User Name*' placeholder='User Name' value={this.state.userName}
                                        width={8}
                                        required onChange={this.handleChangeUName.bind(this)}/>
                            <span><h3 style={{color: this.state.userTakenColour}}>{this.state.userTaken}</h3></span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Password*' placeholder='Password' type='password'
                                        value={this.state.password} width={4} required
                                        onChange={this.handleChangePWord.bind(this)}/>
                            <Form.Input label='Confirm Password*' placeholder='Confirm Password' type='password'
                                        value={this.state.confirmPassword} width={4} required
                                        onChange={this.handleChangeCPWord.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Contact Number*' placeholder='Contact Number'
                                        value={this.state.contactNumber} width={3} required
                                        onChange={this.handleChangeCNum.bind(this)}/>
                            <Form.Input label='Email Address*' placeholder='shukersbutchers@gmail.com'
                                        value={this.state.email} width={5} required type="email"
                                        onChange={this.handleChangeEmail.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='House Number*' placeholder='Number' value={this.state.houseNum}
                                        width={2}
                                        required onChange={this.handleChangeHNum.bind(this)} type='number'/>
                            <Form.Input label='Address 1*' placeholder='Address 1' value={this.state.address1}
                                        width={6}
                                        required onChange={this.handleChangeAdd1.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Address 2' placeholder='Address 2' value={this.state.address2}
                                        width={6} onChange={this.handleChangeAdd2.bind(this)}/>
                            <Form.Input label='Post Code*' placeholder='Post Code' value={this.state.postCode}
                                        width={2}
                                        required onChange={this.handleChangePCode.bind(this)} type="postcode"/>
                        </Form.Group>
                        <Form.Group>
                            <Checkbox defaultChecked label="Home Address" disabled
                                      onChange={() => this.setState({homeAddressChecked: !this.state.homeAddressChecked})}/>
                        </Form.Group>
                        <Form.Group>
                            <Checkbox defaultChecked label="Delivery Address"
                                      onChange={() => this.setState({deliveryAddressChecked: !this.state.deliveryAddressChecked})}/>
                        </Form.Group>
                        <Form.Group>
                            {/*TODO - make checkbox a requirement*/}
                            <Form.Checkbox defaultChecked={false} className="signUpCheckbox" required
                                      label="I understand that Shukers Butchers can only deliver in the local region of the shop. Covering Liverpool,
                                      St. Helens and Warrington. If you purchase our products from out of the delivering area YOU WILL NEED TO COLLECT!"
                            />
                        </Form.Group>
                        {deliveryAddress}
                        {this.state.message}
                        <Button type='submit' color="black">Sign Up</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/login" negative>Already have an account login here</Button>
                {this.state.redirect}
            </div>
        )
    }
}