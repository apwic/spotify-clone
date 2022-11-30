const userPanel = (role, username) => {
  return `
    <div id="user-panel">
    ${
      role === "admin" ?
      `
        <div class="user-icon" onClick="goToUserList()"></div>
      `
      : `
        <div class="user-text">
          Hello, <strong>${username}</strong>
        </div>
      `
    }
    </div>
  `
}

const navbarLayout = (role, loginStatus) => {
  return `<div class="navbar-container">
        <div class="section-features">
            <div class="feature-group" onClick="goToHome()">
              <img src="./assets/image/home.png"/>
              <div class="navbar-text">Home</div>
            </div>
            <div class="feature-group" onClick="goToSearch()">
              <img src="./assets/image/search.png"/>
              <div class="navbar-text">Search</div>
            </div>
            <div class="feature-group" onClick="goToAlbumList()">
              <img src="./assets/image/menu-burger.png"/>
              <div class="navbar-text">Album List</div>
            </div>
            <div class="feature-group" onClick="goToPremiumSongList()">
              <img src="./assets/image/song.png"/>
              <div class="navbar-text">Premium Song</div>
            </div>
            <div class="feature-group" onClick="goToPremiumSingerList()">
              <img src="./assets/image/microphone.png"/>
              <div class="navbar-text">Premium Singer</div>
            </div>
            <br/>
        ${
          role === "admin"
            ? `<div class="feature-group" onClick="goToAddSong()">
              <img src="./assets/image/music-file.png"/>
              <div class="navbar-text">Add Song</div>
            </div>
            <div class="feature-group" onClick="goToAddAlbum()">
              <img src="./assets/image/folder-download.png"/>
              <div class="navbar-text">Add Album</div>
            </div>`
            : ``
        }
            <div class="feature-group" onClick="logout()">
              <img src="./assets/image/exit.png"/>
              <div class="navbar-text">${loginStatus === true ? "Log Out" : "Log In"}</div>
            </div>
          </div>
          <div class="section-playlist">
            <div class="playlist-name navbar-text" onClick="alert('13520044 - Adiyansa Prasetya Wicaksana')">
              playlist pargoy anca
            </div>
            <div class="playlist-name navbar-text" onClick="alert('13520083 - Sarah Azka Arief')">
              sarah bertilawah <3
            </div>
            <div class="playlist-name navbar-text" onClick="alert('13520107 - Azka Syauqy Irsyad')">
              cepmek brsama azka
            </div>
          </div>
        </div>
      `;
};

goToUserList = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/userlist.html`;
}

goToAddSong = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/addsong.html`;
};

goToAddAlbum = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/addalbum.html`;
};

goToSearch = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/search.html`;
};

const goToPremiumSongList = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/premium-song-list.html`;
};

const goToPremiumSingerList = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/premium-singer.html`;
}

const goToHome = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}`;
};

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

    document.getElementById("navbar").innerHTML = navbarLayout(thisIsAdmin, hasLogin);
    document.getElementById("user-panel").innerHTML = userPanel(thisIsAdmin, name);
  });
};

isThisAdmin();