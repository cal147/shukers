import React, {Component} from "react";
import {serverScripts} from '../../../shared/urls'

export default class product extends Component {

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            hash: window.location.hash
        }
    }

    componentWillMount() {


    }

    getSpecificProducts(cat) {
        fetch(serverScripts + "admin/Controllers/productsController.php", {
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

    getProducts() {
        fetch(serverScripts + "admin/Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_PRODUCTS"
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data});
        }).catch((err) => {
            console.error(err);
        });
    }

    urlchange(){
        let str = window.location.hash;
        const category = str.substring(11);

        this.getSpecificProducts(category);
    }

    componentDidUpdate(){

    }


    render() {
        let str = null;

        if(  window.location.hash === str){

        }else {
                this.urlchange()
        }


        return (
            <div>
                <h2>Products Page</h2>
                {/*TODO Set all products up if no category is selected*/}
                {/*TODO set display up to show three products in a row, with 12 products on the page. MAYBE GRID to help with mobile display*/}
                {this.state.Productsdata.map((item,i) => <ui key={i}>{item.name}</ui>)}
            </div>
        )
    }
}