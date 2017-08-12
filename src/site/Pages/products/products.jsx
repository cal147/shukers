import React, {Component} from "react";
import {prodImgResource, serverScripts} from '../../../shared/urls'
import {Button, Grid, Header, Icon, Image, Menu, Modal} from 'semantic-ui-react'

export default class product extends Component {

    state = {activeItem: '1'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            hash: window.location.hash
        }
    }

    componentWillMount() {


    }

    getSpecificProducts(cat) {
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "SELECT_SPECIFICCATEGORY",
                category: cat
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    /*

        getProducts() {
            fetch(serverScripts + "admin/Controllers/productsController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "GET_PRODUCTS"
                }),
                mode: 'cors'
            }).then(response => response.json()).then(data => {
                this.setState({Productsdata: data});
            }).catch((err) => {
                console.error(err);
            });
        }*/

    urlchange() {
        let str = window.location.hash;
        const category = str.substring(11);

        this.getSpecificProducts(category);
    }


    render() {
        let str = null;
        const {activeItem} = this.state;
        if (window.location.hash === str) {
        } else {
            this.urlchange()
        }


        return (
            <div>
                <h2>Products Page</h2>
                {/*TODO Set all products up if no category is selected*/}
                {/*TODO set display up to show three/four products in a row, with 12 products on the page. MAYBE GRID to help with mobile display*/}
                <Grid columns={3} textAlign="center" className="prodOverGrid">
                    {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                        <Grid key={i} className="prodGrid">
                            <div className="prodDiv"><h3>{product.name}<br/>{product.id}</h3>
                                <br/>

                                {/*Modal shows the product page as pop up*/}
                                {/*TODO work out how to remove button background*/}
                                <Modal
                                    dimmer='blurring'
                                    trigger={
                                        <Button><img className="prodImg" src={prodImgResource + product.imgPath}
                                                     alt={product.name}/></Button>}>
                                    <Header content={product.name}/>
                                    <Modal.Content image scrolling>
                                        <Image wrapped size="medium" src={prodImgResource + product.imgPath}
                                               alt={product.name}/>
                                        <Modal.Description>
                                            <h5 className="modal_description">{product.desc}</h5>
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button>
                                            {/*TODO need to look at add to basket button to add product to basket*/}
                                            <Icon name='shop'/> Add to Basket
                                        </Button>
                                    </Modal.Actions>
                                </Modal>

                                <br/><h4>Price: £{product.price}</h4><br/></div>
                        </Grid>) : null}
                </Grid>

                {/*TODO work out a way to populate page count from product count*/}
                <Menu pagination>
                    <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick}/>
                    <Menu.Item name='2' active={activeItem === '2'} onClick={this.handleItemClick}/>
                    <Menu.Item name='3' active={activeItem === '3'} onClick={this.handleItemClick}/>
                    <Menu.Item name='4' active={activeItem === '4'} onClick={this.handleItemClick}/>
                </Menu>
            </div>
        )
    }
}