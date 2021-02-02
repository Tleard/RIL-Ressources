import {getRole} from "./App";

class Auth {
    constructor() {
        if(localStorage.getItem('auth_token') !== 'undefined') {
            this.accessToken = JSON.parse(localStorage.getItem('auth_token'));
        } 
    }

    loggedin() {
        console.log('loggedin and token is stored');
        //this.accessToken = JSON.parse(localStorage.getItem('auth_token'));
    }

    loggedout(callback) {
        let roleTab = getRole();
        console.log('loggedout');
        localStorage.auth_token = undefined;
        callback();
    }

    getToken() {
        return this.accessToken;
    }
}

export default new Auth();