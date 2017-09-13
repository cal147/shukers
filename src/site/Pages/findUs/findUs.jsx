import React, {Component} from "react";
import {Embed} from 'semantic-ui-react';

export default class findUs extends Component {

    render() {
        return (
            <div>
                <h2>Where to Find Us</h2>
                <p>We are located at 17H West Side, off Jackson Street, St. Helens, WA9 3AT.</p>
                <Embed
                    url="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9504.767574119953!2d-2.7210912!3d53.4471559!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b1b62ddc4639f%3A0x44465642f8f1076d!2sShukers+Butchers!5e0!3m2!1sen!2suk!4v1502365193290"
                    active aspectRatio="21:9"/><br/>
                <div className="findUs_OpeningTime">
                    <h2><strong>Opening Times:</strong></h2>
                    <h4><strong>Monday</strong>: 9.00 - 16.00<br/>
                        <strong>Tuesday</strong>: 9.00 - 16.00<br/>
                        <strong>Wednesday</strong>: 9.00 - 16.00<br/>
                        <strong>Thursday</strong>: 9.00 - 16.00<br/>
                        <strong>Friday</strong>: 9.00 - 16.00<br/>
                        <strong>Saturday</strong>: 9.00 - 16.00<br/>
                        <strong>Sunday</strong>: <strong className="openingTime_Closed">CLOSED</strong></h4>
                </div>
            </div>
        )
    }
}