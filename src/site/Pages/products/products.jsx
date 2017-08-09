import React, {Component} from "react";
import {serverScripts} from '../../../shared/urls'

export default class product extends Component {

    constructor() {
        super();
        this.state = {
            Productsdata: [],
            str: window.location.hash
        }
    }

    componentWillMount() {
        let str = window.location.hash;

        if(window.location.hash === str){
            const category = str.substring(11);
            this.getSpecificProducts(category);
        }


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

    urlchange(category){
        this.getSpecificProducts(category);
    }


    render() {

        let str = this.state.str;
        // this.setState({str: window.location.hash});

        if(str !== window.location.hash ){
            console.log(str);
            const category = str.substring(11);
            this.urlchange(category);
        }else {
            console.error(str);


        }


        return (
            <div>
                <h2>Products Page</h2>
                {this.state.Productsdata.map((item,i) => <ui>{item.name}</ui>)}
            </div>
        )
    }
}