import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Form, Segment} from 'semantic-ui-react';
import * as PublicUserAction from '../publicActions/publicUserActions';

export default class login extends Component {

    state = {userName: '', password: ''};

    handleSubmit(e) {
        e.preventDefault();
        PublicUserAction.userLogin(this.state.userName, this.state.password);

        console.log(this.state.userName);
        console.log(this.state.password);
    };

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <Segment inverted color="red">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group>
                            <Form.Input label='User Name' placeholder='User Name' width={4}
                                        value={this.state.userName}
                                        required onChange={this.handelChangeUName.bind(this)}/>
                            <Form.Input label='Password' placeholder='Password' type='password'
                                        value={this.state.password} width={4} required
                                        onChange={this.handelChangePWord.bind(this)}/>
                        </Form.Group>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}