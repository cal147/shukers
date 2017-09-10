import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Dimmer, Form, Loader, Message, Segment} from 'semantic-ui-react';
// import * as PublicUserAction from '../publicActions/publicUserActions';
import publicUserStore from '../UserStore/PublicUserStore'
import {serverScriptsPublic} from "../../../shared/urls";

export default class login extends Component {

    // TODO - work out secure way of changing password

    state = {userName: null, password: null, confirmPassword: null, usernameExist: null};

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
        this.setState({Loader: <Dimmer active><Loader>Checking Username</Loader></Dimmer>});


        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "USEREXIST",
                userName: this.state.userName
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({usernameExist: data});
        }).catch((err) => {
            console.error(err);
        });

        setTimeout(() => this.loadingState(), 3000);
        setTimeout(() => console.log(this.state.usernameExist), 3000);


    };

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({Loader: <Dimmer active><Loader>Changing Password</Loader></Dimmer>});


        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "UPDATE_PASSWORD",
                userName: this.state.usernameExist,
                pass: this.state.password,
                conPass: this.state.confirmPassword
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({passwordChangeConfirmation: data});
        }).catch((err) => {
            console.error(err);
        });

        setTimeout(() => this.loadingState(), 3000);
        setTimeout(() => console.log(this.state.usernameExist), 3000);


    };

    loadingState() {
        this.setState({Loader: null})
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

    componentWillMount() {

    }

    render() {

        let form = null;
        if (this.state.usernameExist == null) {
            form =
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <h2>Please enter your username to change your password</h2>
                    <Form.Input label='User Name' placeholder='User Name' width={8}
                                value={this.state.userName} required
                                onChange={this.handelChangeUName.bind(this)}/>
                    <Button type='submit' color="black">Check Username</Button>
                </Form>
        } else if (this.state.usernameExist === 1) {
            form =
                <Form onSubmit={this.handlePasswordChange.bind(this)}>
                    <Form.Group>
                        <Form.Input label='Password' placeholder='Password' type='password'
                                    value={this.state.password} width={4} required
                                    active
                                    onChange={this.handelChangePWord.bind(this)}/>
                        <Form.Input label='Confirm Password' placeholder='Confirm Password' type='password'
                                    value={this.state.confirmPassword} width={4} required
                                    onChange={this.handelChangeCPWord.bind(this)}/>
                    </Form.Group>
                    <Button type='submit' color="black">Change Password</Button>
                </Form>
        } else if (this.state.usernameExist === 0) {
            form =
                <Form onSubmit={this.handleSubmit.bind(this)} error>
                    <h2>Please re-enter your username</h2>
                    <Form.Input label='User Name' placeholder='User Name' width={8}
                                value={this.state.userName} required
                                onChange={this.handelChangeUName.bind(this)}/>

                    <Message error>
                        <Message.Header>Username not recognised</Message.Header>
                        Please check username to reset password or create
                        new account </Message>
                    <Button type='submit' color="black">Check Username</Button>
                </Form>
        }

        return (
            <div>
                <Segment inverted color="red">
                    {this.state.Loader}
                    {form}
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
                <Button as={Link} to="/login" inverted color="red"> Already have an account login here</Button>
            </div>
        )
    }
}