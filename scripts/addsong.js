const addSong = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_lagu", document.querySelector("#file_lagu").files[0]);
    formData.append("type", "song");
    postAPI(
      "../api/addfile.php",
      (response) => {
        const jsonData = JSON.parse(response);
        console.log(jsonData);
      },
      formData
    )
    return;
};
