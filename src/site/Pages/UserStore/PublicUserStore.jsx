/*
    This is the data store that is used to store the data for the user that is logged in. The data store will communicate with the server
    to update its data upon request.
 */

import {EventEmitter} from 'events';
import Dispatcher from '../../../dispatcher';
import {serverScriptsPublic} from '../../../shared/urls';

class PublicUserStore extends EventEmitter {


    constructor() {
        super();
        if (sessionStorage.getItem('userData') === null) {
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
                email: false,
                serverSession: null
            };
        } else {
            let data = JSON.parse(sessionStorage.getItem('userData'));
            this.user = {
                id: data['id'],
                userName: data['loginId'],
                firstName: data['forName'],
                surName: data['surName'],
                contactNum: data['contactNum'],
                houseNum: data['houseNum'],
                addressL1: data['adFirstLine'],
                addressL2: data['adSecondLine'],
                postcode: data['postcode'],
                isHome: data['homeAddress'],
                isDelivery: data['deliveryAddress'],
                Staff: data['isStaff'],
                isLoggedIn: true,
                logInError: false,
                email: data['email'],
                serverSession: data['sessionId']
            };

        }

    }//End of constructor

    //Queries the database and sets the datafields with the users information.
    loginUserPublic(name, password) {

        fetch(serverScriptsPublic + "Controllers/PublicUserStoreController.php", {
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: JSON.stringify({
                action: "LOGIN_USER_PUBLIC",
                name: name,
                password: password
            }),
            mode: 'cors'
        }).then((response) => response.json()).then((data) => {

            this.user.id = data['id'];
            this.user.userName = data['loginId'];
            this.user.firstName = data['forName'];
            this.user.surName = data['surName'];
            this.user.contactNum = data['contactNum'];
            this.user.houseNum = data['houseNum'];
            this.user.addressL1 = data['adFirstLine'];
            this.user.addressL2 = data['adSecondLine'];
            this.user.postcode = data['postcode'];
            this.user.DelhouseNum = data['DelhouseNum'];
            this.user.DeladdressL1 = data['DeladFirstLine'];
            this.user.DeladdressL2 = data['DeladSecondLine'];
            this.user.Delpostcode = data['Delpostcode'];
            this.user.isHome = data['homeAddress'];
            this.user.isDelivery = data['deliveryAddress'];
            if (data['loginId'] != null) this.user.isLoggedIn = true;
            this.user.logInError = !data['success'];
            this.user.serverSession = data['sessionId'];
            this.user.email = data['email'];

            if (data['loginId'] != null) sessionStorage.setItem("userData", JSON.stringify(data));
            this.emit("change");
        }).catch((err) => {
            console.error(err);
        });


    }//End of login user


    logoutUserPublic() {

        if (this.user.isLoggedIn) {

            let serverCallComplete;

            fetch(serverScriptsPublic + "Controllers/PublicUserStoreController.php", {
                method: 'POST',
                headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                body: JSON.stringify({
                    action: "LOGOUT_PUBLIC",
                    sessionId: this.user.serverSession
                }),
                mode: 'cors'
            }).then((response) => response.json()).then((data) => {
                serverCallComplete = data.success;

                if (serverCallComplete) {
                    this.user.id = null;
                    this.user.userName = null;
                    this.user.firstName = null;
                    this.user.surName = null;
                    this.user.contactNum = null;
                    this.user.houseNum = null;
                    this.user.addressL1 = null;
                    this.user.addressL2 = null;
                    this.user.postcode = null;
                    this.user.DelhouseNum = null;
                    this.user.DeladdressL1 = null;
                    this.user.DeladdressL2 = null;
                    this.user.Delpostcode = null;
                    this.user.isHome = null;
                    this.user.isDelivery = null;
                    this.user.isLoggedIn = false;
                    this.user.logInError = false;
                    this.user.email = null;

                    sessionStorage.clear();

                    this.emit("change");
                }

            }).catch((err) => {
                console.error(err);
            });

        }
    }

    //Returns the data currently held for a user
    getUser() {
        return this.user;
    }//End of get user

    getLoggedInStatus() {
        return this.user.isLoggedIn;
    }

    //Listens for dispatched. when a dispatch comes in the relevant method is called.
    handleActions(action) {

        switch (action.type) {
            case "LOGIN_USER_PUBLIC":
                this.loginUserPublic(action.name, action.password);
                break;
            case "LOGOUT_PUBLIC":
                this.logoutUserPublic();
                break;

            default:
                break;
        }
    }//End of handle actions

}

const adminUserStore = new PublicUserStore();
Dispatcher.register(adminUserStore.handleActions.bind(adminUserStore));

window.adminUserStore = adminUserStore; //Temp can access the user store from the console.

export default adminUserStore;