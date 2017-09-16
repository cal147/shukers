import React, {Component} from 'react';
import {Grid, Tab, Divider, Input, Table, Modal, Button, Header, Icon, Checkbox, TextArea, Label} from'semantic-ui-react';

import adminUserStore from '../../AdminStores/AdminUserStore';
import {serverScripts} from '../../../shared/urls';

import './products.css';

export default class ProdEdit extends Component {


    constructor(){
        super();

        this.state = {
            user: adminUserStore.getUser(),
            searchQuery:"",
            products: null,
            productDetailOpen: false,
            arrayIndex: null,
            productsFilter: null,
            showOffersOnly:false,
        }

    }

    componentWillMount(){
        this.getProductList();
    }

    getProductList(){
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_PRODUCTS",
                sessionId: this.state.user.serverSession,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            this.setState({products: data, productsFilter: data});

        }).catch((err) => {
            console.error(err);
        });
    }

    rowClick(id , arrIndex){
        this.setState({arrayIndex: arrIndex, productDetailOpen:true});
    }

    deleteProduct(id, imgName){
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "DELETE_PRODUCT",
                sessionId: this.state.user.serverSession,
                id: id,
                imgName: imgName,
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            if(data.success){
                this.setState({productDetailOpen: false, arrayIndex: null,});
                this.getProductList();
            }
        }).catch((err) => {
            console.error(err);
        });

    }

    updateProduct(id, name, desc, price, onOffer){

        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "UPDATE_PRODUCT",
                sessionId: this.state.user.serverSession,
                id:id,
                name : name,
                desc:desc,
                price:price,
                onOffer:onOffer
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {
            if(data.success){
                this.setState({productDetailOpen: false, arrayIndex: null,});
                this.getProductList();
            }
        }).catch((err) => {
            console.error(err);
        });

    }

    handleFilter(){

        let tempArr = [];

        if( this.state.searchQuery != ""){
            this.setState({productsFilter: null}, ()=>{
                this.state.products.map((item, i)=>{
                    for(let k in item){
                        if(k=="prodName" && item[k].indexOf(this.state.searchQuery) != -1){
                            tempArr.push(item);
                        }
                    }
                });
                this.setState({productsFilter:tempArr, searchQuery:""});
            });
        }else{
            this.setState({productsFilter:this.state.products});
        }
    }

    toggleOffers(e, data){
        let tempArr = [];
        this.setState({showOffersOnly:!this.state.showOffersOnly}, ()=>{
            if(this.state.showOffersOnly){
                this.setState({productsFilter: null}, ()=>{
                    this.state.products.map((item, i)=>{
                            console.log(item.onOffer)
                            if(item.onOffer){
                                tempArr.push(item);
                            }
                    });
                    this.setState({productsFilter:tempArr, searchQuery:""});
                });
            }else{
                this.setState({productsFilter:this.state.products});
            }
        });
    }


    render(){
        //TODO apply toggle to display products that are on offer.
        let id;
        let name;
        let description;
        let price;
        let onOffer;
        let catId;
        let imgPath;


        if(this.state.productsFilter!=null && this.state.arrayIndex !=null){
            id = this.state.productsFilter[this.state.arrayIndex].id;
            name = this.state.productsFilter[this.state.arrayIndex].prodName;
            description = this.state.productsFilter[this.state.arrayIndex].description;
            price = this.state.productsFilter[this.state.arrayIndex].price;
            onOffer = this.state.productsFilter[this.state.arrayIndex].onOffer;
            catId = this.state.productsFilter[this.state.arrayIndex].catId;
            imgPath = this.state.productsFilter[this.state.arrayIndex].imgName;
        }

        return(
            <Tab.Pane>
                <Grid>
                    <Grid.Row><Grid.Column><Divider horizontal>Filter</Divider></Grid.Column></Grid.Row>

                    <Grid.Row>

                        <Grid.Column width={3}>
                            <Input fluid id="Search" placeholder='Search...' onChange={(e)=>this.setState({searchQuery:e.target.value})} />
                        </Grid.Column>
                        <Grid.Column>
                            <div color={'red'} onClick={this.handleFilter.bind(this)} className="ui button">Filter</div>
                        </Grid.Column>
                        <Grid.Column width={3} floated="right">
                            <Label pointing='right' basic >Show offers only</Label>
                            <Checkbox toggle  defaultChecked={this.state.showOffersOnly} onChange={this.toggleOffers.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row><Grid.Column><Divider /></Grid.Column></Grid.Row>

                    <Grid.Row>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width={1} textAlign="center">User ID</Table.HeaderCell>
                                    <Table.HeaderCell width={2} textAlign="center">Product Name</Table.HeaderCell>
                                    <Table.HeaderCell width={8} textAlign="center">Description</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Price</Table.HeaderCell>
                                    <Table.HeaderCell width={1} textAlign="center">Offer</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.productsFilter != null ? this.state.productsFilter.map((item, i) =>
                                        <Table.Row key={i} onClick={()=>this.rowClick(item.id, i)} className="productsTable">
                                            <Table.Cell textAlign="center">{item.id}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.prodName}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.description}</Table.Cell>
                                            <Table.Cell textAlign="center">{"£"+item.price}</Table.Cell>
                                            <Table.Cell textAlign="center">{item.onOffer?<span style={{color:"green", fontSize:"30px"}}>&#x2714;</span>:<span style={{color:"red", fontSize:"30px"}}>&#x2718;</span>}</Table.Cell>
                                            </Table.Row>
                                    )
                                    :null}
                            </Table.Body>

                        </Table>


                    </Grid.Row>

                </Grid>


                <Modal open={this.state.productDetailOpen} >
                    <Header icon="shop" content={name} />

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
                                            <input type="text" value={id} id="productId" readOnly/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Name</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Input id="name" defaultValue={name} onChange={(e)=> name=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Description</Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <TextArea id="description" defaultValue={description} onChange={(e)=> description=e.target.value} autoHeight={true}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Price</Header>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Input id="price" defaultValue={price} onChange={(e)=> price=e.target.value}/>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>Offer</Header>
                                        </Table.Cell>
                                        <Table.Cell >
                                            <Checkbox id="onOffer" defaultChecked={onOffer} onChange={(e, data)=> onOffer=data.checked}/>
                                        </Table.Cell>
                                    </Table.Row>

                                </Table.Body>
                            </Table>



                        </div>
                        <div>
                            <Button color='red' onClick={()=>this.deleteProduct(id, imgPath)}>
                                <Icon name='remove' /> Delete Product
                            </Button>
                            <Button color='green' style={{float:"right"}} onClick={()=>this.updateProduct(id, name, description, price, onOffer)}>
                                <Icon name='checkmark' /> Update
                            </Button>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='blue' onClick={()=>{this.setState({productDetailOpen: false})}}>
                        <Icon name='checkmark' /> Cancel
                    </Button>
                    </Modal.Actions>
                </Modal>


            </Tab.Pane>

         );
    }

}