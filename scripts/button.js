
const clickable = (temp) => {
  getAPI(`./api/album/getalbum.php?id=${temp}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  } );
}