const callbackLogin = (data) => {
    // parse the data from backend
    const result = JSON.parse(data);

    // check the status
    if (result.hasOwnProperty('status') && result['status'] === 'success') {
        deleteCookie();

        const session_id = result['session']['sessionToken'];
        setCookie(session_id, 1800);

        window.location = '/';
    } else {
        alert('Login failed!');
    }
}

const logined = (e) => {
    e.preventDefault();

    // get the input from form
    const dataLogin = new FormData(e.target);

    // post to checking the login to backend
    postAPI('/api/authentication/login.php', callbackLogin, dataLogin);

    return;
}