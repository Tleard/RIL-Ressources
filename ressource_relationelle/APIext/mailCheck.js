
const API_MAILCHECK_KEY = "a2a5e86aece8c1b00b67c03a132c25ab" // Merci de ne pas l'utiliser dans le cadre des tests
let mail = "";

function checkMail(mail) {
    const url = "http://apilayer.net/api/check?access_key=" + API_MAILCHECK_KEY + "&email=" + mail + "&smtp=1&format=1"


}