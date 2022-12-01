const getSingerSongs = () => {
  const creatorId = new URLSearchParams(window.location.search).get("id");
  const penyanyi = new URLSearchParams(window.location.search).get("name");

  document.getElementById("artist-title").innerHTML = `${penyanyi}'s Premium Songs`;

  getAPI(`api/authentication/userdata.php`, (data) => {
    const userData = JSON.parse(data);
    const subsId = userData.dataUser.user_id;

    getAPI(`http://localhost:1356/songs/singer?subscriberId=${subsId}&creatorId=${creatorId}`, (data) => {
      const jsonData = JSON.parse(data);
      const songs = jsonData.songs;
  
      const str = `<div class="page-title">Premium Songs
              </div>
              <div id="songs" class="song-list-container">`;
      document.getElementById("page-container").innerHTML =  str;
  
      for (let i = 0; i < songs.length; i++){
        const audio = new Audio(songs[i].audio_path);
        audio.onloadedmetadata = function() {
          const audio_duration = parseInt(audio.duration);
          const str = `<div class="song-list play-song-button" data-value="${songs[i].song_id}"
                    data-image="./assets/image/song.png"
                    data-audio="${songs[i].audio_path}"
                    data-judul="${songs[i].judul}"
                    data-penyanyi="${penyanyi}"
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
                    <img
                      src="./assets/image/play-btn-black.png" 
                    alt=""/>
                  </div>`;
          document.getElementById("songs").insertAdjacentHTML("beforeend", str);
        };
      }
  
      document.getElementById("page-container").insertAdjacentHTML("beforeend", "</div>");
    });
  });
};

getSingerSongs();
