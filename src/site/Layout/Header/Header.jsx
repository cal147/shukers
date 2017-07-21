import React, {Component} from 'react'
import Logo from "./Images/Logo.png"
import "../Layout.css"

export default class Header extends Component{


    render(){


        return(
            <div className="header">
            <img src={Logo} className="header-Logo" alt="Shukers Butchers Jackson Street - Logo"/>
                <h1 className="header-Text">Shukers Butchers Jackson Street</h1>


            </div>
        )
    }
}