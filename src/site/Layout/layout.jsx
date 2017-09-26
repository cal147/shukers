import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Dropdown, Icon, Image, Label, Menu, Modal, Search, Sidebar} from "semantic-ui-react";
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import {prodImgResourcePublic, serverScriptsPublic} from '../../shared/urls'
import * as PublicUserAction from '../Pages/publicActions/publicUserActions';

import publicUserStore from '../../site/Pages/UserStore/PublicUserStore'

export default class SiteLayout extends Component {
    state = {visible: false, modalOpen: false};

    toggleVisibility = () => this.setState({visible: !this.state.visible});

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''});

    handleOpen = () => this.setState({modalOpen: true});

    handleClose = () => this.setState({modalOpen: false});

    handleResultSelect = (e, {result}) => {

        this.toggleVisibility();

        this.setState({value: result.title});

        this.getProductModel(result.title);

        this.handleOpen();
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});

        this.searchProducts(e.target.value);

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            this.setState({isLoading: false})
        }, 500)
    };

    handleItemClick = (e, {name}) => this.setState({visible: !this.state.visible});

    handleLogOutClick = () => {
        PublicUserAction.logoutUserPublic();
        this.setState({loggedin: false});
        window.location.reload()
    };

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            ProductSearch: [],
            ProductModal: null,
            width: 800,
            user: publicUserStore.getUser(),
            Qty: 1
        }
    }

    componentWillMount() {
        this.getMenuCategory();
        this.resetComponent();
    }

    getMenuCategory() {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_MENUCATEGORY"
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    searchProducts(name) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "SEARCH_PRODUCTS",
                prodName: name
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({ProductSearch: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    getProductModel(name) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_PRODUCTMODALDETAILS",
                prodName: name
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({productModal: data});

        }).catch((err) => {
            console.error(err);
        });
    }
    addProductToBasket(productId, qty) {

        console.log(this.state.salesID);
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
            console.error(err);
        });
    }

    /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
        if (window.innerWidth < 500) {
            this.setState({width: 450});
        } else {
            let update_width = window.innerWidth - 100;
            this.setState({width: update_width});
        }
    }

    /**
     * Add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    handelQtyChange(e) {
        this.setState({Qty: e.target.value});
    }


    render() {


        const {activeItem, isLoading, value} = this.state;
        let userloggedin = null;
        let loggedIn = null;
        if (this.state.user.isLoggedIn === true) {

            userloggedin =
                <Menu.Menu position='right'>
                    <Menu.Item className="myAccHeader" onClick={this.handleItemClick} as={Link} to='/myAccount'>My
                        Account<br/>Welcome {this.state.user.firstName}</Menu.Item>
                    <Menu.Item name='basket' active={activeItem === 'basket'} onClick={this.handleItemClick}
                               as={Link} to='/basket'/>
                    <Menu.Item name='Log Out' active={activeItem === 'LogOut'} onClick={this.handleLogOutClick}
                               as={Link} to='/'/>
                </Menu.Menu>;
            loggedIn = <div>
                {this.state.productModal != null ? this.state.productModal.map((product, i) =>
                    <Modal
                        dimmer='blurring'
                        onClose={this.handleClose}
                        open={this.state.modalOpen}
                    >
                        <Modal.Header>{product.name + ' - £' + product.price}
                            {product.onOffer ? <div style={{color: 'red'}}>on offer</div> : null}
                            {product.threeForTen ? <div style={{color: 'blue'}}>3 For £10</div> : null}
                        </Modal.Header>
                        <Modal.Content image scrolling>
                            <Image wrapped size="medium" src={prodImgResourcePublic + product.image}
                                   alt={product.name}/>
                            <Modal.Description>
                                <h4 className="modal_description">{product.description}</h4>
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
                        </Modal.Actions>
                    </Modal>) : null}
            </div>
        } else if (this.state.user.isLoggedIn === false) {
            userloggedin =
                <Menu.Menu position='right'>
                    <Menu.Item name='Login' active={activeItem === 'login'} onClick={this.handleItemClick}
                               as={Link} to='/login'/>
                    <Menu.Item name='Sign Up' active={activeItem === 'signUp'} onClick={this.handleItemClick}
                               as={Link} to='/signUp'/>
                </Menu.Menu>;
            loggedIn = <div>
                {this.state.productModal != null ? this.state.productModal.map((product, i) =>
                    <Modal
                        dimmer='blurring'
                        onClose={this.handleClose}
                        open={this.state.modalOpen}
                    >
                        <Modal.Header>{product.name + ' - £' + product.price}
                            {product.onOffer ? <div style={{color: 'red'}}>on offer</div> : null}
                            {product.threeForTen ? <div style={{color: 'blue'}}>3 For £10</div> : null}
                        </Modal.Header>
                        <Modal.Content image scrolling>
                            <Image wrapped size="medium" src={prodImgResourcePublic + product.image}
                                   alt={product.name}/>
                            <Modal.Description>
                                <h4 className="modal_description">{product.description}</h4>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <h3>Please sign in to order this product</h3>
                        </Modal.Actions>
                    </Modal>) : null}
            </div>
        }
        let winWidth = window.innerWidth;
        if (winWidth > 800) {
            return (
                <div>


                    <Header/>


                    <Menu className="publicNavBar" inverted color={'red'} stackable>
                        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link}
                                   to='/'/>
                        <Menu.Item name='findUs' active={activeItem === 'findUs'} onClick={this.handleItemClick}
                                   as={Link} to='/findUs'/>
                        <Dropdown item text={'Products'}>
                            <Dropdown.Menu>
                                {this.state.Productsdata.map((product, i) => <Dropdown.Item
                                    key={product.cat} name='products' as={Link} to={"/products/" + product.cat}
                                    onClick={this.handleItemClick}>{product.cat}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        {loggedIn}
                        {userloggedin}
                        <Menu.Menu>
                            <Menu.Item>
                                <Search placeholder='Search for product...'
                                        loading={isLoading}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={this.handleSearchChange}
                                        results={this.state.ProductSearch}
                                        value={value}
                                />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>

                    <div>{this.props.children}</div>
                    <Footer/>


                </div>
            );
        } else {
            const {visible} = this.state;
            const {activeItem} = this.state;
            return (
                <div>
                    <Button onClick={this.toggleVisibility} icon="content" content="Menu" labelPosition="left"/>


                    <Sidebar.Pushable className="sidebarPushable">
                        <Header/>

                        <Sidebar as={Menu} animation='scale down' width='wide' visible={visible} icon='labeled'
                                 stackable inverted color={"red"}>
                            <h3><Icon name='browser'/><br/>For a better experience please visit us on a computer</h3>
                            <Menu.Item>
                                <Search placeholder='Search for product...'
                                        loading={isLoading}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={this.handleSearchChange}
                                        results={this.state.ProductSearch}
                                        value={value}
                                />
                            </Menu.Item>
                            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}
                                       as={Link} to='/'/>
                            <Menu.Item name='findUs' active={activeItem === 'findUs'} onClick={this.handleItemClick}
                                       as={Link} to='/findUs'/>
                            <Dropdown item text={'Products'}>
                                <Dropdown.Menu>
                                    {this.state.Productsdata.map((product, i) => <Dropdown.Item
                                        key={product.cat} name='products' as={Link} to={"/products/" + product.cat}>
                                        {product.cat}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                            {userloggedin}
                        </Sidebar>
                        <Sidebar.Pusher>
                            {loggedIn}
                            {this.props.children}
                        </Sidebar.Pusher>
                        <Footer className="siteFooter"/>
                    </Sidebar.Pushable>
                </div>
            );
        }
    }
}