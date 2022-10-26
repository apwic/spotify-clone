const populateAlbumSelector = () => {
  getAPI(
    `./api/album/getallalbums.php`, (resp) => {
      const data = (JSON.parse(resp));
      data?.payload?.map((album) => {
          document.getElementById("album_lagu").insertAdjacentHTML(
              "beforeend",
              `<option value="${album?.album_id}">${album?.judul}</option>`
          )
      })
    },
  );
};

const setArtist = () => {
  const album_id = document.getElementById("album_lagu").value;
  getAPI(
    `./api/album/getalbum.php?id=${album_id}`, (resp) => {
      const data = (JSON.parse(resp));
      document.getElementById("penyanyi_lagu").value = data?.payload?.penyanyi;
    },
  );
}

populateAlbumSelector();
