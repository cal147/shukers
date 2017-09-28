import React, {Component} from 'react';
import {Grid, Tab, Divider, Input, Table, Modal, Button, Header, Icon, Checkbox, Dimmer, Loader} from'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts} from '../../../shared/urls';

import './customers.css';

export default class CustomerSearch extends Component {


    constructor(){
        super();

        this.state = {
            user: adminUserStore.getUser(),
            selectedCat:null,
            searchQuery:"",
            customers: null,
            userDetailOpen: false,
            customer: null,
            arrayIndex: null,
            updateRecord: [],
            customerFilter: null,
            loading:false
        }

    }

    componentWillMount(){
        this.getCustomerList();
        this.setState({loading:true});
    }

    componentDidMount(){
        this.setState({loading:false});
    }

    getCustomerList(){
        this.setState({loading:true});
        fetch(serverScripts + "admin/Controllers/customersController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_CUSTOMERS",
                sessionId: this.state.user.serverSession,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({customers: data, customerFilter: data, loading:false});

        }).catch((err) => {
            console.error(err);
        });
    }

    rowClick(id , arrIndex){
        this.setState({arrayIndex: arrIndex, userDetailOpen:true});
    }

    deleteUser(id){
        this.setState({loading:true});
        fetch(serverScripts + "admin/Controllers/customersController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "DELETE_USER",
                sessionId: this.state.user.serverSession,
                id: id,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            if(data.success){
                this.setState({userDetailOpen: false, arrayIndex: null, loading:false});
                this.getCustomerList();
            }
        }).catch((err) => {
            console.error(err);
        });

    }

    updateUser(id, loginId, forname, surname, houseNum, street, postcode, contactNumber, email, delivery, home, isStaff, addressId){
        this.setState({loading:true});
        console.log("Home ", home , " delivery ", delivery);
        fetch(serverScripts + "admin/Controllers/customersController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "UPDATE_USER",
                sessionId: this.state.user.serverSession,
                id:id,
                addressId : addressId,
                loginId:loginId,
                forname:forname,
                surname:surname,
                houseNum:houseNum,
                street:street,
                postcode:postcode,
                contactNumber:contactNumber,
                email:email,
                delivery:delivery,
                home:home,
                isStaff:isStaff,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            if(data.success){
                this.setState({userDetailOpen: false, arrayIndex: null, loading:false});
                this.getCustomerList();
            }
        }).catch((err) => {
            console.error(err);
        });

    }

    handleFilter(){

        let tempArr = [];

        if(this.state.selectedCat != null && this.state.searchQuery != ""){
            this.setState({customerFilter: null}, ()=>{
                this.state.customers.map((item, i)=>{
                   for(let k in item){
                       if( k==this.state.selectedCat && item[k].indexOf(this.state.searchQuery) != -1){
                           tempArr.push(item);
                       }
                   }

                });
                this.setState({customerFilter:tempArr});
            });


        }
    }


    render(){

        let id;
        let addressId;
        let loginId;
        let forname;
        let surname;
        let houseNum;
        let street;
        let postcode;
        let contactNumber;
        let email;
        let delivery;
        let home;
        let isStaff;


        if(this.state.customerFilter!=null && this.state.arrayIndex !=null){
            id = this.state.customerFilter[this.state.arrayIndex].id;
            addressId = this.state.customerFilter[this.state.arrayIndex].addressId;
            loginId = this.state.customerFilter[this.state.arrayIndex].loginId;
            forname = this.state.customerFilter[this.state.arrayIndex].forname;
            surname = this.state.customerFilter[this.state.arrayIndex].surname;
            houseNum = this.state.customerFilter[this.state.arrayIndex].houseNum;
            street = this.state.customerFilter[this.state.arrayIndex].street;
            postcode = this.state.customerFilter[this.state.arrayIndex].postcode;
            contactNumber = this.state.customerFilter[this.state.arrayIndex].contactNumber;
            email = this.state.customerFilter[this.state.arrayIndex].email;
            delivery = this.state.customerFilter[this.state.arrayIndex].delivery;
            home = this.state.customerFilter[this.state.arrayIndex].home;
            isStaff = this.state.customerFilter[this.state.arrayIndex].isStaff;
        }

        return(
            <Tab.Pane>
                <Grid>
                    <Grid.Row><Grid.Column><Divider horizontal>Filter</Divider></Grid.Column></Grid.Row>

                    <Grid.Row centered>
                        <Grid.Column width={2}>
                            <select className="ui selection dropdown" onChange={(e)=>this.setState({selectedCat: e.target.value})}>
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
                            <Input fluid id="Search" placeholder='Search...' onChange={(e)=>this.setState({searchQuery:e.target.value})}/>
                        </Grid.Column>
                        <Grid.Column>
                            <div color={'red'} onClick={this.handleFilter.bind(this)} className="ui button">Filter</div>
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
                            {this.state.customerFilter != null ? this.state.customerFilter.map((item, i) =>
                                <Table.Row key={i} onClick={()=>this.rowClick(item.id, i)} className="customerTable">
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

                <Modal open={this.state.userDetailOpen} >
                    <Header icon="user" content={forname + " " + surname} />

                    <Modal.Content>
                        <div  className="centre" >
                            <Table basic='very'celled collapsing>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Fields</Table.HeaderCell>
                                        <Table.HeaderCell>User Detail</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>ID</Header>
                                        </Table.Cell>
                                        <Table.Cell className="ui input">
                                            <input type="text" value={id} id="userId" readOnly/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Login Name</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="loginId" defaultValue={loginId} readOnly/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>First name</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="forname" defaultValue={forname} onChange={(e)=> forname=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Surname</Header>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input id="surname" defaultValue={surname} onChange={(e)=> surname=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Number</Header>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input id="number" defaultValue={houseNum} onChange={(e)=> houseNum=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Street</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="street" defaultValue={street} onChange={(e)=> street=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Postcode</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="postcode" defaultValue={postcode} onChange={(e)=> postcode=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Phone</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="phone" defaultValue={contactNumber} onChange={(e)=> contactNumber=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Email</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="email" defaultValue={email} onChange={(e)=> email=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Delivery Address</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Checkbox id="delivery" defaultChecked={delivery} onChange={(e, data)=>delivery=data.checked}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Home Address</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Checkbox id="home" defaultChecked={home} onChange={(e, data)=>home=data.checked}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Staff Member</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Checkbox id="isStaff" defaultChecked={isStaff} onChange={(e, data)=>isStaff=data.checked}/>
                                        </Table.Cell>
                                    </Table.Row>

                                </Table.Body>
                            </Table>



                        </div>
                        <div>
                            <Button color='red' onClick={()=>this.deleteUser(id)}>
                                <Icon name='remove' /> Delete User
                            </Button>
                            <Button color='green' style={{float:"right"}} onClick={()=>this.updateUser(id, loginId, forname, surname, houseNum, street, postcode, contactNumber, email, delivery, home, isStaff, addressId)}>
                                <Icon name='checkmark' /> Update
                            </Button>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' onClick={()=>{this.setState({userDetailOpen: false})}}>
                            <Icon name='checkmark' /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Dimmer active={this.state.loading} inverted>
                    <Loader>Loading</Loader>
                </Dimmer>

            </Tab.Pane>
        );
    }

}