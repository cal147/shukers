import React, {Component} from "react";
import { imgResource } from '../../../shared/urls'
import Slider from 'react-slick'


export default class home extends Component {

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
            <div >
                <h1>ImageSlider goes here!!</h1>
<div className="siteSlider">
                <Slider {...settings}>
                    <img src={imgResource+"Logo.png"}/>
                    <img src={imgResource+"Cow.png"}/>
                    <img src={imgResource+"Pig.png"}/>
                </Slider>
            </div>






            </div>
        )
    }
}