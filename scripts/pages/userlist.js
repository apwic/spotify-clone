const userLayout = (page) => {
    if (page > 0) {
        getAPI(`./api/user/getallusers.php?page=${page}`, (data) => {
            const jsonData = JSON.parse(data);
            users = jsonData.payload;
            str = `<div class="page-title">Users of Sepotipayi
                </div>
                <div class="info">
                    <div class="info-column">Username</div>
                    <div class="info-column">Email</div>
                </div>
                <div id="users" class="user-list-container">`;

            str += users.map(user =>
                `<div class="user-list">
                    <div class="user">
                        <div class="text-info">${user.username}</div>
                    </div>
                    <div class="user">
                        <div class="text-info">${user.email}</div>
                    </div>
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