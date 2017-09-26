//Classes can call these methods and a event will be dispatched. its down to the
// data store to listen and handle the dispatch type.

import Dispatcher from '../../dispatcher';


export function userLogin(name, password){
    Dispatcher.dispatch({
        type: "USER_LOGIN",
        name,
        password
    });
}

export function logoutUser(){
    Dispatcher.dispatch({
        type: "USER_LOGOUT"
    });
}

export function saleDispatched(id){
    Dispatcher.dispatch({
        type: "DISPATCH_SALE",
        id
    });
}