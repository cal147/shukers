import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {Button, Segment} from 'semantic-ui-react';

export default class login extends Component {

    render() {

        return (
            <div>
                <Segment inverted color="red">
                    <form action="/resetpass.php" method="GET" className="ui form">
                        Email associated with the account<br/>
                        <div className="required four wide field">
                            <input type="email" name="email" className="ui input"/><br/>
                            <input type="submit" value="submit" className="ui black button"/>
                        </div>
                    </form>
                </Segment>
                <Button as={Link} to="/signUp" negative>To create an account click here</Button>
                <Button as={Link} to="/login" inverted color="red"> Already have an account login here</Button>
            </div>
        )
    }
}