const values = [
  "file_lagu",
  "img_lagu",
  "judul_lagu",
  "penyanyi_lagu",
  "tanggalterbit_lagu",
  "genre_lagu",
  "album_lagu",
];

const addSong = (e) => {
  e.preventDefault();

  if (isDataValid()) {
    let audio_path = "";
    const songFile = new FormData();
    songFile.append("file_lagu", document.querySelector("#file_lagu").files[0]);
    songFile.append("type", "song");

    let img_path = "";
    const coverFile = new FormData();
    coverFile.append("img_lagu", document.querySelector("#img_lagu").files[0]);
    coverFile.append("type", "cover/song/");

    postAPI(
      "../api/addfile.php",
      (resp) => {
        audio_path = callback(resp, audio_path);
        addImage(coverFile, audio_path, img_path);
      },
      songFile
    );
  } else {
    alert("Please fill in the form!");
  }

  return;
};

const addImage = (coverFile, audio_path, img_path) => {
  postAPI(
    "../api/addfile.php",
    (resp) => {
      img_path = callback(resp);
      postSong(img_path, audio_path);
    },
    coverFile
  );
};

const postSong = (img_path, audio_path) => {
  for (let i = 0; i < values.length; i++) {
    if (!document.querySelector(`#${values[i]}`).value) {
      return false;
    }
  }
  const songDetail = populateData();
  songDetail.append("audio_path", audio_path);
  songDetail.append("image_path", img_path);
  songDetail.append("duration", 234);
  populateData(songDetail);

  postAPI("/api/song/addsong.php", callbackAdded, songDetail);
  return;
};

const populateData = () => {
  const songDetail = new FormData();
  for (let i = 0; i < values.length; i++) {
    if (values[i] !== "img_lagu" && values[i] !== "file_lagu") {
      songDetail.append(
        `${values[i]}`,
        document.querySelector(`#${values[i]}`).value
      );
    }
  }
  return songDetail;
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
