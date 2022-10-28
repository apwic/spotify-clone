const values = [
  "file_lagu",
  "image_lagu",
  "judul_lagu",
  "tanggalterbit_lagu",
  "genre_lagu",
  "album_lagu",
];

const updateSong = (e) => {
  e.preventDefault();
  let audio_path = document.getElementById("audio_path").getAttribute("data-value");
  let image_path = document.getElementById("image_path").getAttribute("data-value");
  const old_audio_path = audio_path;
  const old_image_path = image_path;
  const songDetail = populateData();
  if (document.querySelector("#file_lagu").files[0]) {
    audio_path = ""
    const songFile = new FormData();
    songFile.append("file_lagu", document.querySelector("#file_lagu").files[0]);
    songFile.append("type", "song");

    if (document.querySelector("#image_lagu").files[0]) {
      image_path = "";
      const coverFile = new FormData();
      coverFile.append("img_file", document.querySelector("#image_lagu").files[0]);
      coverFile.append("type", "cover/song/");

      postAPI(
        `/api/addfile.php`,
        (resp) => {
          audio_path = callback(resp);
          const audio = new Audio(audio_path);
          audio.onloadedmetadata = function () {
            audio_duration = audio.duration;
            postAPI(
              "/api/addfile.php",
              (resp) => {
                image_path = callback(resp);
                const songDetail = populateData();
                songDetail.append("audio_path", audio_path);
                songDetail.append("image_path", image_path);
                songDetail.append("duration", audio_duration);
          
                postAPI(
                  `./api/song/updatesong.php`, (resp) => {
                    const data = JSON.parse(resp);
                    alert(data["description"]);
                    if (data.status === "success") {
                      deleteFile(old_audio_path);
                      deleteFile(old_image_path);
                      window.location.reload();
                    }
                  }, songDetail
                );
              },
              coverFile
            );
          };
        }, songFile
      );
    } else {
      postAPI(
        `/api/addfile.php`,
        (resp) => {
          audio_path = callback(resp);
          const audio = new Audio(audio_path);
          audio.onloadedmetadata = function () {
            audio_duration = audio.duration;
            songDetail.append("audio_path", audio_path);
            songDetail.append("image_path", image_path);
            songDetail.append("duration", audio_duration);
            console.log(audio_duration);

            postAPI(
              `./api/song/updatesong.php`, (resp) => {
                const data = JSON.parse(resp);
                if (data.status === "success") {
                  deleteFile(old_audio_path);
                  window.location.reload();
                }
              }, songDetail
            );
          };
        }, songFile
      );
    }
  } else {
    if (document.querySelector("#image_lagu").files[0]) {
      image_path = "";
      const coverFile = new FormData();
      coverFile.append("img_file", document.querySelector("#image_lagu").files[0]);
      coverFile.append("type", "cover/song/");

      postAPI(
        "/api/addfile.php",
        (resp) => {
          image_path = callback(resp);
          const songDetail = populateData();
          songDetail.append("audio_path", audio_path);
          songDetail.append("image_path", image_path);
          songDetail.append("duration", document.getElementById("duration").getAttribute("data-value"));
          postAPI(
            `./api/song/updatesong.php`, (resp) => {
              const data = JSON.parse(resp);
              if (data.status === "success") {
                deleteFile(old_image_path);
                window.location.reload();
              }
            }, songDetail
          );
        },
        coverFile
      );
    } else {
      songDetail.append("audio_path", audio_path);
      songDetail.append("image_path", image_path);
      songDetail.append("duration", document.getElementById("duration").getAttribute("data-value"));
      postAPI(
        `./api/song/updatesong.php`, (resp) => {
          const data = JSON.parse(resp);
          if (data.status === "success") {
            window.location.reload();
          }
        }, songDetail
      );
    }
  }
};

const populateData = () => {
  const songDetail = new FormData();
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== "image_lagu" && values[i] !== "file_lagu") {
      songDetail.append(
        `${values[i]}`,
        document.querySelector(`#${values[i]}`).value
      );
    }
  }
  songDetail.append("song_id",new URLSearchParams(window.location.search).get("id"));
  return songDetail;
};

const callback = (resp) => {
  const data = JSON.parse(resp);
  if (data.hasOwnProperty("path") && data["path"] !== null) return data["path"];
  return "";
};

const isDataValid = () => {
  for (let i = 0; i < values.length; i++) {
    if (!document.querySelector(`#${values[i]}`).value) {
      return false;
    }
  }
  return true;
};

const populateAlbum = () => {
  getAPI(
    `./api/album/getallalbums.php`, (data) => {
      const jsonData = JSON.parse(data);
      const albums = jsonData.payload;
      const albumSelect = document.getElementById("album_lagu");
      const albumDefault = document.getElementById("default-album");
      albums.forEach((album) => {
        if (album.album_id != albumDefault.value){
          const option = document.createElement("option");
          option.value = album.album_id;
          option.text = album.judul;
          albumSelect.appendChild(option);
        }
      });
    },
  );
}

