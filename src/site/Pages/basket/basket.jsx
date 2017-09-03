import React, {Component} from "react";
import {Table} from "semantic-ui-react";
import {serverScriptsPublic} from "../../../shared/urls";
import publicUserStore from '../UserStore/PublicUserStore'

export default class basket extends Component {

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
            BasketData: []
        };
    }

    componentWillMount(){
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
                    <Table.Footer>
                        <Table.Cell textAlign="right" colSpan="4"><strong>Total Price -
                            £28.05</strong></Table.Cell> {/*GET FROM SQL*/}
                    </Table.Footer>
                </Table>



            </div>
        )
    }
}