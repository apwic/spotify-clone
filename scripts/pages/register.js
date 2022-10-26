const matchPass = () => {
    // get the value
    const pass = document.getElementById('password').value;
    const passConfirm = document.getElementById('repassword').value;

    return pass === passConfirm;
}

const callbackRegisters = (data) => {
    // parse the data from backend
    const result = JSON.parse(data);

    // check the status
    if (result.hasOwnProperty('status') && result['status'] === 'success') {
        deleteCookie();

        const session_id = result['session']['sessionToken'];
        setCookie(session_id, 1800);

        window.location = '/';
    } else {
        alert('Register failed!');
    }
}

const registered = (e) => {
    e.preventDefault();

    if (matchPass()) {
        // get the input from form
        const dataRegister = new FormData(e.target);

        // post to checking the register to backend
        postAPI('/api/authentication/register.php', callbackRegisters, dataRegister);
    } else {
        alert('Password does not match!');
    }
    
    return;
}