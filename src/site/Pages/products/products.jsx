import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {prodImgResourcePublic, serverScriptsPublic} from '../../../shared/urls'
import {Button, Grid, Header, Icon, Image, Menu, Modal} from 'semantic-ui-react'

export default class product extends Component {

    state = {activeItem: '1'};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            hash: window.location.hash,
            counter: 0,
            isLoggedInlocal: false
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

    addProductToBasket(productId) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "ADD_PRODUCTTOBASKET",
                Product: productId/*,
                User: productId,
                Qty: productId*/
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


    render() {

        let modalButton = null;
        // TODO need to look at add to basket button to add product to basket
        if(this.state.isLoggedInlocal){
            modalButton = <Button as={Button} onClick={() => this.addProductToBasket(product.id)}><Icon name='shop'/> Add to Basket</Button>
        }else{
            modalButton = <Button as={Link} to='/login'>Please Sign in</Button>
        }

        const {activeItem} = this.state;

        return (
            <div>
                {/*TODO set display up to show three/four products in a row, with 12 products on the page. MAYBE GRID to help with mobile display*/}
                <Grid columns={3} textAlign="center" className="prodOverGrid">
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
                                        {modalButton}
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