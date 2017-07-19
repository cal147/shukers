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
        //TODO Ajax call to see if user is already logged in
        this.user = {
            id: 1,
            userName: 'Admin',
            firstName: 'Administrator',
            surName: 'Administrator',
            isLoggedIn: false,
            Staff: true, //TODO Need to change this. For dev only need to come from database
            logInError: false,
        };


    }//End of constructor

    //Queries the database and sets the datafields with the users information.
    loginUser(name, password){
        //TODO Ajax call to the data base to log in user
        if(name === "carl" && password==="123456"){
            this.user.isLoggedIn = true;
            this.emit("change");
        }else{
            this.user.logInError = true;
            this.emit("change");
        }

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
                console.log(data);
        }).catch((err)=>{
            console.error(err);
        });



    }//End of login user

    //TODO Nulls all the fields in the dataStore
    logoutUser(){
        if(this.user.isLoggedIn){
            //TODO log out user
            this.user.isLoggedIn = false;

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