const songLayout = (role) => {
  const id = new URLSearchParams(window.location.search).get("id");
  getAPI(
    `./api/song/getsong.php?id=${id}`, (data) => {
      const jsonData = JSON.parse(data);
      const song = jsonData.payload;
      if (role === "admin"){
        document.getElementById("page").innerHTML = `
        <div class="song-detail-header">
          <img class="song-img" src="${song.image_path}" alt=""/>
          <div class="song-detail-title">
            <strong>${song.judul}</strong>
            <p>${song.penyanyi} - ${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</p>
          </div>
          <img 
            class="song-play play-song-button"
            data-image="${song.image_path}"
            data-audio="${song.audio_path}"
            data-judul="${song.judul}"
            data-penyanyi="${song.penyanyi}"
            src="./assets/image/play-btn-black.png" 
          alt=""/>
        </div>
        <div class="song-detail view-scroll" id="song-detail">
          <img class="edit-icon" src="./assets/image/edit.png" alt=""/>
          <form enctype="multipart/form-data" method="post" onsubmit="updateSong(event)" id="edit-song">
            <div class="song-detail-container" id="judul">
              <label>Judul</label>
              <input type="text" id="judul_lagu" name="judul" placeholder="${song.judul}" value="${song.judul}" required/>
            </div>
            <div class="song-detail-container" id="tanggal_terbit">
              <label>Tanggal Terbit</label>
              <input type="text" name="tanggalterbit_lagu" id="tanggalterbit_lagu" value="${song.tanggal_terbit}" placeholder="${song.tanggal_terbit}" required/>
            </div>
            <div class="song-detail-container" id="audio_path" data-value="${song.audio_path}">
              <label>Audio Path</label>
              <input type="file" name="file_lagu" id="file_lagu" accept=".mp3"/>
            </div>
            <div class="song-detail-container" id="image_path" data-value="${song.image_path}">
              <label>Image Path</label>
              <input type="file" name="image_lagu" id="image_lagu" accept=".png, .jpg, .jpeg"/>
            </div>
            <div class="song-detail-container" id="genre">
              <label>Genre</label>
              <input type="text" name="genre_lagu" id="genre_lagu" value="${song.genre}" placeholder="${song.genre}" required/>
            </div>
            <div class="song-detail-container" id="album_name" value="${song.album_id}">
              <label>Judul Album</label>
              <select name="album_lagu" id="album_lagu">
                <option id="default-album" value="${song.album_id}">${song.judul_album}</option>
              </select>
            </div>
            </form>
          </div>
        <div class="submit-delete" id="song-list">
          <button type="button" class="delete-song" onclick="deleteSong()">
            Delete
          </button>
          <input type="submit" form="edit-song" value="Submit" id="uploadForm" name="submit"/>
        </div>
      </div>
        `;
      } else {
        document.getElementById("page").innerHTML = `<div class="song-detail-header">
          <img class="song-img" src="${song.image_path}" alt=""/>
          <div class="song-detail-title">
            <strong>${song.judul}</strong>
            <p>Song Detail</p>
          </div>
          <img 
            class="song-play play-song-button"
            data-image="${song.image_path}"
            data-audio="${song.audio_path}"
            data-judul="${song.judul}"
            data-penyanyi="${song.penyanyi}"
            src="./assets/image/play-btn-black.png" 
          alt=""/>
        </div>
        <div class="song-detail" id="song-detail">
          <form enctype="multipart/form-data">
            <div class="song-detail-container" id="penyanyi">
              <label>Artist</label>
              <div class="value">${song.penyanyi}</div>
            </div>
            <div class="song-detail-container" id="tanggal_terbit">
              <label>Tanggal Terbit</label>
              <div class="value">${song.tanggal_terbit}</div>
            </div>
            <div class="song-detail-container" id="duration">
              <label>Duration</label>
              <div class="value">${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</div>
            </div>
            <div class="song-detail-container" id="genre">
              <label>Genre</label>
              <div class="value">${song.genre}</div>
            </div>
            <div class="song-detail-container" id="album_name">
              <label>Album</label>
              <div class="value">${song.judul_album}</div>
            </div>
          </form
        </div>
      </div>`;
      }
      populateAlbum();
    },
  );
};

const isSongEditable = () => {
  getAPI('/api/authentication/userdata.php', (data) => {
    const userdata = JSON.parse(data);
    let thisIsAdmin = "user";

    if (userdata.hasOwnProperty('status') && userdata['status'] === 'success') {
      if (userdata.dataUser.isAdmin === "1") {
        thisIsAdmin = "admin";
      }
    }

    songLayout(thisIsAdmin);
  });
};

const deleteSong = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const formData = new FormData();
  formData.append("id", id);
  postAPI(
    `./api/song/deletesong.php`, (data) => {
      const jsonData = JSON.parse(data);
      alert(jsonData.description);
      goToHome();
    }, formData
  );
};

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

isSongEditable();