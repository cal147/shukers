import React, {Component} from "react";
import {Button, Form, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";

export default class SignUp extends Component {

    state = {firstName: '', lastName: '', userName: '', password: '', confirmPassword: '', contactNumber: ''};

    formSubmitUser = e => {

        if (this.state.password.length >= 6 && this.state.password === this.state.confirmPassword
        /* TODO look at this - && this.state.password.match(/^[A-Za-z0-9\-!"£$%^&*()]{6,20}$/)  */) {
            console.log('valid')
        } else if (this.state.password.length < 6) {
            console.log('Not Valid - Not enough characters')
        } else if (this.state.password !== this.state.confirmPassword) {
            console.log('Not Valid - passwords do not match')
        } else {
            console.log('Not Valid Password')
        }


        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.userName);
        console.log(this.state.password);
        console.log(this.state.confirmPassword);
        console.log(this.state.contactNumber);
    };

    // handel changes to input fields

    handelChangeFName(e) {
        this.setState({firstName: e.target.value})
    }

    handelChangeLName(e) {
        this.setState({lastName: e.target.value})
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    handelChangeCPWord(e) {
        this.setState({confirmPassword: e.target.value})
    }

    handelChangeCNum(e) {
        this.setState({contactNumber: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Please enter all the information required</h2>
                <Segment inverted color="red">
                    <Form onSubmit={this.formSubmitUser}>
                        <Form.Group>
                            <Form.Input label='First Name' placeholder='First Name' value={this.state.firstName}
                                        width={4} required onChange={this.handelChangeFName.bind(this)}/>
                            <Form.Input label='Last Name' placeholder='Last Name' value={this.state.lastName} width={4}
                                        required onChange={this.handelChangeLName.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='User Name' placeholder='User Name' value={this.state.userName} width={8}
                                        required onChange={this.handelChangeUName.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Password' placeholder='Password' type='password'
                                        value={this.state.password} width={4} required
                                        onChange={this.handelChangePWord.bind(this)}/>
                            <Form.Input label='Confirm Password' placeholder='Confirm Password' type='password'
                                        value={this.state.confirmPassword} width={4} required
                                        onChange={this.handelChangeCPWord.bind(this)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label='Contact Number' placeholder='Contact Number'
                                        value={this.state.contactNumber} width={8} required
                                        onChange={this.handelChangeCNum.bind(this)}/>
                        </Form.Group>
                        <Button type='submit' color="black">Sign Up</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/login" negative>Already have an account login here</Button>
            </div>
        )
    }
}