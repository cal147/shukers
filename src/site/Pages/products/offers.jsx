import React, {Component} from "react";
import {prodImgResourcePublic, serverScriptsPublic} from '../../../shared/urls'
import {Button, Grid, Icon, Image, Label, Modal} from 'semantic-ui-react'

import PublicUserStore from '../UserStore/PublicUserStore'

export default class offers extends Component {

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            salesID: null,
            hash: window.location.hash,
            counter: 0,
            isLoggedInlocal: false,
            user: PublicUserStore.getUser(),
            Qty: 1
        }
    }

    componentWillMount() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_SALEID",
                User: this.state.user.id
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({salesID: data});
        }).catch((err) => {
        });
        this.getThreeForTenProducts();
    }

    getThreeForTenProducts() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_OFFERS"
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
        });
    }

    addProductToBasket(productId, qty, name) {
        alert(name + ' has been added to yout basket');
        {
            this.state.salesID != null ? setTimeout(() => window.location.reload(), 10) : null
        }
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "ADD_PRODUCTTOBASKET",
                Product: productId,
                Qty: qty,
                User: this.state.user.id,
                saleID: this.state.salesID
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata1: data});
        }).catch((err) => {
        });
    }

    handelQtyChange(e) {
        this.setState({Qty: e.target.value});
    }

    render() {
        let loggedIn = null;
        let addedToBasket = null;
        if (this.state.user.isLoggedIn) {

            loggedIn = <Grid columns={3} textAlign="center" className="prodOverGrid">
                {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                    <Grid key={i} className="prodGrid" divided>
                        <div className="prodDiv"><Grid.Row stretched
                                                           as="h3">{product.name}</Grid.Row>
                            <br/>
                            {/*Modal shows the product page as pop up*/}
                            <Modal
                                dimmer='blurring'
                                trigger={
                                    <Button>
                                        {product.threeForTen == 1 ?
                                            <img className="threefor10image"
                                                 src={prodImgResourcePublic + 'threefor10.png'}
                                                 alt='offer'/> : null}
                                        <img className="prodImg" src={prodImgResourcePublic + product.imgPath}
                                             alt={product.name}/>
                                        {product.onOffer == 1 ?
                                            <img className="offerimage" src={prodImgResourcePublic + 'offer.png'}
                                                 alt='offer'/> : null}</Button>}
                                closeIcon>
                                <Modal.Header>{product.name + ' - £' + product.price + ' - ' + product.units}
                                    {product.onOffer ? <div style={{color: 'red'}}>on offer</div> : null}
                                    {product.threeForTen ? <div style={{color: 'blue'}}>3 For £10</div> : null}
                                </Modal.Header>
                                <Modal.Content image scrolling>

                                    <Image size="medium" src={prodImgResourcePublic + product.imgPath}
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
                                        <option value={6}>6</option>
                                        <option value={null}>For more than 6 please call us</option>
                                    </select>
                                    {this.state.Qty <= 6 ? <Button
                                        onClick={() => this.addProductToBasket(product.id, this.state.Qty, product.name)}>
                                        <Icon name='shop'/> Add to Basket
                                    </Button> : null}
                                    {addedToBasket}
                                </Modal.Actions>
                            </Modal>
                            <br/><h4>Price: £{product.price + "-" + product.units}</h4><br/></div>
                    </Grid>) : null}
            </Grid>
        } else {
            loggedIn = <Grid columns={3} textAlign="center" className="prodOverGrid">
                {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                    <Grid key={i} className="prodGrid" divided>
                        <div className="prodDiv"><Grid.Row stretched as="h3">{product.name}
                        </Grid.Row>
                            <br/>
                            {/*Modal shows the product page as pop up*/}
                            <Modal
                                dimmer='blurring'
                                trigger={<Button>
                                    {product.threeForTen == 1 ?
                                        <img className="threefor10image" src={prodImgResourcePublic + 'threefor10.png'}
                                             alt='offer'/> : null}
                                    <img className="prodImg" src={prodImgResourcePublic + product.imgPath}
                                         alt={product.name}/>
                                    {product.onOffer == 1 ?
                                        <img className="offerimage" src={prodImgResourcePublic + 'offer.png'}
                                             alt='offer'/> : null}</Button>}
                                closeIcon>
                                <Modal.Header>{product.name + ' - £' + product.price + ' - ' + product.units}
                                    {product.onOffer ? <div style={{color: 'red'}}>on offer</div> : null}
                                    {product.threeForTen ? <div style={{color: 'blue'}}>3 For £10</div> : null}
                                </Modal.Header>
                                <Modal.Content image scrolling>
                                    <Image className="prodImg" src={prodImgResourcePublic + product.imgPath}
                                           alt={product.name}/>
                                    <Modal.Description>
                                        <h4 className="modal_description">{product.desc}</h4>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <h3>Please sign in to order this product</h3>
                                </Modal.Actions>
                            </Modal>
                            <br/><h4>Price: £{product.price + "-" + product.units}</h4><br/></div>
                    </Grid>) : null}
            </Grid>
        }
        return (
            <div>
                {loggedIn}
            </div>
        )
    }
}