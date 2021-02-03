

class Auth {
    constructor() {
        if(localStorage.getItem('auth_token') !== 'undefined') {
            this.accessToken = JSON.parse(localStorage.getItem('auth_token'));
        } 
    }

    loggedin() {
        window.location.href = "http://localhost:3000/home";
        //this.accessToken = JSON.parse(localStorage.getItem('auth_token'));
    }

    loggedout(callback) {

        console.log('loggedout');
        localStorage.auth_token = undefined;
        callback();
    }

    getToken() {
        return this.accessToken;
    }
}

export default new Auth();