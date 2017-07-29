import React, {Component} from "react";
import {imgResource, prodImgResource, serverScripts} from '../../../shared/urls'
import Slider from 'react-slick'
import {Divider, Grid} from 'semantic-ui-react'
import './publicHomePage.css'


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

    render() {

        var settings = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplayspeed: 10000,
            speed: 1000,
            fade: true,
            pauseOnHover: true,
            adaptHeight: true,
            accessibility: true,
            swipeToSlide: true,
            arrows: false,
        };

        return (
            <div>
                <div className="siteSlider">
                    <Slider {...settings}>
                        <img src={imgResource + "Cow.png"} alt="Cow.png" className="sliderImg"/>
                        <img src={imgResource + "Chicken.png"} alt="Chicken.png" className="sliderImg"/>
                        <img src={imgResource + "Duck.png"} alt="Duck.png" className="sliderImg"/>
                        <img src={imgResource + "Goat.png"} alt="Goat.png" className="sliderImg"/>
                        <img src={imgResource + "Lamb.png"} alt="Lamb.png" className="sliderImg"/>
                        <img src={imgResource + "Pork.png"} alt="Pork.png" className="sliderImg"/>
                        <img src={imgResource + "Veal.png"} alt="Veal.png" className="sliderImg"/>
                    </Slider>
                </div>


                <div>
                    <Grid>
                        <div>
                            <Grid.Row>
                                <Divider/>
                                <Divider horizontal>Current Categories in the store</Divider>
                                <Divider/>
                            </Grid.Row>
                        </div>
                        <Grid.Row columns={3} textAlign="center" >
                            {this.state.Productsdata.map((product, i) =>
                                <Grid.Column key={i} className="homeImg"><h3>{product.name}</h3>
                                    <br/>
                                    <img className="homeImg" src={prodImgResource + product.imgPath}
                                         alt={product.name}/>
                                    <br/>
                                    <h4>Price: {product.price}</h4>
                                    <br/>
                                </Grid.Column>)}
                        </Grid.Row>
                        <br/>

                    </Grid>
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </div>
        )
    }
}