import React, {Component} from 'react'
import "../Layout.css"

export default class Footer extends Component{

    render(){
        return(
            <div className="footer">
                <hr/>
                    <div>
                        <h4>Copyright CLPS{'\u00A9'}</h4>

                    </div>
            </div>
        )
    }
}