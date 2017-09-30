import React, {Component} from "react";

export default class confirmation extends Component {

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