import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Dimmer, Form, Loader, Segment} from 'semantic-ui-react';
// import * as PublicUserAction from '../publicActions/publicUserActions';
import publicUserStore from '../UserStore/PublicUserStore'

export default class login extends Component {

    // TODO - work out secure way of changing password

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
        this.setState({Loader: <Dimmer active><Loader>Checking Username</Loader></Dimmer>});

        setTimeout(() => this.loadingState(), 5000);
    };

    loadingState() {
        this.setState({Loader: null})
    }

    handelChangeUName(e) {
        this.setState({userName: e.target.value})
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <h2>Please enter your username</h2>
                <Segment inverted color="red">
                    {this.state.Loader}
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group>
                            <Form.Input label='User Name' placeholder='User Name' width={4}
                                        value={this.state.userName}
                                        required onChange={this.handelChangeUName.bind(this)}/>
                            {/*<Form.Input label='Password' placeholder='Password' type='password'*/}
                            {/*value={this.state.password} width={4} required*/}
                            {/*onChange={this.handelChangePWord.bind(this)}/>*/}
                        </Form.Group>
                        <Button type='submit' color="black">Login</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
                <Button as={Link} to="/login" negative>Already have an account login here</Button>
            </div>
        )
    }
}