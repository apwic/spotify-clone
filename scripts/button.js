
const getSong = (id) => {
  getAPI(`./api/song/getsong.php?id=${id}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  } );
}

const getAlbum = (id) => {
  getAPI(`./api/album/getalbum.php?id=${id}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}

const getAlbums = (page) => {
  getAPI(`./api/album/getalbums.php?page=${page}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}

const getSongs = (album_id) => {
  getAPI(`./api/song/getsongs.php?album_id=${album_id}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}

const getAllSongs = (page) => {
  getAPI(`./api/song/getallsongs.php?page=${page}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}

const searchSong = (query) => {
  const genre = "RnB";
  const order = "asc";
  const page = 1;
  getAPI(`./api/search.php?q=${query}&filter=${genre}&sort=${order}&page=${page}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}