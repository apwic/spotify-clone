const values = [
  "img_album",
  "judul_album",
  "penyanyi_album",
];

const updateAlbum = (e) => {
  e.preventDefault();
  let image_path = document.getElementById("image_path").getAttribute("data-value");
  const old_image_path = image_path;
  const albumDetail = populateData();

  if (document.querySelector("#img_album").files[0]){
    image_path = "";
    const coverFile = new FormData();
    coverFile.append("img_file", document.querySelector("#img_album").files[0]);
    coverFile.append("type", "cover/album/");

    postAPI(
      `./api/addfile.php`, (resp) => {
        image_path = callback(resp);
        albumDetail.append("image_path", image_path);
        postAPI(
          `./api/album/updatealbum.php`, (resp) => {
            const data = JSON.parse(resp);
            if (data.status == "success") {
              deleteFile(old_image_path);
              window.location.reload();
            }
          }, albumDetail
        );
      },coverFile
    );
  } else {
    albumDetail.append("image_path", image_path);
    postAPI(
      `./api/album/updatealbum.php`, (resp) => {
        const data = JSON.parse(resp);
        console.log(resp);
        if (data.status == "success") {
          // window.location.reload();
        }
      }, albumDetail
    );
  }
}

const populateData = () => {
  const albumDetail = new FormData();
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== "img_album") {
      albumDetail.append(`${values[i]}`, document.querySelector(`#${values[i]}`).value);
    }
  }
  albumDetail.append("album_id", new URLSearchParams(window.location.search).get("id"));
  return albumDetail;
};

const callback = (resp) => {
  const data = JSON.parse(resp);
  if (data.hasOwnProperty("path") && data["path"] !== null) return data["path"];
  return "";
};

const albumLayout = (role) => {
  const id = new URLSearchParams(window.location.search).get("id");
  getAPI(
    `./api/album/getalbum.php?id=${id}`, (data) => {
      const jsonData = JSON.parse(data);
      const album = jsonData.payload;
      
      if (role === "admin") {
        document.getElementById("song-detail").innerHTML = `
        <img class="edit-icon" src="./assets/image/edit.png" alt=""/>
          <form enctype="multipart/form-data" method="post" onsubmit="updateAlbum(event)">
            <div class="song-detail-container" id="judul">
              <label>Judul</label>
              <input required type="text" name="judul_album" id="judul_album" value=${album.judul} placeholder="${album.judul}"/>
            </div>
            <div class="song-detail-container" id="penyanyi">
              <label>Penyanyi</label>
              <input required type="text" name="penyanyi_album" id="penyanyi_album" value="${album.penyanyi}" placeholder="${album.penyanyi}"/>
            </div>
            <div class="song-detail-container" id="total_duration" data-value="${album.total_duration}">
              <label>Total Duration</label>
              <label>${(album.total_duration/60) >> 0}:${("0" + album.total_duration%60).slice(-2)}</label>
            </div>
            <div class="song-detail-container" id="image_path" data-value="${album.image_path}">
              <label>Image Path</label>
              <img src="${album.image_path}" alt=""/>
              <input type="file" name="img_album" id="img_album" accept=".png, .jpg, .jpeg"/>
            </div>
            <div class="submit-delete" id="song-list">
              <button type="button" class="delete-song" onclick="deleteAlbum()">
                Delete
              </button>
              <input type="submit" value="Submit" id="uploadForm" name="submit"/>
            </div>
          </form>
        `;
      } else {
        document.getElementById("song-detail").innerHTML = `
        <form enctype="multipart/form-data">
          <div class="song-detail-container" id="judul">
            <label>Judul</label>
            <label>${album.judul}</label>
          </div>
          <div class="song-detail-container" id="penyanyi">
            <label>Penyanyi</label>
            <label>${album.penyanyi}</label>
          </div>
          <div class="song-detail-container" id="total_duration">
            <label>Total Duration</label>
            <label>${(album.total_duration/60) >> 0}:${("0" + album.total_duration%60).slice(-2)}</label>
          </div>
          <div class="song-detail-container" id="image_path">
            <label>Image Path</label>
            <img src="${album.image_path}" alt=""/>
          </div>
        </form>
        `;
      }

      getAPI(`./api/song/getsongs.php?album_id=${id}`, (data) => {
        const jsonData = JSON.parse(data);
        const songs = jsonData.payload;
        str = `<div id="songs" class="song-list-container">`;
        
        str += songs.map(song =>
          `<div class="song-list" data-value="${song.song_id}">
            <div class="song-list-detail">
              <img class="detail-img" src="${song.image_path}" alt=""/>
              <div class="detail-song">
                <label>${song.judul}</label>
                <label>${song.penyanyi}</label>
              </div>
            </div>
            <label class="label">${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</label>
          </div>`
          ).join("");
          
        str += `</div>`;
        document.getElementById("page-container").insertAdjacentHTML("beforeend", str);
      });
    }
  );
}

const deleteAlbum = () => {
    const id = new URLSearchParams(window.location.search).get("id");
    console.log(id);
    getAPI(`./api/song/getsongs.php?album_id=${id}`, async(resp) => {
        const data = JSON.parse(resp);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("songs", JSON.stringify(data.payload));
        postAPI(
            `./api/album/deletealbum.php`, (resp) => {
            const data = JSON.parse(resp);
            alert(data.description);
            // goToHome();
            }, formData
        )
    })
}

const isAlbumEditable = () => {
  getAPI('/api/authentication/userdata.php', (data) => {
    const userdata = JSON.parse(data);
    let thisIsAdmin = "user";

    if (userdata.hasOwnProperty('status') && userdata['status'] === 'success') {
      if (userdata.dataUser.isAdmin === "1") {
        thisIsAdmin = "admin";
      }
    }

    albumLayout(thisIsAdmin);
  });
}

const deleteFile = (path) => {
  const formData = new FormData();
  formData.append("path", path);
  postAPI(
    `./api/deletefile.php`, (data) => {
      const jsonData = JSON.parse(data);
      alert(jsonData.description);
    }, formData
  );
}

isAlbumEditable();

const clickSongDetail = (id) => {
  window.location.href = `${window.location.protocol}//${window.location.host}/song.html?id=${id}`;
}

document.addEventListener("click", function(e) {
  if (e.target.getAttribute("class") == "song-list") {
    const id = e.target.getAttribute("data-value");
    console.log(id);
    clickSongDetail(id);
  }
});