const navbarLayout = (role, loginStatus, name) => {
  return `
        ${
          role === "admin"
            ? `<div class="navbar-container-admin">`
            : `<div class="navbar-container">`
        }
        <div class="section-features">
            <div class="feature-group" onClick="goToHome()">
              <img src="./assets/image/home.png"/>
              <div>Home</div>
            </div>
            <div class="feature-group" onClick="goToSearch()">
              <img src="./assets/image/search.png"/>
              <div>Search</div>
            </div>
            <div class="feature-group" onClick="goToAlbumList()">
              <img src="./assets/image/menu-burger.png"/>
              <div>Album List</div>
            </div>
            <div class="feature-group" onClick="goToTest()">
              <img src="./assets/image/test.png"/>
              <div>Test API</div>
            </div>
            <br/>
        ${
          role === "admin"
            ? `<div class="feature-group" onClick="goToAddSong()">
              <img src="./assets/image/music-file.png"/>
              <div>Add Song</div>
            </div>
            <div class="feature-group" onClick="goToAddAlbum()">
              <img src="./assets/image/folder-download.png"/>
              <div>Add Album</div>
            </div>`
            : ``
        }
            <div class="feature-group">
              <div>Hello, ${name}!</div>
            </div>
            <div class="feature-group" onClick="logout()">
              <img src="./assets/image/exit.png"/>
              <div>${loginStatus === true ? "Log Out" : "Log In"}</div>
            </div>
          </div>
          <div class="section-playlist" onClick="alert('lala kebo')">
            <div class="playlist-name">
              Lala kebo
            </div>
            <div class="playlist-name" onClick="alert('indo galau')">
              indo galau
            </div>
            <div class="playlist-name" onClick="alert('dangdut terbaik')">
              dandut terbaik
            </div>
          </div>
        </div>
      `;
};

goToAddSong = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/addsong.html`;
};

goToAddAlbum = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/addalbum.html`;
};

goToSearch = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/search.html`;
};

const goToHome = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}`;
};

const goToTest = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/test.html`;
}

const goToAlbumList = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/albumlist.html`;
};

const logout = () => {
  deleteCookie();
  window.location.href = `${window.location.protocol}//${window.location.host}/login.html`;
};

const isThisAdmin = () => {
  getAPI('/api/authentication/userdata.php', (data) => {
    const userdata = JSON.parse(data);
    console.log(userdata);
    let thisIsAdmin = "user";
    let hasLogin = false;
    let name = "Guest";

    if (userdata.hasOwnProperty('status') && userdata['status'] === 'success') {
      if (userdata.dataUser.isAdmin === "1") {
        thisIsAdmin = "admin";
      }
      hasLogin = true;
      name = userdata.dataUser.username;
    }

    console.log(thisIsAdmin);
    document.getElementById("navbar").innerHTML = navbarLayout(thisIsAdmin, hasLogin, name);
  });
};

isThisAdmin();