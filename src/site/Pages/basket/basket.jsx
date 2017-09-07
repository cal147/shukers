import React, {Component} from "react";
import {Table} from "semantic-ui-react";
import {serverScriptsPublic} from "../../../shared/urls";
import publicUserStore from '../UserStore/PublicUserStore';


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

    render() {

        return (
            <div>
                <h2>Basket Page</h2>

                <Table unstackable celled striped color='red' verticalAlign='middle'>
                    <Table.Header>
                        <Table.HeaderCell width="13">Product</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">Sub-Total</Table.HeaderCell>
                    </Table.Header>
                    {this.state.BasketData != null ? this.state.BasketData.map((basket, i) =>
                        <Table.Row key={i}>
                            <Table.Cell>{basket.name}</Table.Cell>
                            <Table.Cell textAlign="center">{basket.qty}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.price}</Table.Cell>
                            <Table.Cell textAlign="center">£{basket.subPrice}</Table.Cell>
                        </Table.Row>
                    ) : null}
                    <Table.Row>
                        <Table.Cell colSpan={3}><strong>Online Payment Fee</strong></Table.Cell>
                        <Table.Cell textAlign="center"><strong>£0.20</strong></Table.Cell>
                    </Table.Row>
                    <Table.Footer>
                        <Table.HeaderCell colSpan="2"> </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"><strong>Total Price</strong></Table.HeaderCell>
                        <Table.HeaderCell
                            textAlign="center"><strong>£{this.state.BasketTotalPrice}</strong></Table.HeaderCell>

                    </Table.Footer>
                </Table>

                {/*TODO - get payment complete and turn basket to paid in SQL*/}
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">

                    {/*Identify your business so that you can collect the payments.*/}
                    <input type="hidden" name="business" value="laine.chris147@gmail.com"/>

                    {/*Specify a Buy Now button.*/}
                    <input type="hidden" name="cmd" value="_xclick"/>

                    {/*Specify details about the item that buyers will purchase.*/}
                    <input type="hidden" name="item_name" value="Shukers Products - Basket"/>
                    <input type="hidden" name="amount" value="1.00"/>
                    <input type="hidden" name="currency_code" value="GBP"/>

                    {/*Display the payment button.*/}
                    <div className="PayPal_Button">
                        <input type="image" name="submit" border="0"
                               src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/gold-pill-paypalcheckout-34px.png"
                               alt="PayPal – The safer, easier way to pay online!"/>
                        <img alt="" border="0" width="1" height="1"
                             src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif"/>
                    </div>

                </form>


            </div>
        )
    }
}