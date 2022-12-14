const albumsLayout = (page) => {
  if (page > 0) {
    getAPI(`./api/album/getalbums.php?page=${page}`, (data) => {
      const jsonData = JSON.parse(data);
      albums = jsonData.payload;
      str = `<div class="page-title">Album List</div>
              <div id="albums" class="album-list-container">`;

      str += albums.map(album =>
          `<div class="album-list" data-value="${album.album_id}">
            <img src="${album.image_path}" alt=""/>
            <div class="album-title">
              ${album.judul}
            </div>
            <div class="album-artist">
              ${album.penyanyi}
            </div>
            <div class="album-desc">
              <div class="album-date">
                ${album.tanggal_terbit}
              </div>
              <div class="genre">
                ${album.genre}
              </div>
            </div>
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

const clickAlbumDetail = (id) => {
  window.location.href = `${window.location.protocol}//${window.location.host}/album.html?id=${id}`;
}

document.addEventListener("click", function(e) {
  if (e.target.getAttribute("class") == "album-list") {
    const id = e.target.getAttribute("data-value");
    clickAlbumDetail(id);
  }
});