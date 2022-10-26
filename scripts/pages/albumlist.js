const albumsLayout = (page) => {
  if (page > 0) {
    getAPI(`./api/album/getalbums.php?page=${page}`, (data) => {
      const jsonData = JSON.parse(data);
      albums = jsonData.payload;
      str = `<div class="page-title">Album List
            </div>
            <div id="albums" class="album-list-container">`;

      str += albums.map(album =>
        `<div class="album-list">
          <img src="${album.image_path}" alt=""/>
          <label>${album.judul} - ${album.penyanyi} - ${album.tanggal_terbit} - ${album.genre}</label>
        </div>`
      ).join("");
  
      str += `
        </div>
        <div class="page-anchor">
        <button class="page-anchor-button" onclick="albumsLayout(${page - 1})">\<</button>
        <label><b>${page}</b></label>
        <button class="page-anchor-button" onclick="albumsLayout(${page + 1})">\></button>
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

albumsLayout(1);