const songsLayout = (page) => {
  if (page > 0) {
    getAPI(`./api/song/getallsongs.php?page=${page}`, (data) => {
      console.log(data);
      const jsonData = JSON.parse(data);
      songs = jsonData.payload;
      str = `<div class="page-title">Sepotipayi
            </div>
            <div id="songs" class="song-list-container">`;
      str += songs.map(song =>
        `<div class="song-list">
          <img src="./assets/image/menu-burger.png"/>
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