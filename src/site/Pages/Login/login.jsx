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

    handleSubmit(e) {
        e.preventDefault();
        PublicUserAction.userLoginPublic(this.state.userName, this.state.password);
        console.log(this.state.userName);
        console.log(this.state.password);
        this.setState({user: publicUserStore.getUser()});

        console.log('user logged in ' + this.state.user.isLoggedIn);

        this.setState({Loader: <Dimmer active><Loader>Checking Login Details</Loader></Dimmer>});

        setTimeout(() => this.loadingState(), 5000, setTimeout(() => this.test(), 4500));
    };

    loadingState() {
        this.setState({Loader: null})
    }

    test() {
        if (this.state.user.isLoggedIn === true) {
            window.location.reload();
        } else if (this.state.user.isLoggedIn === false) {
            this.setState({
                FormMessage: <Message error header="Login falied" content="Please check login details"/>
            });
        }
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    handelChangePWord(e) {
        this.setState({password: e.target.value})
    }

    componentWillMount() {

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
                {/*TODO work out how to UPDATE password*/}
                <Button as={Link} to="#" negative>Forgotten your password click here</Button>
            </div>
        )
    }
}