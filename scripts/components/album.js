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

const getAlbum = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  console.log(id);
  getAPI(
    `./api/album/getalbum.php?id=${id}`, (data) => {
      const jsonData = JSON.parse(data);
      const album = jsonData.payload;
      str = `
      <div class="page-title">
        Album Detail
      </div>
      <div class="song-detail">
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
            <label>${album.total_duration}</label>
          </div>
          <div class="song-detail-container" id="image_path">
            <label>Image Path</label>
            <img src="${album.image_path}" alt=""/>
          </div>
        </form>
      </div>`;

      document.getElementById("page-container").innerHTML = str;

      getAPI(`./api/song/getsongs.php?album_id=${id}`, (data) => {
        const jsonData = JSON.parse(data);
        const songs = jsonData.payload;
        str = `<div id="songs" class="song-list-container">`;

        str += songs.map(song =>
          `<div class="song-list" data-value="${song.song_id}">
            <img src="${song.image_path}" alt=""/>
            <label>${song.judul} - ${song.penyanyi} - ${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</label>
          </div>`
        ).join("");

        document.getElementById("page-container").insertAdjacentHTML("beforeend", str);
      });
    },
  );
}

getAlbum();

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