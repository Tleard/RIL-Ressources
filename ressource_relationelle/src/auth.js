

class Auth {
    constructor() {
        if(sessionStorage.getItem('auth_token')) {
            this.accessToken = JSON.parse(sessionStorage.getItem('auth_token'));
        } 
    }

    loggedin() {
        window.location.href = "http://localhost:3000/home";
        //this.accessToken = JSON.parse(localStorage.getItem('auth_token'));
    }

    loggedout(callback) {

        console.log('loggedout');
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('idUser')
        callback();
    }

    getToken() {
        return this.accessToken;
    }
}

export default new Auth();