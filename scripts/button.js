
const clickable = (temp) => {
  getAPI(`./api/album/getalbum.php?id=${temp}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  } );
}

const searchSong = (query) => {
  const genre = "RnB";
  const order = "asc";
  getAPI(`./api/search.php?q=${query}&filter=${genre}&sort=${order}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
}