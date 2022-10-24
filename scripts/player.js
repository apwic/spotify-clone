const playerLayout = () => {
    return (
        `
        <div id="player">
            <img src="./assets/image/liked-songs.png"/>
            <div class="song-detail">
                <div class="song-title">
                Epi
                </div>
                <div class="song-artist">
                Epi
                </div>
            </div>
        </div>
        `
    )
}

document.getElementById("player").innerHTML = playerLayout();
