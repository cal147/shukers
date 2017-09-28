import React, {Component} from "react";
import {serverScriptsPublic} from "../../../shared/urls";
import publicUserStore from '../UserStore/PublicUserStore';

export default class confirmation extends Component {

    constructor() {
        super();
        this.state = {
            user: publicUserStore.getUser(),
        };
    }

    componentWillMount() {

        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "PAYMENT_COMPLETE",
                userID: this.state.user.id
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            if (data.Message === "Order Paid") {
                console.log('Payment complete')
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
                <h3 className='conf'>Thank you for your payment.<br/>Your transaction has been completed and a receipt
                    for your purchase has been emailed to you by PayPal.<br/>You may log in to your account at
                    <a href='https://www.paypal.com'> www.paypal.com</a> to view details of this transaction</h3>
            </div>
        )
    }
}