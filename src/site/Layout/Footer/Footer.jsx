import React, {Component} from 'react'
import "../Layout.css"
import {Divider} from 'semantic-ui-react'

export default class Footer extends Component{

    render(){

        let dateCopy = null;
        if (new Date().getFullYear() !== 2017) {
            dateCopy = ' - ' + (new Date().getFullYear());
        }

        return(
            <div className="siteFooter">

                    <div>
                        <Divider/>
                        <Divider horizontal>Copyright{'\u00A9'} 2017{dateCopy} CLPS</Divider>
                        <Divider/>
                    </div>
            </div>
        )
    }
}