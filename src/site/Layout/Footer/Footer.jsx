import React, {Component} from 'react'
import "../Layout.css"
import {Divider} from 'semantic-ui-react'

export default class Footer extends Component{

    render(){
        return(
            <div className="siteFooter">

                    <div>
                        <Divider/>
                        <Divider horizontal>Copyright CLPS{'\u00A9'}</Divider>
                        <Divider/>
                    </div>
            </div>
        )
    }
}