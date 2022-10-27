const songsLayout = (page) => {
  if (page > 0) {
    getAPI(`./api/song/getallsongs.php?page=${page}`, (data) => {
      const jsonData = JSON.parse(data);
      songs = jsonData.payload;
      str = `<div class="page-title">Sepotipayi
            </div>
            <div id="songs" class="song-list-container">`;

      str += songs.map(song =>
        `<div class="song-list" 
            data-value="${song.song_id}" 
            data-image="${song.image_path}"
            data-audio="${song.audio_path}"
            data-judul="${song.judul}"
            data-penyanyi="${song.penyanyi}"
          >
          <img src="${song.image_path}" alt=""/>
          <label>${song.judul} - ${song.penyanyi} - ${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</label>
        </div>`
      ).join("");
  
      str += `
        </div>
        <div class="page-anchor">
        <button class="page-anchor-button" onclick="songsLayout(${page - 1})">\<</button>
        <label><b>${page}</b></label>
        <button class="page-anchor-button" onclick="songsLayout(${page + 1})">\></button>
        </div>`;

      document.getElementById("page-container").innerHTML =  str;

      window.history.replaceState(
        null,
        "",
        window.location.origin + window.location.pathname + "?page=" + page
      );
    });
  }
}

songsLayout(1);

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