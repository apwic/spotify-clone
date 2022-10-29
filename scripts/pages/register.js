const callbackChecking = (data) => {
    // parse the data from backend
    const result = JSON.parse(data);

    // check the status
    if (result.hasOwnProperty('status') && result['status'] === 'success') {
        if (result['code'] === 'user') {
            document.getElementById('username').style.borderColor = 'green';
            document.getElementsByClassName('error-message')[0].innerHTML = '';
        }
        if (result['code'] === 'email') {
            document.getElementById('email').style.borderColor = 'green';
            document.getElementsByClassName('error-message')[1].innerHTML = '';
        }
    } else {
        if (result['code'] === 'user') {
            document.getElementById('username').style.borderColor = 'red';
            document.getElementsByClassName('error-message')[0].innerHTML = result['description'];
        }
        if (result['code'] === 'email') {
            document.getElementById('email').style.borderColor = 'red';
            document.getElementsByClassName('error-message')[1].innerHTML = result['description'];
        }
    }
}

const checkUsername = (e) => {
    e.preventDefault();

    const usernameData = new FormData();
    usernameData.append('username', e.target.value);

    postAPI('/api/authentication/checkusername.php', callbackChecking, usernameData);

    return;
}

const checkEmail = (e) => {
    e.preventDefault();

    const emailData = new FormData();
    emailData.append('email', e.target.value);

    postAPI('/api/authentication/checkemail.php', callbackChecking, emailData);
    
    return;
}

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
