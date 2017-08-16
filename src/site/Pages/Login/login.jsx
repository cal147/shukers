import React, {Component} from "react";
import {Button, Form, Segment} from 'semantic-ui-react';

export default class login extends Component {

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <Segment inverted color="red">
                    <Form>
                        <Form.Group>
                            <Form.Input label='User Name' placeholder='User Name' width={4} required/>
                            <Form.Input label='Password' placeholder='Password' type='password' width={4} required/>
                        </Form.Group>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Segment>
            </div>
        )
    }
}