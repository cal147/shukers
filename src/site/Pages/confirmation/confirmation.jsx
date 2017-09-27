import React, {Component} from "react";

export default class confirmation extends Component {

    componentWillMount() {

        /*fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "PAY_INSTORE",
                saleID: this.state.salesID
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
        });*/
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