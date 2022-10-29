const playerLayout = () => {
    return (
        `
        <div id="overlay-container">
            <div id="audio-player-container">
            <div class="song-cover">
                <img id="song-img" src="" />
            </div>
            <div class="song-desc">
                <strong id="song-title">Cepak Mambo REmix</strong>
                <p id="song-artist">DJ bolbala bala</p>
            </div>
            <div class="song-progress">
                <div id="current-time" class="time">0:00</div>
                <input type="range" id="seek-slider" max="100" value="0">
                <div id="duration" class="time">0:00</div>
            </div>
            <audio id="song-path" src="" preload="metadata" loop></audio>
            <div class="button-container">
                <img class="img-icon" id="back-icon" src="./assets/image/back-btn.png" onclick="closeSong()" />
                <img class="img-icon" id="play-icon" src="./assets/image/play-btn.png" />
                <img class="img-icon" id="mute-icon" src="./assets/image/volume-btn.png" />
            </div>
            </div>
        </div>
        `
    )
}
// player layout initializer (default is disabled in HTML)
document.getElementById("overlay").innerHTML = playerLayout();

// play song button listener & handler
document.addEventListener("click", function(e) {
    if (e.target.getAttribute("class").includes("play-song-button")) {
        const image = e.target.getAttribute("data-image");
        const audio = e.target.getAttribute("data-audio");
        const judul = e.target.getAttribute("data-judul");
        const penyanyi = e.target.getAttribute("data-penyanyi");
        playSong(image, audio, judul, penyanyi);
}
});

const playSong = (song_img, song_path, song_title, song_artist) => {
    getAPI('/api/authentication/userdata.php', (data) => {
        const userdata = JSON.parse(data);
        if (userdata.hasOwnProperty('status') && userdata['status'] === 'error') {
            const ls = window.localStorage;
            const limit = JSON.parse(ls.getItem("user"));
            const today = new Date();
            let date = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
            
            if (limit) {
                if (limit.amount === 3 && limit.date === date) {
                    alert("Today's max limit reached. Log in for unlimited streams or come back tomorrow!");
                    window.location.href = `${window.location.protocol}//${window.location.host}/login.html`;
                } else {
                    let amount = 0;
                    if (limit.date === date) {
                        amount = limit.amount + 1;
                    }
                    ls.setItem("user", JSON.stringify({amount: amount, date: date}));
                    setPlayer(song_img, song_path, song_title, song_artist);
                }
            } else {
                const amount = 1;
                ls.setItem("user", JSON.stringify({amount: amount, date: date}));
                setPlayer(song_img, song_path, song_title, song_artist);
            }
        } else {
            setPlayer(song_img, song_path, song_title, song_artist);
        }
    });
}

const setPlayer = (song_img, song_path, song_title, song_artist) => {
    document.getElementById("song-img").setAttribute("src", song_img);
    document.getElementById("song-path").setAttribute("src", song_path);
    document.getElementById("song-title").innerHTML = song_title;
    document.getElementById("song-artist").innerHTML = song_artist;
    document.getElementById("overlay").setAttribute("class", "player-enabled");
}

const closeSong = () => {
    playState = 'play';
    muteState = 'unmute';
    audio.pause();
    audio.currentTime = 0;
    document.getElementById("overlay").setAttribute("class", "player-disabled");
}


// internal audio player handlers & listeners
const playIconContainer = document.getElementById('play-icon');
const audioPlayerContainer = document.getElementById('audio-player-container');
const seekSlider = document.getElementById('seek-slider');
const muteIconContainer = document.getElementById('mute-icon');
let playState = 'play';
let muteState = 'unmute';

playIconContainer.addEventListener('click', () => {
    if(playState === 'play') {
        audio.play();
        requestAnimationFrame(whilePlaying);
        playState = 'pause';
    } else {
        audio.pause();
        cancelAnimationFrame(raf);
        playState = 'play';
    }
});

muteIconContainer.addEventListener('click', () => {
    if(muteState === 'unmute') {
        audio.muted = true;
        muteState = 'mute';
    } else {
        audio.muted = false;
        muteState = 'unmute';
    }
});

const showRangeProgress = (rangeInput) => {
    if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
    else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
}

seekSlider.addEventListener('input', (e) => {
    showRangeProgress(e.target);
});

const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
let raf = null;

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

const displayBufferedAmount = () => {
    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
}

const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
    displayBufferedAmount();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    });
}

audio.addEventListener('progress', displayBufferedAmount);

seekSlider.addEventListener('input', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    if(!audio.paused) {
        cancelAnimationFrame(raf);
    }
});

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
    }
});
