import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Form, Message, Segment} from 'semantic-ui-react';
import * as PublicUserAction from '../publicActions/publicUserActions';
import publicUserStore from '../UserStore/PublicUserStore'

export default class login extends Component {

    state = {userName: '', password: '', login: false};

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
            loggedin: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        PublicUserAction.userLoginPublic(this.state.userName, this.state.password);
        console.log(this.state.userName);
        console.log(this.state.password);
        this.setState({user: publicUserStore.getUser(), loggedin: true})

    };

    componentDidUpdate() {
        if (this.state.loggedin === true) {
            setTimeout(window.location.reload(), 1000)
        }
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    render() {

        let loginSuccess = null;
        if (this.state.loggedin === false) {
            loginSuccess = null;
        } else if (this.state.user.isLoggedIn === true) {
            loginSuccess = <Form success>
                <Message success header="Login Successful"
                         content="If nothing happens in 5 seconds please refresh the page. "/>
            </Form>
        } else if (this.state.user.isLoggedIn === false) {
            loginSuccess = <Form error>
                <Message error header="Login falied" content="Please check login details"/>
            </Form>
        }

        return (
            <div>
                <h2>Enter Login details</h2>
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
                        <Form.Group>
                            {loginSuccess}
                        </Form.Group>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
            </div>
        )
    }
}