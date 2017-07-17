import React, {Component} from 'react';
import adminUserStore from './AdminStores/AdminUserStore';
import AdminLogin from './AdminPages/AdminLogin';


const Page = ()=>{

    return(
        <div>This is a page</div>
    );

};


export default class MainPage extends Component{

    constructor(){
        super();

        this.getUserOnChange = this.getUserOnChange.bind(this);

        this.state ={
            user: adminUserStore.getUser(),
        };

        if(this.state.user.isLoggedIn){
            this.state.display = <Page />;
        }else{
            this.state.display = <AdminLogin error={this.state.user.logInError}/>;
        }

    }
    componentWillMount(){
        adminUserStore.on("change", this.getUserOnChange);

    }

    getUserOnChange(){
        this.setState({
            user: adminUserStore.getUser()
        });

        if(this.state.user.isLoggedIn && this.state.user.Staff){
            this.setState({display : <Page /> });
        }else if(this.state.user.logInError){
            this.setState({display: <AdminLogin error={this.state.user.logInError}/>});
        }

    }

    render(){

        return(
            <div>
                {this.state.display}
            </div>
        );
    }
}
