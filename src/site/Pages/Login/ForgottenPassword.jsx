import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Form, Segment} from 'semantic-ui-react';

export default class login extends Component {

    constructor() {
        super();
        this.state = {
            emailpassword: '',
        }
    }



    passwordReset() {

        return <a href={"https://shukersbutchers.co.uk/Scrips/public/ResetPassword.php?email=" + this.state.emailpassword}/>;
    }

    render() {

        let email;

        return (
            <div>
                <Segment inverted color="red">
                    <Form onSubmit={"https://shukersbutchers.co.uk/Scrips/public/ResetPassword.php?email=" + email}>
                        <Form.Input label='Email attached to account' placeholder='shukersbutchers@gmail.com'
                                    type='email'
                                    value={this.state.emailpassword} width={8} required
                                    onChange={(e)=>{
                                            email = e.target.value
                                        }
                                    }/>

                        <Button type='submit' color="black">Change Password</Button>
                    </Form>
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
                <Button as={Link} to="/login" inverted color="red"> Already have an account login here</Button>
            </div>
        )
    }
}