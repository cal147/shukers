import React, {Component} from 'react';
import {Grid, Tab, Divider, Input, Table} from'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts} from '../../../shared/urls';

export default class CustomerSearch extends Component {


    constructor(){
        super();

        this.state = {
            user: adminUserStore.getUser(),
            selectedCat:null,
            searchQuery:"",
            customers: null,

        }

    }

    componentWillMount(){
        fetch(serverScripts + "admin/Controllers/customersController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_CUSTOMERS",
                sessionId: this.state.user.serverSession,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({customers: data});

        }).catch((err) => {
            console.error(err);
        });
    }

    selectCat(e){
        this.setState({selectedCat: e.target.value});
    }

    takeInput(e){
        this.setState({searchQuery:e.target.value});
    }

    rowClick(e, {id}){
        console.log("clicked row " + id);
    }

    render(){

        return(
            <Tab.Pane>
                <Grid>
                    <Grid.Row><Grid.Column><Divider horizontal>Filter</Divider></Grid.Column></Grid.Row>

                    <Grid.Row centered>
                        <Grid.Column width={2}>
                            <select className="ui selection dropdown" onChange={this.selectCat.bind(this)}>
                                <option value={null}>Filter By...</option>
                                <option value="loginId">Login ID</option>
                                <option value="surname">Surname</option>
                                <option value="contactNumber">Phone</option>
                                <option value="email">E-mail</option>
                                <option value="firstLine">Street</option>
                                <option value="postcode">Postcode</option>
                            </select>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Input fluid id="Search" placeholder='Search...' onChange={this.takeInput.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row><Grid.Column><Divider /></Grid.Column></Grid.Row>

                    <Grid.Row>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={2} textAlign="center">User ID</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">First Name</Table.HeaderCell>
                                    <Table.HeaderCell width={3} textAlign="center">Surname</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Phone</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Staff Member</Table.HeaderCell>
                                    <Table.HeaderCell width={3} textAlign="center">Email</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Number</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Street</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Postcode</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Home Address</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Delivery Address</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            {this.state.customers != null ? this.state.customers.map((item, i) =>
                                <Table.Row key={i} id={item.id} onClick={this.rowClick.bind(this)}>
                                    <Table.Cell textAlign="center">{item.loginId}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.forname}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.surname}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.contactNumber}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.isStaff?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.houseNum}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.street}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.postcode}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.home?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                    <Table.Cell textAlign="center">{item.delivery?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                </Table.Row>
                                )
                            :null}
                            </Table.Body>

                        </Table>


                    </Grid.Row>





                </Grid>


            </Tab.Pane>
        );
    }

}