

export function login(username, password) {
    if (username == 'admin' && password == 'password') {
        return true;
    }
    else {
        console.log('errore');
    }
}