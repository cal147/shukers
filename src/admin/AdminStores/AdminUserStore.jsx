import { EventEmitter } from 'events';
import Dispatcher from '../../dispatcher';

class AdminUserStore extends EventEmitter{

    constructor() {
        super();
        //TODO Ajax call to see if user is already logged in
        this.user = {
            id: null,
            userName: null,
            firstName: null,
            surName: null,
            isLoggedIn: false,
            Staff: true, //TODO Need to change this. For dev only need to come from database
            logInError: false,
        };


    }//End of constructor

    loginUser(name, password){
        //TODO Ajax call to the data base to log in user
        if(name === "carl" && password==="123456"){
            this.user.isLoggedIn = true;
            this.emit("change");
        }else{
            this.user.logInError = true;
            this.emit("change");
        }

    }//End of login user

    getUser(){
        return this.user;
    }//End of get user

    handleActions(action){

        switch(action.type){
            case "USER_LOGIN":
                this.loginUser(action.name, action.password);
                break;


            default: break;
        }
    }//End of handle actions

}

const adminUserStore = new AdminUserStore();
Dispatcher.register(adminUserStore.handleActions.bind(adminUserStore));
export default adminUserStore;