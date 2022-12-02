const addSubs = (event) => {
    console.log(event.target.value);
    event.preventDefault();
    const singer = JSON.parse(event.target.value);
    console.log(singer);

    getAPI(`/api/authentication/userdata.php`, (data) => {
        const userData = JSON.parse(data);
        const userId = userData.dataUser.user_id;
        const userName = userData.dataUser.username;

        const addSubscription = new FormData();
        addSubscription.append("creator_id", singer.user_id);
        addSubscription.append("subscriber_id", userId);
        addSubscription.append("creator_name", singer.name);
        addSubscription.append("subscriber_name", userName);
        addSubscription.append("status", "PENDING");

        postAPI(`/api/subs/addsubs.php`, (resp) => {}, addSubscription);
        // window.location.reload();
    });
}

const goToPremiumArtistSongs = (e) => {
    e.preventDefault();
    const singer = JSON.parse(e.target.value);
    window.location.href = `${window.location.protocol}//${window.location.host}/premium-singer-song.html?id=${singer.user_id}&name=${singer.name}`;
}

const searchCreatorSubs = (subs, singerID) => {
    if (subs === undefined || subs === null) {
        return false;
    }
    for (let i = 0; i < subs.length; i++) {
        if (subs[i].creator_id === singerID) {
            return true;
        }
    }
    return false;
}

const getData = (data) => {
    const jsonData = [{
        "user_id": data.user_id,
        "name": data.name,
    }]
    return jsonData;
}

const premiumSingerLayout = () => {
  getAPI(`http://localhost:1356/users`, (data) => {
    const jsonData = JSON.parse(data);
    const singers = jsonData.users;
    getAPI(`/api/subs/getusersubs.php`, (dataSubs) => {
        const jsonDataSubs = JSON.parse(dataSubs);
        const subs = jsonDataSubs.payload;
        console.log(subs, singers);

        str = `<div class="page-title">Premium Singer
        </div>
        <div id="singers" class="singer-list-container">`;

        str += singers.map(singer =>
        `<div class="singer-list">
            <div class="singer">
                <div class="singer-info">${singer.name}</div>
            </div>
            <div>
                ${
                    searchCreatorSubs(subs, singer.user_id) ? 
                        (subs?.status === "PENDING" ? `<div class="status-subs">Requested</div>` 
                        : (subs?.status === "ACCEPTED" ? `<button class="status-subs" value=${JSON.stringify(singer)} onclick=""goToPremiumArtistSongs(event)>See Songs</button>` : `<div class="status-subs">Rejected</div>`)) 
                    : `<button class="req-subs" value=${JSON.stringify(getData(singer))} onClick="addSubs(event)">Subscribe</button>`
                }
            </div>
        </div>`
        ).join("");

        str += `</div>`

        document.getElementById("page-container").innerHTML =  str;
    })
  });
};

premiumSingerLayout();