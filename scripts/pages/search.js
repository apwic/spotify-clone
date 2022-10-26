const populateData = () => {
  getAPI("./api/genre/getdistinctgenre.php", (data) => {
    const jsonData = JSON.parse(data);
    const genres = jsonData.payload;
    const genreSelect = document.getElementById("genre");
    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.id;
      option.innerHTML = genre.genre;
      genreSelect.appendChild(option);
    });
  });
}

const searchLayout = (query, filter, sort, page) => {
  if (page > 0) {
    let apiCall;
    if (filter == "0"){
      apiCall = `./api/search.php?q=${query}&sort=${sort}&page=${page}`;
    } else {
      apiCall = `./api/search.php?q=${query}&filter=${filter}&sort=${sort}&page=${page}`;
    }

    getAPI(apiCall, (data) => {
      const jsonData = JSON.parse(data);
      songs = jsonData.payload;
      document.getElementById("page-container").innerHTML = '';
      str = `
      <div class="search-bar-container">
        <form>
          <div class="search-bar">
            <input type="text" name="query" placeholder="What do you want to listen to?"/>
            <input type="button" onclick="searchLayout(this.form.query.value, this.form.genre.value, this.form.sort.value, 1)" value="search"/>
          </div>
          <div class="search-bar">
            <label for="sort">Sort by</label>
            <select name="sort" id="sort">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div class="search-bar">
            <label for="genre">Genre</label>
            <select name="genre" id="genre">
              <option value="" disabled selected>Genres...</option>
          </div>
        </form>
      </div>`;

      document.getElementById("page-container").innerHTML = str;

      str = `<div id="songs" class="song-list-container">`;

      str += songs.map(song =>
        `<div class="song-list">
          <img src="./assets/image/menu-burger.png"/>
          <label>${song.judul} - ${song.penyanyi} - ${(song.duration/60) >> 0}:${("0" + song.duration%60).slice(-2)}</label>
        </div>`
      ).join("");
  
      str += `
        </div>
        <div class="page-anchor">
        <button class="page-anchor-button" onclick="searchLayout('${query}', '${filter}', '${sort}', ${page - 1})">\<</button>
        <label><b>${page}</b></label>
        <button class="page-anchor-button" onclick="searchLayout('${query}', '${filter}', '${sort}', ${page + 1})">\></button>
        </div>`;

      document.getElementById("page-container").insertAdjacentHTML("beforeend", str);

      if (filter == ""){
        window.history.replaceState(
          null,
          "",
          window.location.origin + window.location.pathname + "?q=" + query+ "&sort=" + sort + "&page=" + page
        );
      } else {
        window.history.replaceState(
          null,
          "",
          window.location.origin + window.location.pathname + "?q=" + query + "&filter=" + filter + "&sort=" + sort + "&page=" + page
        );
      }
    });

  }
}

populateData();