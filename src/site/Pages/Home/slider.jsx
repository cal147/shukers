import React, {Component} from 'react'
import Slider from 'react-slick'
import {imgResource} from '../../../shared/urls'


export default class imgSlider extends Component {

    render() {

        const settings = {
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplayspeed: 10000,
            speed: 1000,
            fade: true,
            pauseOnHover: true,
            arrows: false,
        };

        // Desktop Site Slider
        if (window.innerWidth > 800) {
            return (
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
                </div>)
        }

        // Mobile Site Slider
        else {
            return (
                <div className="mobileSiteSlider">
                    <Slider {...settings}>
                        <img src={imgResource + "Cow.png"} alt="Cow.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Chicken.png"} alt="Chicken.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Duck.png"} alt="Duck.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Goat.png"} alt="Goat.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Lamb.png"} alt="Lamb.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Pork.png"} alt="Pork.png" className="mobileSliderImg"/>
                        <img src={imgResource + "Veal.png"} alt="Veal.png" className="mobileSliderImg"/>
                    </Slider>
                </div>
            )
        }
    }
}