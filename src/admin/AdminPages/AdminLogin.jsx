/*
    This is the display for the login window.
 */

import React, {Component} from 'react';
import * as AdminUserAction from '../AdminActions/AdminUserAction';
import salesStore from '../AdminStores/SalesStore'
import {Form, Container, Button, Header, Dimmer, Loader} from 'semantic-ui-react'



export default class AdminLogin extends Component{

    constructor(){
        super();
        this.state={
            loading:false,
        }
        this.container ={
            width: "25%",
            height:"Auto",
            marginLeft:"37.5%",
            marginTop: "10%",
            padding:"40px",
            border: "1px solid #e6e6e6",
            backgroundColor: "#e6e6e6",
            borderRadius: "25px"
        };
        this.error={
            color:"red",
            textAlign: "center",
            border: "1px solid red",
            borderRadius: "25px"
        }

   }

   componentWillMount(){
       this.setState({loading:true});
   }
   componentDidMount(){
       this.setState({loading:false});
   }

    //This handles the submit from the form. sends the users imput of for validation.
    handleSubmit (e){
        e.preventDefault();
        AdminUserAction.userLogin(this.refs.userName.value, this.refs.password.value);
        salesStore.getSales();
    };


    render(){

        return(
            <div style={this.container}>
                <Header as="h2" color={"red"}>Shukers Butchers Staff Login</Header>
                <Container textAlign={'center'}>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Field>
                            <label>User Name:</label>
                            <div className="ui input">
                                <input type="text" ref="userName"/>
                            </div>
                        </Form.Field>
                        <Form.Field >
                            <label>Password:</label>
                            <div className="ui input">
                                <input type="password" ref="password"/>
                            </div>
                        </Form.Field>
                        <Button type="submit" color={"blue"} size="huge">Submit</Button>
                    </Form>
                </Container>
                {this.props.error?<h2 style={this.error}>Enter the correct details</h2>:"" }
                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>
            </div>
        );
    }
}