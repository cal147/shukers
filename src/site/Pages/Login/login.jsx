import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Dimmer, Form, Loader, Message, Segment} from 'semantic-ui-react';
import * as PublicUserAction from '../publicActions/publicUserActions';
import publicUserStore from '../UserStore/PublicUserStore'

export default class login extends Component {

    state = {userName: null, password: null};

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
            loggedin: publicUserStore.getLoggedInStatus(),
            FormMessage: null,
            FormMessageCheck: false,
            Loader: null
        }
    }

    componentDidMount() {
        this.setState({Loader: null});
    }

    componentWillMount() {
        this.setState({Loader: <Dimmer active><Loader>Checking Login Details</Loader></Dimmer>});
    }

    handleSubmit(e) {
        e.preventDefault();
        PublicUserAction.userLoginPublic(this.state.userName, this.state.password);
        publicUserStore.getUser();

        setTimeout(() => this.loggedInTrueFalse(), 500);

        this.loggedInTrueFalse()
    };

    loggedInTrueFalse() {
        if (this.state.user.isLoggedIn === true) {
            this.setState({count: 0});
            window.location.reload();

        } else if (this.state.user.isLoggedIn === false && this.state.count === 2) {
            this.setState({
                FormMessage: <Message error header="Login failed" content="Please check login details"/>
            });
        }
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    render() {
        let mess = null;
        if (this.state.loggedin === true) {
            mess = <Message success header="Login Successful"
                            content="You can now purchase our fine products"/>
        }
        return (
            <div>
                <h2>Enter Login details</h2>
                <Segment inverted color="red">
                    {this.state.Loader}
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group>
                            <Form.Input label='User Name' placeholder='User Name' width={4}
                                        value={this.state.userName}
                                        required onChange={this.handelChangeUName.bind(this)}/>
                            <Form.Input label='Password' placeholder='Password' type='password'
                                        value={this.state.password} width={4} required
                                        onChange={this.handelChangePWord.bind(this)}/>
                        </Form.Group>
                        <Button type='submit' color="black">Login</Button>
                    </Form>
                    {this.state.FormMessage}
                    {mess}
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
                <Button as={Link} to="/ForgottenPassword" negative>Forgotten your password click here</Button>
            </div>
        )
    }
}