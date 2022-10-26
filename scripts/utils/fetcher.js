const getAPI = (endpoint, callback, data) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        
        if (this.status === 200) {
            callback(this.responseText);
        } else {
            // TODO: handling different types of error
            alert(this.responseText);
        }
  };

    xhr.open("GET", endpoint);

    // const sessionId = getCookie("session_id");
    // if (sessionId) {
    //     xhr.setRequestHeader("sessionToken", sessionId);
    // }

    data ? xhr.send(data) : xhr.send();
};

const postAPI = (endpoint, callback, data) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        
        if (this.status === 200) {
            // alert(this.responseText); // debugging
            callback(this.responseText);
        } else {
            // TODO: handling different types of error
            alert(this.responseText);
        }
    };
    
    xhr.open("POST", endpoint);
    
    // const sessionId = getCookie("session_id");
    // if (sessionId) {
    //     xhr.setRequestHeader("sessionToken", sessionId);
    // }

    data ? xhr.send(data) : xhr.send();
};
