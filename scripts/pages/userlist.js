const userLayout = (page) => {
    if (page > 0) {
        getAPI(`./api/user/getallusers.php?page=${page}`, (data) => {
            const jsonData = JSON.parse(data);
            users = jsonData.payload;
            str = `<div class="page-title">Users
                </div>
                <div id="users" class="song-list-container">`;

            str += users.map(user =>
                `<div class="song-list">
                    <label>${user.username} - ${user.email}</label>
                </div>`
            ).join("");

            str += `
                </div>
                <div class="page-anchor">
                <button class="page-anchor-button" onclick="userLayout(${page - 1})">\<</button>
                <label><b>${page}</b></label>
                <button class="page-anchor-button" onclick="userLayout(${page + 1})">\></button>
                </div>`;

            document.getElementById("page-container").innerHTML =  str;

            window.history.replaceState(
                null,
                "",
                window.location.origin + window.location.pathname + "?page=" + page
            );
        });
    }
}

userLayout(1);