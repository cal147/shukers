import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Form, Message, Segment} from 'semantic-ui-react';
import * as PublicUserAction from '../publicActions/publicUserActions';
import publicUserStore from '../UserStore/PublicUserStore'

export default class login extends Component {

    state = {userName: null, password: null, login: false};

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
            loggedin: false,
            FormMessage: null,
            FormMessageCheck: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        PublicUserAction.userLoginPublic(this.state.userName, this.state.password);
        console.log(this.state.userName);
        console.log(this.state.password);
        this.setState({user: publicUserStore.getUser()});


        this.setState({FormMessageCheck: true});
        setTimeout(() => this.test(), 0)
    };

    test() {
        if (this.state.FormMessageCheck === true) {
            console.log("message check");
            console.log(this.state.user.isLoggedIn);
            if (this.state.user.isLoggedIn === true) {
                this.setState({
                    FormMessage: <Message success header="Login Successful"
                                          content="If nothing happens in 5 seconds please refresh the page."/>
                });
                // window.location.reload();
                console.log("LOGGED IN");
            } else if (this.state.user.isLoggedIn === false) {
                this.setState({
                    FormMessage: <Message error header="Login falied" content="Please check login details"/>
                    , FormMessageCheck: false
                });
                console.log("FALSE LOGIN");
            }
        }
        if (this.state.user.isLoggedIn === true) {

        }
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    render() {


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
                        <Button type='submit'>Login</Button>
                    </Form>
                    {this.state.FormMessage}
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
            </div>
        )
    }
}