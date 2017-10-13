import React, {Component} from "react";
import {Button, Popup, Table} from "semantic-ui-react";
import {serverScriptsPublic} from "../../../shared/urls";
import publicUserStore from '../UserStore/PublicUserStore';
import {Money} from "react-format";


export default class basket extends Component {

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
            BasketData: [],
            BasketTotalPrice: 0
        };
    }

    calculatePrice(products) {
        let threeForTenCost = [];
        let threeForTenProdCount = 0;
        let totalPrice = 0;
        let threeForTenQualify;
        let threeForTenRemainingCost;
        let allThreeForTenProdsPrice = 0;

        for (let i = 0; i < products.length; i++) {
            if (products[i].threeForTen) {
                for (let k = 0; k < products[i].qty; k++) {
                    threeForTenCost.push(parseFloat(products[i].price));
                    allThreeForTenProdsPrice += parseFloat(products[i].price);
                    threeForTenProdCount++;
                }
            }
            totalPrice += parseFloat(products[i].subPrice);
        }

        threeForTenQualify = Math.floor(threeForTenProdCount / 3);
        threeForTenRemainingCost = this.getRemainingCost(threeForTenCost, threeForTenQualify);

        if (allThreeForTenProdsPrice == threeForTenRemainingCost) {
            threeForTenQualify = 0
        }

        return totalPrice - allThreeForTenProdsPrice + (threeForTenQualify * 10) + threeForTenRemainingCost;
    }

    getRemainingCost(totalCostArr, qualProds) {

        let qualProd = qualProds * 3;
        let threeTenCost = 0;
        let totalCost = 0;

        for (let i = 0; i < totalCostArr.length; i++) {
            totalCost += totalCostArr[i];
            if (i < qualProd) threeTenCost += totalCostArr[i];
        }

        if (threeTenCost < (qualProds * 10)) {
            return totalCost
        } else return totalCost - threeTenCost;

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

            this.setState({salesID: data}, () => {

                fetch(serverScriptsPublic + "Controllers/productsController.php", {
                    method: 'POST',
                    headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                    body: JSON.stringify({
                        action: "GET_USERBASKETTOTALPRICE",
                        User: this.state.salesID,
                    }),
                    mode: 'cors'
                }).then(response => response.json()).then(data => {
                    this.setState({BasketTotalPrice: data.totalPrice});
                }).catch((err) => {
                });

            });
        }).catch((err) => {
        });

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_USERBASKET",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({BasketData: data}, () => this.setState({priceWithDiscount: this.calculatePrice(this.state.BasketData)}));
        }).catch((err) => {
        });

    }

    removeProduct(sdId) {

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "REMOVEPRODUCTFROMBASKET",
                id: sdId,
                salesId: this.state.salesID
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "item removed") {
                setTimeout(window.location.reload, 10);
            }
        }).catch((err) => {
        });
    }

    collectInStore(price) {
        let fulldate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let tomorrowDate = fulldate.toDateString();

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "PAY_INSTORE",
                saleID: this.state.salesID,
                price: price
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "Order being processed for collection") {
                alert('Your order will be ready for collection before 4 on ' + tomorrowDate + '. Once you have paid.')
            } else {
                alert('something went wrong!')
            }
        }).catch((err) => {
        });
    }

    sendDiscountPrice(price) {
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "DISCOUNT_PRICE",
                saleID: this.state.salesID,
                price: price
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {

        }).catch((err) => {
        });

    }

    render() {

        let priceWithDiscount = this.state.priceWithDiscount;
        let discount = this.state.BasketTotalPrice - this.state.priceWithDiscount;
        let price = this.state.BasketTotalPrice;

        return (
            <div>

                <Table unstackable celled striped color='red' verticalAlign='middle'>
                    <Table.Header>
                        <Table.HeaderCell width="13">Product</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Sub-Total</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Remove from basket</Table.HeaderCell>
                    </Table.Header>
                    {this.state.BasketData != null ? this.state.BasketData.map((basket, i) =>
                        <Table.Row key={i}>
                            <Table.Cell>{basket.name + ' - ' + basket.units}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.price}</Table.Cell>
                            <Table.Cell textAlign="center">{basket.subPrice / basket.price}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.subPrice}</Table.Cell>
                            <Table.Cell textAlign="center"><Button icon='remove' color="red"
                                                                   onClick={() => this.removeProduct(basket.sdId)}/></Table.Cell>
                        </Table.Row>
                    ) : null}
                    {discount > 0 ? <Table.Row>
                        <Table.Cell colSpan={2}> </Table.Cell>
                        <Table.Cell textAlign="center"><strong>Sub-Total</strong></Table.Cell>
                        <Table.Cell textAlign="center"><strong><Money locale="en-UK"
                                                                      currency="GBP">{price}</Money></strong></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row> : null}

                    {discount > 0 ? <Table.Row>
                        <Table.Cell colSpan={2}> </Table.Cell>
                        <Table.Cell textAlign="center" positive><strong>3 for £10 Discount</strong></Table.Cell>
                        <Table.Cell textAlign="center" positive><strong><Money locale="en-UK"
                                                                               currency="GBP">{discount}</Money></strong></Table.Cell>
                        <Table.Cell/>
                    </Table.Row> : null}
                    <Table.Footer>
                        <Table.HeaderCell colSpan="2"> </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"><strong>Total</strong></Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            <strong>
                                <Money locale="en-UK" currency="GBP">{priceWithDiscount}</Money>
                            </strong>
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"> </Table.HeaderCell>

                    </Table.Footer>
                </Table>


                {priceWithDiscount > 25 ?
                    <div>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post"
                              onSubmit={() => this.sendDiscountPrice(priceWithDiscount)}>

                            <input type="hidden" name="business" value="shukersbutchers@gmail.com"/>
                            {/*Specify a Buy Now button.*/}
                            <input type="hidden" name="cmd" value="_xclick"/>
                            <input type="hidden" name="currency_code" value="GBP"/>
                            <input type="hidden" name="custom" value={this.state.salesID}/>
                            <input type="hidden" name="item_name" value="Quality Produce by Shukers Butchers"/>

                            <input type="hidden" name="discount_amount" value={discount}/>
                            <input type="hidden" name="amount" value={price}/>

                            <input type="hidden" name="notify_url" value="https://www.shukersbutchers.co.uk/paypal/paypalverify.php"/>
                            <input type="hidden" name="return" value="https://www.shukersbutchers.co.uk/#/confirmation"/>
                            {/*Display the payment button.*/}
                            <div className="PayPal_Button">
                                <input type="image" name="submit"
                                       src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_buynow_107x26.png"
                                       alt="Buy Now"/>
                                <input type="image" name="submit"
                                       src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png"
                                       alt="Credit Card Badges"/>
                                <img alt="" border="0" width="1" height="1"
                                     src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif"/>
                            </div>

                        </form>
                    </div> : <h3 className="PayPal_Button">Delivery only available over £25</h3>}
                {priceWithDiscount > 0 ?
                    <div>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post"
                              onSubmit={() => this.collectInStore(priceWithDiscount)}>

                            <input type="hidden" name="business" value="shukersbutchers@gmail.com"/>
                            {/*Specify a Buy Now button.*/}
                            <input type="hidden" name="cmd" value="_xclick"/>
                            <input type="hidden" name="currency_code" value="GBP"/>
                            <input type="hidden" name="custom" value={this.state.salesID}/>
                            <input type="hidden" name="item_name" value="Quality Produce by Shukers Butchers"/>

                            <input type="hidden" name="discount_amount" value={discount}/>
                            <input type="hidden" name="amount" value={price}/>

                            <input type="hidden" name="notify_url"
                                   value="https://www.shukersbutchers.co.uk/paypal/paypalverify.php"/>
                            <input type="hidden" name="return" value="https://www.shukersbutchers.co.uk/#/confirmation"/>
                            {/*Display the payment button.*/}
                            <div>
                                <Popup
                                    trigger={<Button color='yellow' className='collectButton' name="submit">Pay And
                                        Collect</Button>}
                                    content='Pay now and collect in store tomorrow'
                                />
                                <input type="image" name="submit"
                                       src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppmcvdam.png"
                                       alt="Credit Card Badges"/>
                                <img alt="" border="0" width="1" height="1"
                                     src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif"/>
                            </div>

                        </form>

                    </div> : null}
            </div>
        )
    }
}