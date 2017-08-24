import React, {Component} from "react";
import {Link} from 'react-dom'
import {prodImgResourcePublic, serverScriptsPublic} from '../../../shared/urls'
import {Button, Grid, Header, Icon, Image, Label, Menu, Modal} from 'semantic-ui-react'

import PublicUserStore from '../UserStore/PublicUserStore'

export default class product extends Component {

    state = {activeItem: '1'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            hash: window.location.hash,
            counter: 0,
            isLoggedInlocal: false,
            user: PublicUserStore.getUser(),
            Qty: 1,
            qtyOptions:
                [
                    {key: 1, text: '1', value: 1},
                    {key: 2, text: '2', value: 2},
                    {key: 3, text: '3', value: 3},
                    {key: 4, text: '4', value: 4},
                    {key: 5, text: '5', value: 5},
                    {key: 6, text: 'For more than 5 please call us', value: 6}
                ]
        }
    }

    componentWillMount() {
        if (this.state.counter === 0) {
            this.urlchange();
            this.setState({counter: 1})
        }
    }

    componentDidMount() {
        if (this.state.counter === 1) {
            this.setState({counter: 0})
        }
    }

    componentDidUpdate() {
        if (this.state.hash !== window.location.hash) {
            window.location.reload()
        }
    }


    getSpecificProducts(cat) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
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

    addProductToBasket(productId, qty) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "ADD_PRODUCTTOBASKET1",
                Product: productId,
                User: this.state.user.id,
                Qty: qty
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    urlchange() {
        let str = window.location.hash;
        const category = str.substring(11);

        this.getSpecificProducts(category);
    }

    handelQtyChange(e) {
        this.setState({Qty: e.target.value});
    }


    render() {

        let loggedIn = null;
        // TODO need to look at add to basket button to add product to basket
        if (this.state.user.isLoggedIn) {
            loggedIn = <Grid columns={3} textAlign="center" className="prodOverGrid">
                {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                    <Grid key={i} className="prodGrid" divided>
                        <div className="prodDiv"><Grid.Row stretched as="h3">{product.name}</Grid.Row>
                            <br/>

                            {/*Modal shows the product page as pop up*/}
                            <Modal
                                dimmer='blurring'
                                trigger={
                                    <Button><img className="prodImg" src={prodImgResourcePublic + product.imgPath}
                                                 alt={product.name}/></Button>}>
                                <Header content={product.name}/>
                                <Modal.Content image scrolling>
                                    <Image wrapped size="medium" src={prodImgResourcePublic + product.imgPath}
                                           alt={product.name}/>
                                    <Modal.Description>
                                        <h4 className="modal_description">{product.desc}</h4>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Label pointing="right">Please select quantity</Label>
                                    <select placeholder="QTY" onChange={this.handelQtyChange.bind(this)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={null}>For more than 5 please call us</option>
                                    </select>
                                    <Button onClick={() => this.addProductToBasket(product.id, this.state.Qty)}>
                                        <Icon name='shop'/> Add to Basket
                                    </Button>
                                </Modal.Actions>
                            </Modal>

                            <br/><h4>Price: £{product.price}</h4><br/></div>
                    </Grid>) : null}
            </Grid>
        } else {
            loggedIn = <Grid columns={3} textAlign="center" className="prodOverGrid">
                {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                    <Grid key={i} className="prodGrid" divided>
                        <div className="prodDiv"><Grid.Row stretched as="h3">{product.name}</Grid.Row>
                            <br/>

                            {/*Modal shows the product page as pop up*/}
                            <Modal
                                dimmer='blurring'
                                trigger={
                                    <Button><img className="prodImg" src={prodImgResourcePublic + product.imgPath}
                                                 alt={product.name}/></Button>}>
                                <Header content={product.name}/>
                                <Modal.Content image scrolling>
                                    <Image wrapped size="medium" src={prodImgResourcePublic + product.imgPath}
                                           alt={product.name}/>
                                    <Modal.Description>
                                        <h4 className="modal_description">{product.desc}</h4>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button as={Link} to='/login'>Please sign in to order</Button>
                                </Modal.Actions>
                            </Modal>

                            <br/><h4>Price: £{product.price}</h4><br/></div>
                    </Grid>) : null}
            </Grid>
        }

        const {activeItem} = this.state;

        return (
            <div>
                {loggedIn}

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