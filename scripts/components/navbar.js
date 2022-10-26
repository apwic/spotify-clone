const navbarLayout = (role) => {
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
            <div class="feature-group" onClick="logout()">
              <img src="./assets/image/exit.png"/>
              <div>Log Out</div>
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
  alert("Nanti diisi ke search");
};

const goToHome = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}`;
};

const goToTest = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/test.html`;
}

const goToAlbumList = () => {
  alert("Nanti diisi pake fungsi get album list");
};

const logout = () => {
  window.location.href = `${window.location.protocol}//${window.location.host}/login.html`;
  alert("Nanti diisi pake fungsi log out");
};

document.getElementById("navbar").innerHTML = navbarLayout("admin");
