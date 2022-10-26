const songsLayout = (page) => {
  getAPI(`./api/song/getallsongs.php?page=${page}`, (data) => {
    const jsonData = JSON.parse(data);
    songs = jsonData.payload;
    document.getElementById("songs").innerHTML = songs.map(song =>
      `<div class="song-list">
        <img src="./assets/image/menu-burger.png"/>
        <label>${song.judul} - ${song.penyanyi} - ${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</label>
      </div>`
    ).join("");
  }); 
}

songsLayout(1);