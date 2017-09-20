import React, {Component} from "react";
import {Button, Table} from "semantic-ui-react";
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
            console.error(err);
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
            this.setState({BasketData: data});
        }).catch((err) => {
            console.error(err);
        });
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_USERBASKETTOTALPRICE",
                User: this.state.user.id,
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({BasketTotalPrice: data + 0.20});
        }).catch((err) => {
            console.error(err);
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
            this.setState({BasketData: data});
        }).catch((err) => {
            console.error(err);
        });
        window.location.reload()
    }

    collectInStore() {
        let fulldate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let tomorrowDate = fulldate.toDateString();

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "PAY_INSTORE",
                saleID: this.state.salesId
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "Order being processed for collection") {
                alert('Your order will be ready for collection before 4 on ' + tomorrowDate)
            } else {
                alert('something went wrong!')
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {

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
                            <Table.Cell>{basket.name}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.price}</Table.Cell>
                            <Table.Cell textAlign="center">{basket.qty}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.subPrice}</Table.Cell>
                            <Table.Cell textAlign="center"><Button icon='remove' color="red"
                                                                   onClick={() => this.removeProduct(basket.sdId)}/></Table.Cell>
                        </Table.Row>
                    ) : null}
                    <Table.Row>
                        <Table.Cell colSpan={3}><strong>Online Payment Fee</strong></Table.Cell>
                        <Table.Cell textAlign="center"><strong>£0.20</strong></Table.Cell>
                        <Table.Cell textAlign="center"> </Table.Cell>
                    </Table.Row>
                    <Table.Footer>
                        <Table.HeaderCell colSpan="2"> </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"><strong>Total Price</strong></Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            <strong>
                                <Money locale="en-UK" currency="GBP">{this.state.BasketTotalPrice}</Money>
                            </strong>
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"> </Table.HeaderCell>

                    </Table.Footer>
                </Table>

                {/*TODO - get payment complete and turn basket to paid in SQL - sort out return to website to send data to SQL*/}
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">

                    {/*Identify your business so that you can collect the payments.*/}
                    <input type="hidden" name="business" value="shukersbutchers@gmail.com"/>

                    {/*Specify a Buy Now button.*/}
                    <input type="hidden" name="cmd" value="_xclick"/>

                    {/*Specify details about the item that buyers will purchase.*/}
                    <input type="hidden" name="item_name" value="Shukers Products"/>
                    <input type="hidden" name="amount" value={this.state.BasketTotalPrice}/>
                    <input type="hidden" name="currency_code" value="GBP"/>

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

                {/*TODO - Collect and Pay in store*/}

                <Button negative onClick={() => this.collectInStore()}>Collect and Pay in store tomorrow</Button>

            </div>
        )
    }
}