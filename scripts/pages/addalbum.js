const values = [
  "img_album",
  "judul_album",
  "penyanyi_album",
  "tanggalterbit_album",
  "genre_album",
];

const addAlbum = (e) => {
  e.preventDefault();

  if (isDataValid()) {
    let img_path = "";
    const coverFile = new FormData();
    coverFile.append("img_file", document.querySelector("#img_album").files[0]);
    coverFile.append("type", "cover/album/");

    postAPI(
      "/api/addfile.php",
      (resp) => {
        img_path = callback(resp);
        postAlbum(img_path);
      },
      coverFile
    );
  } else {
    alert("Please fill in the form!");
  }

  return;
};

const postAlbum = (img_path) => {
  const albumDetail = populateData();
  albumDetail.append("image_path", img_path);

  postAPI("/api/album/addalbum.php", callbackAdded, albumDetail);
  return;
};

const populateData = () => {
  const albumDetail = new FormData();
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== "img_album") {
      albumDetail.append(`${values[i]}`, document.querySelector(`#${values[i]}`).value);
    }
  }
  return albumDetail;
};

const isDataValid = () => {
  for (let i = 0; i < values.length; i++) {
    if (!document.querySelector(`#${values[i]}`).value) {
      return false;
    }
  }
  return true;
};

const callback = (resp) => {
  const data = JSON.parse(resp);
  if (data.hasOwnProperty("path") && data["path"] !== null) return data["path"];
  return "";
};

const callbackAdded = (resp) => {
  const data = JSON.parse(resp);
  alert(data["description"]);
  window.location.reload();
};
