
const getSong = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  getAPI(
    `./api/song/getsong.php?id=${id}`, (data) => {
      const jsonData = JSON.parse(data);
      const song = jsonData.payload;
      document.getElementById("judul").insertAdjacentHTML("beforeend", `<label>${song.judul}</label>`);
      document.getElementById("penyanyi").insertAdjacentHTML("beforeend", `<label>${song.penyanyi}</label>`);
      document.getElementById("tanggal_terbit").insertAdjacentHTML("beforeend", `<label>${song.tanggal_terbit}</label>`);
      document.getElementById("duration").insertAdjacentHTML("beforeend", `<label>${song.duration}</label>`);
      document.getElementById("audio_path").insertAdjacentHTML("beforeend", `<audio controls><source src="${song.audio_path}" type="audio/mpeg"></audio>`);
      document.getElementById("image_path").insertAdjacentHTML("beforeend", `<img src="${song.image_path}" alt=""/>`);
      document.getElementById("genre").insertAdjacentHTML("beforeend", `<label>${song.genre}</label>`);
      getAPI(`./api/album/getalbum.php?id=${song.album_id}`, (data) => {
        const jsonData = JSON.parse(data);
        const album = jsonData.payload;
        document.getElementById("album_name").insertAdjacentHTML("beforeend", `<label>${album.judul}</label>`);
      });
    },
  );
}

getSong();