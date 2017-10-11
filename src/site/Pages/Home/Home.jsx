import React, {Component} from "react";
import {prodImgResourcePublic, serverScriptsPublic} from '../../../shared/urls'
import {Divider, Grid} from 'semantic-ui-react'
import Slider from './slider'


export default class home extends Component {

    constructor() {
        super();
        this.state = {
            Productsdata: [],
        };
    }

    componentWillMount() {
        this.getProducts();
    }

    getProducts() {
        this.setState({loading: true});
        fetch(serverScriptsPublic + "Controllers/productsController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "GET_HOMEPRODUCTS"
            }),
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            this.setState({Productsdata: data})
        }).catch((err) => {
        });
    }

    render() {

        return (
            <div>
                <Grid stackable>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <h3 className="homeAbout">We are a family butchers selling high quality meats at quality
                                price.<br/>We are located at 17H West Side,<br/>off Jackson Street, St. Helens,<br/>WA9
                                3AT. <br/><br/>Shop Number: 01744 29534<br/>Email: shukersbutchers@gmail.com
                            </h3>
                        </Grid.Column>
                        <Grid.Column>
                            <div className="siteSlider">
                                <Slider/>
                            </div>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <h2 className="openingTime"><strong>Opening Times:</strong></h2>
                            <h4><strong>Monday</strong>: 9.00 - 16.00<br/>
                                <strong>Tuesday</strong>: 9.00 - 16.00<br/>
                                <strong>Wednesday</strong>: 9.00 - 16.00<br/>
                                <strong>Thursday</strong>: 9.00 - 16.00<br/>
                                <strong>Friday</strong>: 9.00 - 16.00<br/>
                                <strong>Saturday</strong>: 9.00 - 16.00<br/>
                                <strong>Sunday</strong>: <strong
                                    className="openingTime_Closed">CLOSED</strong>
                            </h4>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div>
                    <Grid stackable>
                        <div>
                            <Grid.Row>
                                <Divider/>
                                <Divider horizontal>A selection of our current Offers</Divider>
                                <Divider/>
                                <Divider horizontal>To order go to our offers page</Divider>
                                <Divider/>
                            </Grid.Row>
                        </div>
                        <Grid.Row columns={3} textAlign="center">
                            {this.state.Productsdata != null ? this.state.Productsdata.map((product, i) =>
                                <Grid.Column key={i}><h3>{product.name}</h3>
                                    <br/>
                                    <img className="homeImg" src={prodImgResourcePublic + product.imgPath}
                                         alt={product.name}/>
                                    <br/>
                                    <h4>Price: £{product.price}</h4>
                                    <br/>
                                </Grid.Column>) : null}
                        </Grid.Row>
                    </Grid>
                </div>

            </div>
        )
    }
}