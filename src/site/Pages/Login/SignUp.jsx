import React, {Component} from "react";
import {Button, Form, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";

export default class SignUp extends Component {

    state = {
        firstName: '', lastName: '', userName: '', password: '', confirmPassword: '', contactNumber: '',
        postCode: '', houseNum: '', address2: null
    };

    formSubmitUser = e => {

        if (this.state.password.length < 6) {
            console.log('Not Valid - Not enough characters')
        }

        if (this.state.password !== this.state.confirmPassword) {
            console.log('Not Valid - passwords do not match')
        }

        if (!this.state.password.match(/^[A-Za-z0-9\-!"£$%^&*()]{6,20}$/)) {
            console.log('password not valid')
        }

        if (!this.state.postCode.match(/^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/)) {
            console.log('postcode not valid')
        }


        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.userName);
        console.log(this.state.password);
        console.log(this.state.confirmPassword);
        console.log(this.state.contactNumber);
        console.log(this.state.email);
        console.log(this.state.houseNum);
        console.log(this.state.address1);
        console.log(this.state.address2);
        console.log(this.state.city);
        console.log(this.state.postCode);
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
        this.setState({userName: e.target.value})
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

    handleChangeCity(e) {
        this.setState({city: e.target.value})
    }

    handleChangePCode(e) {
        this.setState({postCode: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Please enter all the information required</h2>
                <Segment inverted color="red">
                    <Form onSubmit={this.formSubmitUser}>
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
                                        width={8} onChange={this.handleChangeAdd2.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='City*' placeholder='City' value={this.state.city}
                                        width={4}
                                        required onChange={this.handleChangeCity.bind(this)}/>
                            <Form.Input label='Post Code*' placeholder='Post Code' value={this.state.postCode}
                                        width={4}
                                        required onChange={this.handleChangePCode.bind(this)} type="postcode"/>
                        </Form.Group>
                        <Button type='submit' color="black">Sign Up</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/login" negative>Already have an account login here</Button>
            </div>
        )
    }
}