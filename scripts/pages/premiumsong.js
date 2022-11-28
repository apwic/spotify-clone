const getPremiumSong = () => {
  getAPI(`http://localhost:8080/songs/?penyanyi_id=${1}`, (data) => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    const songs = jsonData.songs;
    const penyanyi = jsonData.penyanyi;

    const str = `<div class="page-title">Premium Songs
            </div>
            <div id="songs" class="song-list-container">`;
    document.getElementById("page-container").innerHTML =  str;

    for (let i = 0; i < songs.length; i++){
      const audio = new Audio(songs[i].audio_path);
      audio.onloadedmetadata = function() {
        const audio_duration = audio.duration;
        console.log(audio_duration);
        const str = `<div class="song-list" data-value="${songs[i].song_id}"
                  data-audio="${songs[i].audio_path}"
                  data-judul="${songs[i].judul}"
                  data-penyanyi-id="${songs[i].penyanyi_id}"
                  data-duration="${audio_duration}"
                >
                  <div class="img-detail">
                    <img class="img-search" src="./assets/image/song.png" alt=""/>
                    <div class="detail-song">
                      <label class="song-title">${songs[i].judul}</label>
                      <label>${penyanyi}</label>
                    </div>
                  </div>
                  <label class="label">${(audio_duration/60) >> 0}:${("0" + audio_duration%60).slice(-2)}</label>
                </div>`;
        document.getElementById("songs").insertAdjacentHTML("beforeend", str);
      };
    }

    document.getElementById("page-container").insertAdjacentHTML("beforeend", "</div>");
  });
};

getPremiumSong();