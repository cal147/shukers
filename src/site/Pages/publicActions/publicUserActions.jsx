//Classes can call these methods and a event will be dispatched. its down to the
// data store to listen and handle the dispatch type.

import Dispatcher from '../../../dispatcher';


export function userLoginPublic(name, password) {
    Dispatcher.dispatch({
        type: "LOGIN_USER_PUBLIC",
        name,
        password
    });
}

export function logoutUserPublic() {
    Dispatcher.dispatch({
        type: "LOGOUT_PUBLIC"
    });
}