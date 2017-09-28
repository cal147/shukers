import React, {Component} from 'react';
import '../AdminMaster.css';
import * as AdminUserAction from '../AdminActions/AdminUserAction';
import salesStore from '../AdminStores/SalesStore'
import adminUserStore from '../AdminStores/AdminUserStore';
import {serverScripts} from '../../shared/urls';

import {Grid, Divider, Input, Table, Modal, Button, Header, Icon, Dimmer, Loader} from'semantic-ui-react';

export default class OrderHistory extends Component{



    constructor(){
        super();

        this.events;

        this.state = {
            orders: null,
            user: adminUserStore.getUser(),
            arrayIndex: null,
            currentOrder:null,
            userDetailOpen: false,
            orderDetails: null,
            loading:false,
        }
        this.getAllSales();
    }

    getAllSales(){
        this.setState({loading:true});
        fetch(serverScripts+"admin/Controllers/SalesStoreController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_ALL_SALES",
                sessionId : this.state.user.serverSession
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=>{
            if(data.success) {
                this.setState({orders: data.sales});
            }
            this.setState({loading:false});
        }).catch((err)=>{
            console.error(err);
        });
    }


    rowClick(id){
        this.setState({loading:true});
        fetch(serverScripts+"admin/Controllers/SalesStoreController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_SALE_DETAILS",
                id:id,
                sessionId : this.state.user.serverSession
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=>{
            if(data.success) {

                this.setState({orderDetails: data.saledetails, userDetailOpen:true, currentOrder:id});
            }
            this.setState({loading:false});
        }).catch((err)=>{
            console.error(err);
        });


        this.setState({userDetailOpen:true});
    }

    render(){

        return(
            <div>
                <Grid>
                    <Grid.Row><Grid.Column><Divider horizontal>Order History</Divider></Grid.Column></Grid.Row>
                    <Grid.Row>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={1} textAlign="center">Sale ID</Table.HeaderCell>
                                    <Table.HeaderCell width={3} textAlign="center">Name</Table.HeaderCell>
                                    <Table.HeaderCell width={3} textAlign="center">Street</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Postcode</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Phone</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Sale Date</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Total</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Paid</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Dispatched</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Collection</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.orders != null ? this.state.orders.map((item, i) =>
                                        <Table.Row key={i} onClick={()=>this.rowClick(item.id, i)} className="customerTable">
                                            <Table.Cell textAlign="center">{item.id}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.name}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.street}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.postcode}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.contactNumber}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.saleDate}</Table.Cell>
                                            <Table.Cell textAlign="center">{"£"+item.totalPrice}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.paid?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.dispatched?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.collection?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                        </Table.Row>
                                    )
                                    :null}
                            </Table.Body>

                        </Table>
                    </Grid.Row>
                </Grid>

                <Modal open={this.state.userDetailOpen} >
                    <Header icon="shopping bag" content={'Order Details'} >

                    </Header>

                    <Modal.Content>
                        <Table celled>
                            <Table.Header>
                                <Table.Row textAlign={"center"}>
                                    <Table.HeaderCell width={3}>Product</Table.HeaderCell>
                                    <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                                    <Table.HeaderCell width={1}>Price Per Unit</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.orderDetails != null ? this.state.orderDetails.map((item, i) =>
                                    <Table.Row key={i}>
                                        <Table.Cell textAlign="center">{item.product}</Table.Cell>
                                        <Table.Cell textAlign="center">{item.qty}</Table.Cell>
                                        <Table.Cell textAlign="center">{item.price}</Table.Cell>
                                    </Table.Row>
                                ):null}

                            </Table.Body>

                        </Table>

                    </Modal.Content>
                    <h1></h1>

                    <Modal.Actions>
                        <Button color='blue' onClick={()=>{this.setState({userDetailOpen: false})}}>
                            <Icon name='checkmark' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>

            </div>


        );
    }
}