/*
    This is the data store that is used to store the data for the user that is logged in. The data store will communicate with the server
    to update its data upon request.
 */

import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher';
import {serverScripts} from '../../shared/urls';

class AdminUserStore extends EventEmitter{


    constructor() {
        super();
        this.user = {
            id: null,
            userName: null,
            firstName: null,
            surName: null,
            contactNum: null,
            houseNum: null,
            addressL1: null,
            addressL2: null,
            postcode: null,
            isHome: null,
            isDelivery: null,
            Staff: false,
            isLoggedIn: false,
            logInError: false,
        };


    }//End of constructor

    //Queries the database and sets the datafields with the users information.
    loginUser(name, password){

        fetch(serverScripts+"admin/UserStoreController.php", {
            method: 'POST',
            headers:{"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "LOGIN_USER",
                name: name,
                password: password
            }),
            mode: 'cors'
        }).then((response)=>response.json()).then((data)=>{

            this.user.id = data['id'];
            this.user.userName = data['loginId'];
            this.user.firstName = data['forName'];
            this.user.surName = data['surName'];
            this.user.contactNum = data['contactNum'];
            this.user.houseNum = data['houseNum'];
            this.user.addressL1 = data['adFirstLine'];
            this.user.addressL2 = data['adSecondLine'];
            this.user.postcode = data['postcode'];
            this.user.isHome = data['homeAddress'];
            this.user.isDelivery = data['deliveryAddress'];
            this.user.Staff = data['isStaff'];
            this.user.isLoggedIn = true;
            this.user.logInError = false;

            this.emit("change");

        }).catch((err)=>{
            console.error(err);
        });



    }//End of login user


    logoutUser(){

        //TODO ajax call to the user store controller action LOGOUT.
        if(this.user.isLoggedIn){
            this.user = {
                id: null,
                userName: null,
                firstName: null,
                surName: null,
                contactNum: null,
                houseNum: null,
                addressL1: null,
                addressL2: null,
                postcode: null,
                isHome: null,
                isDelivery: null,
                Staff: false,
                isLoggedIn: false,
                logInError: false,
            };

            this.emit("change");
        }
    }

    //Returns the data currently held for a user
    getUser(){
        return this.user;
    }//End of get user

    //Listens for dispatched. when a dispatch comes in the relevant method is called.
    handleActions(action){

        switch(action.type){
            case "USER_LOGIN":
                this.loginUser(action.name, action.password);
                break;
            case "USER_LOGOUT":
                this.logoutUser();
                break;

            default: break;
        }
    }//End of handle actions

}

const adminUserStore = new AdminUserStore();
Dispatcher.register(adminUserStore.handleActions.bind(adminUserStore));
export default adminUserStore;