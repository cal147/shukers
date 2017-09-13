import React, {Component} from 'react';
import '../../AdminMaster.css';

import {Tab, Grid, Button, Label, Checkbox, Input, Message} from 'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts} from '../../../shared/urls';

export default class AddCustomers extends Component{


    constructor() {
        super();
        this.state = {
            activeComp: null,
            user: adminUserStore.getUser(),
            deliveryNum:"",
            deliveryStreet:"",
            deliveryPostcode:"",
            postcode: "",
            street: "",
            houseNumber: "",
            email:"",
            surname:"",
            firstName:"",
            loginName:"",
            password:"",
            errorState: true,
            userTaken:"",
            userTakenColour:"",
            errorMessage: "",
            deliveryAddress: null,
            homeAddress: null,
            staffMember: false,
            showDelivery:false,
            contactNumber:"",
            successMessage:false,
        };
    }



    handleSubmit(event) {
       event.preventDefault();

       this.state.showDelivery && this.state.deliveryNum == ""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.showDelivery && this.state.deliveryStreet == ""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.showDelivery && this.state.deliveryPostcode == ""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.postcode==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.street==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.houseNumber==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.email==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.surname==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.firstName==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.loginName==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.password==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.contactNumber==""?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});
       this.state.userTakenColour != "green"?this.setState({errorState: true, errorMessage:"Check all field are Correct"}):this.setState({errorState: false, errorMessage:""});

        if(!this.state.errorState){
            console.log(this.state);
            if(this.state.showDelivery){
                fetch(serverScripts + "admin/Controllers/customersController.php", {
                    method: 'POST',
                    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    body: JSON.stringify({
                        action: "ADD_CUSTOMER_WITHDELIVERY",
                        deliveryNum: this.state.deliveryNum,
                        deliveryStreet: this.state.deliveryStreet,
                        deliveryPostcode: this.state.deliveryPostcode,
                        postcode: this.state.postcode,
                        street: this.state.street,
                        houseNumber: this.state.houseNumber,
                        email: this.state.email,
                        surname: this.state.surname,
                        firstName: this.state.firstName,
                        loginName: this.state.loginName,
                        password: this.state.password,
                        deliveryAddress: this.state.deliveryAddress,
                        homeAddress: this.state.homeAddress,
                        staffMember: this.state.staffMember,
                        contactNumber: this.state.contactNumber,
                        sessionId: this.state.user.serverSession,
                    }),
                    mode: 'cors'
                }).then((response) => response.json()).then((data) => {

                    if(data.success){
                        alert(data.Message);
                        this.setState({
                            activeComp: null,
                            user: adminUserStore.getUser(),
                            deliveryNum:"",
                            deliveryStreet:"",
                            deliveryPostcode:"",
                            postcode: "",
                            street: "",
                            houseNumber: "",
                            email:"",
                            surname:"",
                            firstName:"",
                            loginName:"",
                            password:"",
                            errorState: true,
                            userTaken:"",
                            userTakenColour:"",
                            errorMessage: "",
                            deliveryAddress: null,
                            homeAddress: null,
                            staffMember: false,
                            showDelivery:false,
                            contactNumber:""
                        });
                    }else{
                        alert(data.Message);
                    }

                }).catch((err) => {
                    console.error(err);
                });
            }else{
                fetch(serverScripts + "admin/Controllers/customersController.php", {
                    method: 'POST',
                    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    body: JSON.stringify({
                        action: "ADD_CUSTOMER",
                        postcode: this.state.postcode,
                        street: this.state.street,
                        houseNumber: this.state.houseNumber,
                        email: this.state.email,
                        surname: this.state.surname,
                        firstName: this.state.firstName,
                        loginName: this.state.loginName,
                        password: this.state.password,
                        deliveryAddress: this.state.deliveryAddress,
                        homeAddress: this.state.homeAddress,
                        staffMember: this.state.staffMember,
                        contactNumber: this.state.contactNumber,
                        sessionId: this.state.user.serverSession,
                    }),
                    mode: 'cors'
                }).then((response) => response.json()).then((data) => {
                    if(data.success){
                        this.setState({
                            deliveryNum:"",
                            deliveryStreet:"",
                            deliveryPostcode:"",
                            postcode: "",
                            street: "",
                            houseNumber: "",
                            email:"",
                            surname:"",
                            firstName:"",
                            loginName:"",
                            password:"",
                            errorState: true,
                            userTaken:"",
                            userTakenColour:"",
                            errorMessage: "",
                            deliveryAddress: false,
                            homeAddress: false,
                            staffMember: false,
                            showDelivery:false,
                            contactNumber:"",
                            successMessage:true
                        });
                    }else{
                        alert(data.Message);
                    }


                }).catch((err) => {
                    console.error(err);
                });
            }

        }

    }

    takeInput(e, {id}){
        let tValue = e.target.value;

        if(id != null){
            this.setState({[id]: tValue});
        }else{
            let pass2 = e.target.value;
            if (this.state.password === pass2){
                this.setState({errorMessage: "Passwords Match \u2714", errorState: false});
            }else{
                this.setState({errorMessage: "Passwords dont Match \u2716", errorState: true});
            }
        }

        if(id === "loginName"){
            fetch(serverScripts + "admin/Controllers/customersController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "CHECK_LOGIN_NAME",
                    name:tValue,
                    sessionId: this.state.user.serverSession,
                }),
                mode: 'cors'
            }).then((response) => response.json()).then((data) => {
                if(data.Message === "ok"){
                    this.setState({userTaken: "\u2714", userTakenColour:"green"});
                }else{
                    this.setState({userTaken: data.Message, userTakenColour:"red"});
                }
            }).catch((err) => {
                console.error(err);
            });
        }


    }

    takeCheckBox(e, data){
        this.setState({[data.id]:data.checked});

    }


    render() {
        return (
            <Tab.Pane>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Grid style={{marginTop:"20px", marginBottom:"20px"}}>

                        <Grid.Row columns={14} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Login Name </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="loginName" value={this.state.loginName} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                            <Grid.Column width={4}><span><h3 style={{color:this.state.userTakenColour}}> {this.state.userTaken} </h3></span></Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Forename </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="firstName" value={this.state.firstName} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                        <Grid.Column width={2} >
                            <Label basic pointing='right'>Surname </Label>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input fluid id="surname" value={this.state.surname} onChange={this.takeInput.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Email Address </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="email" value={this.state.email} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Staff Member</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Checkbox  id="staffMember" checked={this.state.staffMember} onChange={this.takeCheckBox.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>House Number </Label>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Input fluid id="houseNumber" value={this.state.houseNumber} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Street </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="street" value={this.state.street} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Postcode </Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="postcode" value={this.state.postcode} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Contact Number</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid id="contactNumber" value={this.state.contactNumber} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Home Address</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Checkbox id="homeAddress" checked={this.state.homeAddress} onChange={this.takeCheckBox.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Delivery Address</Label>
                            </Grid.Column>
                            <Grid.Column >
                                <Checkbox  id="deliveryAddress" checked={this.state.deliveryAddress} onChange={this.takeCheckBox.bind(this)}/>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <div color={'red'} name="deliveryAddress" className="ui red button" onClick={()=>{this.setState({showDelivery:!this.state.showDelivery})}}>Add Delivery Address</div>
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.showDelivery?
                            <Grid >
                                <Grid.Row columns={16}>
                                    <Grid.Column width={5}></Grid.Column>
                                    <Grid.Column width={2} ><Label basic pointing='right'>House Number </Label></Grid.Column>
                                    <Grid.Column width={8}><Input fluid id="deliveryNum" value={this.state.deliveryNum} onChange={this.takeInput.bind(this)}/></Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={16}>
                                    <Grid.Column width={5}></Grid.Column>
                                    <Grid.Column width={2} ><Label basic pointing='right'>Street</Label></Grid.Column>
                                    <Grid.Column width={8}><Input fluid id="deliveryStreet" value={this.state.street} onChange={this.takeInput.bind(this)}/></Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={16}>
                                    <Grid.Column width={5}></Grid.Column>
                                    <Grid.Column width={2} ><Label basic pointing='right'>Postcode </Label></Grid.Column>
                                    <Grid.Column width={8}><Input fluid id="deliveryPostcode" value={this.state.deliveryPostcode} onChange={this.takeInput.bind(this)}/></Grid.Column>
                                </Grid.Row>
                            </Grid>
                        :null}

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Password</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid type="password" id="password" value={this.state.password} onChange={this.takeInput.bind(this)}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={10} >
                            <Grid.Column width={2} >
                                <Label basic pointing='right'>Confirm Password</Label>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input fluid type="password" id={null} onChange={this.takeInput.bind(this)}/>
                                <span><h1 style={{color:"red"}}> {this.state.errorMessage} </h1></span>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row >
                            <Grid.Column >
                                <Button color={'red'} type="submit" className="ui button">Submit</Button>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={2}></Grid.Column>
                            <Grid.Column width={10}>
                                {this.state.successMessage? <Message
                                    success
                                    header='Your user registration was successful'
                                    content='You may now log-in with the username you have chosen'
                                />: null}
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>
                </form>
            </Tab.Pane>

        );
    }
}
