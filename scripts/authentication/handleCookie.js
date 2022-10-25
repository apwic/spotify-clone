const setCookie = (session_id, exp) => {
    const dt = new Date();

    // set the expired time
    dt.setTime(dt.getTime() + (exp * 1000));

    // set the cookie
    document.cookie = `session_id=${session_id};expires=${dt.toUTCString()};path=/`;
}

const getCookie = (key) => {
    const cookie = document.cookie.split(';');
    
    for (let i = 0; i < cookie.length; i++) {
        const value = cookie[i].split('=');
        if (key == value[0].trim()) {
            return decodeURIComponent(value[1]);
        }
    }
    
    return null;
}

const deleteCookie = () => {
    document.cookie = `session_id=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}